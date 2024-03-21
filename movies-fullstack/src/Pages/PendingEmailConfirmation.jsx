import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { reset, sendVerificationEmail } from '@/Features/Auth/authSlice'

import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import Spinner from '@/Components/Spinner/Spinner'

const PendingEmailConfirmation = () => {
  const { newUser } = useParams()
  const [timeCounter, setTimeCounter] = useState(10)
  const [resendEmail, setResendEmail] = useState(false)

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const { user, isError, isSuccess, isLoading, message } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!user || !user.email) {
      navigate('/login')
    }
    if (user && user.isVerified) {
      navigate('/')
    }
    const interval = setInterval(() => {
      if (timeCounter > 0) {
        setTimeCounter(timeCounter - 1)
      } else {
        clearInterval(interval)
      }
    }, 1000)

    if (timeCounter === 0) {
      setResendEmail(true)
    }

    if (isSuccess) {
      toast.success('Email enviado exitosamente')
      dispatch(reset())
    }
    if (isError) {
      toast.error('No se pudo enviar el email')
      dispatch(reset())
    }

    return () => clearInterval(interval)
  }, [user, navigate, timeCounter, dispatch, isSuccess, isError, message])

  const handleResend = () => {
    dispatch(sendVerificationEmail(user.email))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className='page-container'>
      <h2 className='bold-text'>Confirma tu dirección de correo electrónico</h2>
      <h3 className='space-down'>¡Hola {user?.name}!</h3>
      <h4 className='space-down-lg'>Revisa tu correo electrónico para terminar de configurar tu cuenta</h4>
      <p>¿No encuentras el correo electrónico?</p>
      <button
        disabled={!resendEmail}
        onClick={() => {
          setResendEmail(false)
          setTimeCounter(10)
          handleResend()
        }}
      >Volver a enviar correo {timeCounter > 0 && `(${timeCounter})`}
      </button>
    </div>
  )
}

export default PendingEmailConfirmation
