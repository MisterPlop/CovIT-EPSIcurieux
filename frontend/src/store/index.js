import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from "./slices/index";

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ["someNonPersistedReducer"], // Avoid persisting unnecessary reducers
};

const indexReducer = combineReducers({
    user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, indexReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"], // Disable serializability check (TEMPORARY fix)
            },
        }),
});

export const persistor = persistStore(store);