import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { updatePassword, deleteUser, reset as resetAuth, logout } from '@/Features/Auth/authSlice'
import { useEffect, useState } from 'react'
import { resetApiState } from '@/Features/Movies/movieSlice'
import { useNavigate } from 'react-router-dom'
import CustomModal from '@/Components/CustomModal/CustomModal'

const Security = ({ show = false, setSelectedAction }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isError, isSuccess, message, errorType, successType } = useSelector((state) => state.auth)

  const [isLogoutSelected, setIsLogoutSelected] = useState(true)
  const [showModalDelete, setShowModalDelete] = useState(false)

  const updatePasswordFormSchema = yup.object().shape({
    password: yup.string().required('Ingresa tu contraseña actual'),
    new_password: yup.string().required('Ingresa tu nueva contraseña').min(5, 'La contraseña debe tener al menos 5 caracteres').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%.^&*])/, 'La contraseña debe tener un número, una letra mayúscula, una letra minúscula y un caracter especial'),
    confirm_password: yup.string().oneOf([yup.ref('new_password'), null], 'Las contraseñas no coinciden').required('Vuelve a escribir tu contraseña'),
    logout: yup.mixed().oneOf(['true', 'false']).defined().default('true')
  })

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(updatePasswordFormSchema)
  })

  const onSubmit = (data) => {
    const userData = {
      password: data.password,
      newPassword: data.new_password,
      logout: data.logout
    }
    console.log(userData)
    setIsLogoutSelected(data.logout)
    dispatch(updatePassword(userData))
  }

  useEffect(() => {
    if (isSuccess && (successType === 'UPDATED_PASSWORD' || successType === 'UPDATED_PASSWORD_LOGOUT')) {
      reset()
      setSelectedAction('info')
    }
    if (isSuccess && (successType === 'UPDATED_PASSWORD_LOGOUT' || successType === 'DELETED_USER')) {
      dispatch(logout())
      dispatch(resetAuth())
      dispatch(resetApiState())
      setTimeout(() => {
        navigate('/login')
      }, 10)
    }
    if (errorType !== 'AUTH') {
      dispatch(resetAuth())
    }
  }, [isError, isSuccess, message, errorType, successType, isLogoutSelected])

  if (!show) return <></>
  return (
    <>
      <h4>Cambiar contraseña</h4>
      <div className='form update-user-form'>
        <form
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='form-floating'>
            <input
              type='password'
              name='password'
              id='password'
              placeholder='contraseña actual'
              className='form-control'
              {...register('password')}
            />
            <label htmlFor='password'>Contraseña actual</label>
          </div>
          <p className='warning-text'>{errors.password?.message}</p>

          <div className='form-floating'>
            <input
              type='password'
              name='new_password'
              id='new_password'
              placeholder='nueva contraseña'
              className='form-control'
              {...register('new_password')}
            />
            <label htmlFor='new_password'>Nueva contraseña</label>
          </div>
          <p className='warning-text'>{errors.new_password?.message}</p>

          <div className='form-floating'>
            <input
              type='password'
              name='confirm_password'
              id='confirm_password'
              placeholder='confirma tu contraseña'
              className='form-control'
              {...register('confirm_password')}
            />
            <label htmlFor='confirm_password'>Confirma tu contraseña</label>
          </div>
          <p className='warning-text'>{errors.confirm_password?.message}</p>

          {/* <select name='logout' className='form-select' id='logout' {...register('logout')}>
            <option value='true'>Cerrar sesión de todos los dispositivos</option>
            <option value='false'>Mantener la sesión iniciada</option>
          </select> */}
          <div className='form-check'>
            <input className='form-check-input' type='radio' name='logout' id='logout1' {...register('logout')} value='true' defaultChecked />
            <label className='form-check-label' htmlFor='logout1'>
              Cerrar sesión de todos mis dispositivos
            </label>
          </div>
          <div className='form-check'>
            <input className='form-check-input' type='radio' name='logout' id='logout2' {...register('logout')} value='false' />
            <label className='form-check-label' htmlFor='logout2'>
              Mantener mi sesión iniciada
            </label>
          </div>

          <p className='warning-text'>{errors.logout?.message}</p>

          <div className='flex-row buttons-row'>
            <button type='button' className='btn btn-outline-secondary' onClick={() => setSelectedAction('info')}>Descartar cambios</button>
            <button type='submit' className='btn btn-success btn-form'>
              Actualizar datos
            </button>
          </div>
        </form>
      </div>
      <h4 className='security-danger'>Zona de peligro</h4>
      <button className='btn btn-danger' onClick={() => setShowModalDelete(true)}>Eliminar tu cuenta</button>
      <CustomModal
        title='Eliminar tu cuenta'
        showModal={showModalDelete}
        setShowModal={setShowModalDelete}
        text='¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer'
        onYes={() => dispatch(deleteUser())}
        textYes='Eliminar tu cuenta'
        textNo='Cancelar'
      />
    </>
  )
}

export default Security
