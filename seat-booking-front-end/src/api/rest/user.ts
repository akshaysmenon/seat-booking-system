import { baseRestApi } from './baseRestApi'

export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
}

export type NewUser = Omit<User, 'id'>

const userApi = baseRestApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => '/users',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Users' as const, id })),
              { type: 'Users', id: 'LIST' },
            ]
          : [{ type: 'Users', id: 'LIST' }],
    }),
    createUser: builder.mutation<User, NewUser>({
      query: (user) => ({ url: '/users', method: 'POST', body: user }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetUsersQuery,
  useLazyGetUsersQuery,
  useCreateUserMutation,
} = userApi

export const { endpoints: userEndpoints } = userApi
