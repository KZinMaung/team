import { configureStore } from "@reduxjs/toolkit";
import reducers from "./reducers";
 const DEFAULT_STATE = {};
const store = configureStore({
    reducer: reducers,
    DEFAULT_STATE
});
export default store;