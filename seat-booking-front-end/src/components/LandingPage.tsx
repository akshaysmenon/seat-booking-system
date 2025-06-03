import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function LandingPage() {
  const navigate = useNavigate()
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Button variant="contained" onClick={() => navigate('/users')}>
        User Management
      </Button>
    </Box>
  )
}
