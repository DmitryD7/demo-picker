import {accountAsync, accountSlice} from "./accountReducer";

const selectAccEmail = (state) => state.account.email;

const accSelectors = {
    selectAccEmail,
}

const accountReducer = accountSlice.reducer;

export const accountActions = {
    ...accountSlice.actions,
    ...accountAsync,
}

export {
    accountReducer,
    accSelectors
}