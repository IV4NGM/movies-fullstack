import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { logout, reset, resetPassword } from '@/Features/Auth/authSlice'
import Spinner from '@/Components/Spinner/Spinner'

const ResetPassword = () => {
  const { id, token } = useParams()
  const [callApi, setCallApi] = useState(true)

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const { user, isError, isSuccess, isLoading, message } = useSelector((state) => state.auth)

  const signUpFormSchema = yup.object().shape({
    password: yup.string().required('Ingresa tu contraseña').min(5, 'La contraseña debe tener al menos 5 caracteres').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%.^&*])/, 'La contraseña debe tener un número, una letra mayúscula, una letra minúscula y un caracter especial'),
    confirm_password: yup.string().oneOf([yup.ref('password'), null], 'Las contraseñas no coinciden').required('Vuelve a escribir tu contraseña')
  })

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(signUpFormSchema)
  })

  const onSubmit = (data) => {
    const userData = {
      id,
      token,
      password: data.password
    }
    dispatch(resetPassword(userData))
  }

  useEffect(() => {
    dispatch(logout())
    if (isError) {
      toast.error(message)
    }
    if (isSuccess) {
      toast.success('Contraseña restablecida correctamente')
      navigate('/login')
    }
    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className='page-container'>
      <h2>Crea una nueva contraseña</h2>
      <div className='form'>
        <div className='form-container'>
          <form
            onSubmit={handleSubmit(onSubmit)}
          >
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
              Cambiar contraseña
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
