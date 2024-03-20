import { useSelector } from 'react-redux'
import LoginForm from '../LoginForm/LoginForm'
import './LoginInvitation.scss'
import eagleIcon from '@/assets/eagle-icon.png'
import Spinner from '@/Components/Spinner/Spinner'
import { useState } from 'react'

const LoginInvitation = () => {
  const { isLoading } = useSelector(state => state.auth)

  const [formState, setFormState] = useState({
    email: '',
    password: ''
  })

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <h2>¡Regístrate o inicia sesión para acceder a tus series y películas favoritas!</h2>
      <div className='two-content'>
        <div className='login-invitation-logo-container'>
          <img src={eagleIcon} alt='Eagle Blade Logo' className='login-invitation-logo' />
          <h3>Eagle Blade</h3>
        </div>
        <LoginForm loginPage={false} initialState={formState} setFormState={setFormState} />
      </div>
    </>

  )
}

export default LoginInvitation
