import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import itemsReducer from './itemsSlice';

const persistConfig = {
  key: 'items-storage-redux',
  version: 1,
  storage,
};

const reducer = combineReducers({ items: itemsReducer });

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
});
