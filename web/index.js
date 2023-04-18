// @ts-check

import { join } from "path";
import { readFileSync } from "fs";
import express from "express";
import serveStatic from "serve-static";
import shopify from "./shopify.js";
import GDPRWebhookHandlers from "./gdpr.js";

// <RAFFY>
import cors from 'cors';
import getRawBody from "raw-body";
import { createHmac } from "crypto";
const secretKey = process.env.SHOPIFY_API_SECRET;
const WEBHOOK_FRAGMENT = '/process/';
// </RAFFY>

const PORT = parseInt(process.env.BACKEND_PORT || process.env.PORT, 10);
const STATIC_PATH =
  process.env.NODE_ENV === "production"
    ? `${process.cwd()}/frontend/dist`
    : `${process.cwd()}/frontend/`;

const app = express();

// <RAFFY>
app.use(cors());
app.use((req, reply, next) => {
	console.log(new Date().toISOString(), req.method, req.url); //, req.headers);
	next();
});
app.use((_, reply, next) => {
	//The frame-ancestors declaration must be different for every shop, and these headers must be present in any routes that render HTML content.
	reply.set('Content-Security-Policy', 'frame-ancestors https://shopify-dev.myshopify.com https://admin.shopify.com');
	next();
});


for (let path of ['shop/redact', 'customers/data_request', 'customers/redact']) {
	app.post(`${WEBHOOK_FRAGMENT}${path}`, async (req, res) => {
		// We'll compare the hmac to our own hash
		const hmac = req.get('X-Shopify-Hmac-Sha256')
	  
		// Use raw-body to get the body (buffer)
		const body = await getRawBody(req);
	  
		// Create a hash using the body and our key
		const hash = createHmac('sha256', secretKey).update(body).digest('base64');
		//console.log({path, body, hmac, hash});
	  
		// Compare our hash to Shopify's hash
		if (hash === hmac) {
		   res.status(200).send()
		} else {
		  res.status(401).send()
		}
	  });
}

// </RAFFY>


// Set up Shopify authentication and webhook handling
app.get(shopify.config.auth.path, shopify.auth.begin());
app.get(
  shopify.config.auth.callbackPath,
  shopify.auth.callback(),
  shopify.redirectToShopifyOrAppRoot()
);
app.post(
  shopify.config.webhooks.path,
  shopify.processWebhooks({ webhookHandlers: GDPRWebhookHandlers })
);

// All endpoints after this point will require an active session
app.use("/api/*", shopify.validateAuthenticatedSession());

app.use(express.json());

app.get("/api/products/count", async (_req, res) => {
  const countData = await shopify.api.rest.Product.count({
    session: res.locals.shopify.session,
  });
  res.status(200).send(countData);
});

app.use(serveStatic(STATIC_PATH, { index: false }));

app.use("/*", shopify.ensureInstalledOnShop(), async (_req, res, _next) => {
  return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(readFileSync(join(STATIC_PATH, "index.html")));
});

app.listen(PORT);
