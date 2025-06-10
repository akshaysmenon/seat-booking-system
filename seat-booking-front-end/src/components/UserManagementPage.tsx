import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import {
  useGetUsersQuery,
  useCreateUserMutation,
  User,
} from '../api/rest/user'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import type { SerializedError } from '@reduxjs/toolkit'

const getErrorMessage = (
  err: FetchBaseQueryError | SerializedError | undefined,
): string | null => {
  if (!err) return null
  if ('status' in err) {
    if (typeof err.data === 'string') return err.data
    if (
      err.data &&
      typeof (err.data as { message?: string }).message === 'string'
    ) {
      return (err.data as { message?: string }).message as string
    }
    return JSON.stringify(err.data)
  }
  return err.message ?? null
}

type UserFormInputs = {
  firstName: string
  lastName: string
  email: string
}

export default function UserManagementPage() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const { data: users = [], error } = useGetUsersQuery()
  const [createUser] = useCreateUserMutation()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormInputs>({
    defaultValues: { firstName: '', lastName: '', email: '' },
  })

  useEffect(() => {
    if (selectedUser) {
      reset(selectedUser)
    } else {
      reset({ firstName: '', lastName: '', email: '' })
    }
  }, [selectedUser, reset])

  const onSubmit = handleSubmit(async (data: UserFormInputs) => {
    await createUser(data).unwrap()
    setSelectedUser(null)
    reset()
  })

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        User Management
      </Typography>
      {getErrorMessage(error) && (
        <Typography color="error" gutterBottom>
          {getErrorMessage(error)}
        </Typography>
      )}
      <Grid container spacing={4} alignItems="flex-start">
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <form onSubmit={onSubmit} noValidate>
              <TextField
                fullWidth
                label="First Name"
                margin="normal"
                {...register('firstName', { required: 'First name is required' })}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
              <TextField
                fullWidth
                label="Last Name"
                margin="normal"
                {...register('lastName', { required: 'Last name is required' })}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
              <TextField
                fullWidth
                label="Email"
                margin="normal"
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                Save User
              </Button>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Existing Users
            </Typography>
            <List>
              {users.map((user) => (
                <ListItem
                  key={user.id}
                  button
                  onClick={() => setSelectedUser(user)}
                >
                  {user.firstName} {user.lastName}
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
