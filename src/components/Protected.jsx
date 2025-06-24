import { Navigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, role, loading } = useUser()

  if (loading) return <div>Loading...</div>

  if (!user) return <Navigate to="/login" replace />
  // console.log(role)
  if (!role) return <Navigate to="/login" replace />

  return children
}

export default ProtectedRoute
