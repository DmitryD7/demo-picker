import {LATEST_API_VERSION} from "@shopify/shopify-api";
import {shopifyApp} from "@shopify/shopify-app-express";
import {SQLiteSessionStorage} from "@shopify/shopify-app-session-storage-sqlite";

// <RAFFY>
import * as dotenv from 'dotenv';
dotenv.config();
// </RAFFY>

let {restResources} = await import(
    `@shopify/shopify-api/rest/admin/${LATEST_API_VERSION}`
    );
// If you want IntelliSense for the rest resources, you should import them directly
// import { restResources } from "@shopify/shopify-api/rest/admin/2022-10";

const DB_PATH = `${process.cwd()}/database.sqlite`;

const shopify = shopifyApp({
    api: {
        apiVersion: LATEST_API_VERSION,
		// <RAFFY>
		apiKey: process.env.SHOPIFY_API_KEY,
		apiSecretKey: process.env.SHOPIFY_API_SECRET,
		scopes: ['write_products'],
		hostScheme: 'https',
		hostName: `studiomart.stylescan.net`,
		// </RAFFY>
        restResources,
        billing: undefined, // or replace with billingConfig above to enable example billing
		/*logger: {
			log(...a) {
				console.log(...a);
			},
			level: 9999
		},*/
    },
    auth: {
        path: "/api/auth",
        callbackPath: "/api/auth/callback",
    },
    webhooks: {
        path: "/api/webhooks",
    },
    // This should be replaced with your preferred storage strategy
    sessionStorage: new SQLiteSessionStorage(DB_PATH),
});

export default shopify;
