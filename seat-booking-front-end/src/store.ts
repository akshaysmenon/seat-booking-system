import { configureStore } from '@reduxjs/toolkit'
import { baseRestApi } from './api/rest/baseRestApi'

export const store = configureStore({
  reducer: {
    [baseRestApi.reducerPath]: baseRestApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseRestApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
