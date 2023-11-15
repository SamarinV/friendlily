import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { state } from "./state";

const store = configureStore({
  reducer: rootReducer,
  preloadedState: state,
});

export default store;
