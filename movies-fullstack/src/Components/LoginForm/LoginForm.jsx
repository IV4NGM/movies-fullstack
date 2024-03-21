import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { reset, login } from '@/Features/Auth/authSlice'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

import './LoginForm.scss'

const LoginForm = ({ loginPage = true, initialState, setFormState }) => {
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const { user, isError, isSuccess, message, errorType, successType } = useSelector((state) => state.auth)

  const loginFormSchema = yup.object().shape({
    // eslint-disable-next-line no-useless-escape
    email: yup.string().required('Ingresa un email válido').matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Debes ingresar un email válido'),
    password: yup.string().required('Ingresa tu contraseña')
  })

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginFormSchema)
  })

  const onSubmit = (data) => {
    const userData = {
      email: data.email,
      password: data.password
    }
    setFormState(userData)
    dispatch(login(userData))
  }

  useEffect(() => {
    if (isError && errorType === 'LOGIN') {
      toast.error(message)
    }

    if ((isSuccess && successType === 'LOGIN') || (loginPage && user)) {
      if (user?.isVerified) {
        navigate('/')
      } else {
        navigate('/verification-pending/0')
      }
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, errorType, successType])

  return (
    <div className={'form' + (!loginPage ? ' form-login-home' : '')}>
      <div className='form-container'>
        {!loginPage && <h4 className='form-login-home-title'>¿Ya tienes una cuenta?</h4>}
        <form
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='form-floating'>
            <input
              type='text'
              name='email'
              placeholder='correo@mail.com'
              id='email'
              className='form-control'
              defaultValue={initialState?.email}
              {...register('email')}
            />
            <label htmlFor='email'>Correo electrónico</label>
          </div>
          <p className='warning-text'>{errors.email?.message}</p>
          <div className='form-floating'>
            <input
              type='password'
              name='password'
              placeholder='contraseña'
              id='password'
              className='form-control'
              defaultValue={initialState?.password}
              {...register('password')}
            />
            <label htmlFor='password'>Contraseña</label>
          </div>
          <p className='warning-text'>{errors.password?.message}</p>

          <button type='submit' className='btn btn-success btn-form space-down'>
            Iniciar Sesión
          </button>
        </form>
        <Link to='/forgotten' className='form-hint-text-bottom'>¿Olvidaste tu contraseña?</Link>
        <p className='form-hint-text-bottom'>¿Eres un nuevo usuario?</p>
        <Link to='/signup'>Regístrate ahora</Link>
      </div>
    </div>
  )
}

export default LoginForm
