import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000'

/**
 * Base RTK Query API configured for REST endpoints.
 * Extend this API in feature modules using `injectEndpoints`.
 */
export const baseRestApi = createApi({
  reducerPath: 'restApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['Users'],
  endpoints: () => ({}),
})
