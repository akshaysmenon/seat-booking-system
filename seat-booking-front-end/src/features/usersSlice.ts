import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
}

interface UsersState {
  users: User[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error?: string
  selectedUser?: User | null
}

const initialState: UsersState = {
  users: [],
  status: 'idle',
  error: undefined,
  selectedUser: null,
}

export const fetchUsers = createAsyncThunk<User[]>('users/fetchUsers', async () => {
  const res = await fetch('http://localhost:3000/users')
  if (!res.ok) {
    throw new Error('Failed to fetch users')
  }
  return res.json()
})

export const addUser = createAsyncThunk<User, Omit<User, 'id'>>(
  'users/addUser',
  async (user) => {
    const res = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })
    if (!res.ok) {
      throw new Error('Failed to add user')
    }
    return res.json()
  },
)

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    selectUser(state, action: PayloadAction<number | null>) {
      state.selectedUser = state.users.find((u) => u.id === action.payload) || null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading'
        state.error = undefined
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.status = 'succeeded'
        state.users = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.users.push(action.payload)
      })
      .addCase(addUser.rejected, (state, action) => {
        state.error = action.error.message
      })
  },
})

export const { selectUser } = usersSlice.actions

export default usersSlice.reducer
