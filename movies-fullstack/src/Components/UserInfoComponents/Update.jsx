import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { updateUser } from '@/Features/Auth/authSlice'
import LoopOutlinedIcon from '@mui/icons-material/LoopOutlined'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'

const Update = ({ show = false, setSelectedAction }) => {
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)

  const updateUserFormSchema = yup.object().shape({
    name: yup.string().required('Escribe tu nombre').default(user?.name)
  })

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(updateUserFormSchema)
  })

  const onSubmit = (data) => {
    dispatch(updateUser(data))
  }

  if (!show) return <></>
  return (
    <>
      <h4>Actualizar datos</h4>
      <div className='form update-user-form'>
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
              defaultValue={user?.name}
              {...register('name', { required: true, maxLength: 35 })}
            />
            <label htmlFor='name'>Nombre</label>
          </div>
          <p className='warning-text'>{errors.name?.message}</p>
          <div className='flex-row buttons-row'>
            <button type='button' className='btn btn-secondary' onClick={() => setSelectedAction('info')}><CancelOutlinedIcon /> Descartar cambios</button>
            <button type='submit' className='btn btn-success btn-form'>
              <LoopOutlinedIcon /> Actualizar datos
            </button>
          </div>
        </form>
      </div>
    </>

  )
}

export default Update
