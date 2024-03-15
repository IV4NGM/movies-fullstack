import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { reset, verifyUser, logout } from '@/Features/Auth/authSlice'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import Spinner from '@/Components/Spinner/Spinner'

const ConfirmEmail = () => {
  const { id, token } = useParams()
  const [callApi, setCallApi] = useState(true)

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const { user, isError, isSuccess, isLoading, message } = useSelector((state) => state.auth)

  useEffect(() => {
    if (id && token && callApi) {
      setCallApi(false)
      dispatch(verifyUser({ id, token }))
      dispatch(reset())
    }
    if (isSuccess) {
      toast.success('Email verificado exitosamente')
      dispatch(reset())
      dispatch(logout())

      setTimeout(() => {
        navigate('/login')
      }, 300)
    }

    if (isError) {
      if (message === 'El usuario ya está verificado') {
        toast.success('El usuario ya está verificado')
        dispatch(reset())
        if (!user?.token) {
          dispatch(logout())
        }
        setTimeout(() => {
          navigate('/')
        }, 300)
      } else {
        toast.error(message)
      }

      dispatch(reset())
    }
    dispatch(reset())
  }, [id, token, isSuccess, isError, dispatch, navigate, message])

  // if (isLoading) {
  //   return <Spinner />
  // }

  return (
    <div className='page-container'>
      <h2>Confirmando tu email...</h2>
      <p>Esto puede tardar unos momentos</p>
    </div>
  )
}

export default ConfirmEmail
