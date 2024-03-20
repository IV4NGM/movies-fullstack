import LoginForm from '@/Components/LoginForm/LoginForm'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import Spinner from '@/Components/Spinner/Spinner'
const Login = () => {
  const { isLoading } = useSelector(state => state.auth)

  const [formState, setFormState] = useState({
    email: '',
    password: ''
  })

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className='page-container'>
      <h2>Inicia sesión para ver tus películas favoritas</h2>
      <LoginForm initialState={formState} setFormState={setFormState} />
    </div>
  )
}

export default Login
