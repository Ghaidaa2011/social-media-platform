import { combineReducers, configureStore } from '@reduxjs/toolkit'
import toasts from "./toast/toastsSlice"
import posts from "./posts/postsSlice"
import modal from "./Modal/modalSlice"
import authentication from "./auth/authSlice"
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootPersistConfig = {
  key: "root",
  storage,
  whitelist: ["authentication"],
};
const authPersistConfig = {
  key: "authentication",
  storage,
  whitelist: ["user", "token"],
};
const rootReducer = combineReducers({
  authentication: persistReducer(authPersistConfig, authentication), posts, toasts, modal
});
const persistedReducer = persistReducer(rootPersistConfig, rootReducer)
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, "toasts/addToast",
        ],
      },
    }),
});
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
const persistor = persistStore(store);
export { store, persistor };