import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { reset, sendResetEmail } from '@/Features/Auth/authSlice'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import Spinner from '@/Components/Spinner/Spinner'

const ForgottenPassword = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const { user, isSuccess, isError } = useSelector((state) => state.auth)

  const resetFormSchema = yup.object().shape({
    // eslint-disable-next-line no-useless-escape
    email: yup.string().required('Ingresa un email válido').matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Debes ingresar un email válido')
  })

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(resetFormSchema)
  })

  const onSubmit = (data) => {
    toast.info('Te enviaremos un email si tus datos son correctos')
    dispatch(sendResetEmail(data.email))
  }

  useEffect(() => {
    if (user) {
      if (user?.isVerified) {
        navigate('/')
      } else {
        navigate('/verification-pending/0')
      }
    }

    dispatch(reset())
  }, [user, isSuccess, isError, navigate, dispatch])

  return (
    <div className='page-container'>
      <h2>Ingresa tu email</h2>
      <p>Te enviaremos un correo electrónico con los pasos a seguir</p>
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
              />
              <label htmlFor='email'>Correo electrónico</label>
            </div>
            <p className='warning-text'>{errors.email?.message}</p>
            <button
              type='submit'
              className='btn btn-success btn-form'
            >Enviar correo de recuperación
            </button>
          </form>
          <Link to='/signup'>Volver a Inicio de Sesión</Link>
        </div>
      </div>
    </div>
  )
}

export default ForgottenPassword
