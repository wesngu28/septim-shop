import { configureStore } from "@reduxjs/toolkit"
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import noteReducer from "./itemSlice"
import { type TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, noteReducer)

export const store = configureStore({
  reducer: {
    cart: persistedReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store)
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector