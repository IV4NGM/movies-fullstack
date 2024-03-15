import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { reset, login } from '../Features/Auth/authSlice'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

const Login = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const { user, isError, isSuccess, message } = useSelector((state) => state.auth)

  const loginFormSchema = yup.object().shape({
    // eslint-disable-next-line no-useless-escape
    email: yup.string().required('Ingresa un email válido').matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Debes ingresar un email válido'),
    password: yup.string().required('Ingresa tu contraseña')
  })

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginFormSchema)
  })

  const onSubmit = (data) => {
    // e.preventDefault()

    const userData = {
      email: data.email,
      password: data.password
    }
    dispatch(login(userData))
  }

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  return (
    <div className='page-container'>
      <h2>Inicia sesión para empezar a comprar</h2>
      <div className='form'>
        <div className='form-container'>
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
                {...register('email')}
              // onChange={onChange}
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
                {...register('password')}
              // onChange={onChange}
              />
              <label htmlFor='password'>Contraseña</label>
            </div>
            <p className='warning-text'>{errors.password?.message}</p>

            {/* <p className='error-text'>{errorMessage}</p> */}
            <button type='submit' className='btn btn-success btn-form'>
              Iniciar Sesión
            </button>
          </form>
          <p>¿Eres un nuevo usuario?</p>
          <Link to='/signup'>Regístrate ahora</Link>
        </div>
      </div>
    </div>
  )
}

export default Login
