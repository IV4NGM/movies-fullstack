import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { reset, register as registerUser } from '@/Features/Auth/authSlice'
import Spinner from '@/Components/Spinner/Spinner'

const Signup = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const { user, isError, isSuccess, isLoading, message } = useSelector((state) => state.auth)

  const signUpFormSchema = yup.object().shape({
    name: yup.string().required('Escribe tu nombre'),
    // eslint-disable-next-line no-useless-escape
    email: yup.string().required('Ingresa un email válido').matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Debes ingresar un email válido'),
    password: yup.string().required('Ingresa tu contraseña').min(5, 'La contraseña debe tener al menos 5 caracteres').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%.^&*])/, 'La contraseña debe tener un número, una letra mayúscula, una letra minúscula y un caracter especial'),
    confirm_password: yup.string().oneOf([yup.ref('password'), null], 'Las contraseñas no coinciden').required('Vuelve a escribir tu contraseña')
  })

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(signUpFormSchema)
  })

  const onSubmit = (data) => {
    const userData = {
      name: data.name,
      email: data.email,
      password: data.password
    }
    dispatch(registerUser(userData))
  }

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess) {
      toast.success('Usuario registrado correctamente')
      navigate('/verification-pending/1')
    }

    if (user) {
      if (user?.isVerified) {
        navigate('/')
      } else {
        navigate('/verification-pending/0')
      }
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className='page-container'>
      <h2>Regístrate ahora para disfrutar tus películas favoritas</h2>
      <div className='form'>
        <div className='form-container'>
          <form
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className='form-floating'>
              <input
                type='text'
                name='name'
                placeholder='Tu Nombre'
                id='name'
                className='form-control'
                {...register('name', { required: true, maxLength: 35 })}
              />
              <label htmlFor='name'>Nombre</label>
            </div>
            <p className='warning-text'>{errors.name?.message}</p>

            <div className='form-floating'>
              <input
                type='text'
                name='email'
                placeholder='correo@mail.com'
                id='email'
                className='form-control'
                {...register('email')}
              />
              <label htmlFor='email'>Correo electrónico</label>
            </div>
            <p className='warning-text'>{errors.email?.message}</p>

            <div className='form-floating'>
              <input
                type='password'
                name='password'
                id='password'
                placeholder='contraseña'
                className='form-control'
                {...register('password')}
              />
              <label htmlFor='password'>Contraseña</label>
            </div>
            <p className='warning-text'>{errors.password?.message}</p>

            <div className='form-floating'>
              <input
                type='password'
                name='confirm_password'
                id='confirm_password'
                placeholder='contraseña'
                className='form-control'
                {...register('confirm_password')}
              />
              <label htmlFor='confirm_password'>Confirma tu contraseña</label>
            </div>
            <p className='warning-text'>{errors.confirm_password?.message}</p>

            <button type='submit' className='btn btn-success btn-form'>
              Registrarse
            </button>
          </form>
          <p className='form-hint-text-bottom'>¿Ya eres un usuario?</p>
          <Link to='/login'>Inicia sesión</Link>
        </div>
      </div>
    </div>
  )
}

export default Signup
