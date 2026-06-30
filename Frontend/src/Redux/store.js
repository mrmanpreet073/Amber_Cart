// import { configureStore } from '@reduxjs/toolkit';
// import userSlice from "./userSlice.js"

// export const store = configureStore({
//     reducer: {
//         user: userSlice,   // state.user
                
//     },
// });

import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import userReducer from './userSlice.js';

const storage = {
  getItem: (key) => Promise.resolve(localStorage.getItem(key)),
  setItem: (key, value) => Promise.resolve(localStorage.setItem(key, value)),
  removeItem: (key) => Promise.resolve(localStorage.removeItem(key)),
};

const persistConfig = {
  key: 'Amber',
  storage,
  whitelist: ['user'],  // only persist these slices
  // blacklist: ['cart'] // or exclude these slices
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }), // required for redux-persist
});

export const persistor = persistStore(store);