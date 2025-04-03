import { configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import rootReducers from '@/redux/rootReducers';
import apiSlice from '@/libs/api/apiSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    root: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware),
});

const persistor = persistStore(store);

// Infer the `RootState` type from the store itself
type RootState = ReturnType<typeof store.getState>;
// Infer the `AppDispatch` type from the store
type AppDispatch = typeof store.dispatch;

export type { RootState, AppDispatch };

export { persistor, store };
