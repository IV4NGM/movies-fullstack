import '@/Styles/UserInfo.scss'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { reset } from '@/Features/Auth/authSlice'

import Info from '@/Components/UserInfoComponents/Info'
import Update from '@/Components/UserInfoComponents/Update'
import Security from '@/Components/UserInfoComponents/Security'

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import LoopOutlinedIcon from '@mui/icons-material/LoopOutlined'
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined'

import { toast } from 'react-toastify'

const UserInfo = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isError, isSuccess, message, errorType, successType } = useSelector((state) => state.auth)
  const errorTypesAllowed = ['UPDATE_PASSWORD', 'UPDATE_USER', 'DELETE_USER']
  const successTypesAllowed = ['UPDATED_PASSWORD', 'UPDATED_PASSWORD_LOGOUT', 'UPDATED_USER', 'DELETED_USER']

  const [selectedAction, setSelectedAction] = useState('info')

  useEffect(() => {
    if (user) {
      if (!user.isVerified) {
        navigate('/verification-pending/0')
      }
    } else {
      navigate('/login')
    }
  }, [])

  useEffect(() => {
    if (isError && errorTypesAllowed.includes(errorType)) {
      toast.error(message)
    }
    if (isSuccess && successTypesAllowed.includes(successType)) {
      toast.success(message)
    }
    if (errorType !== 'AUTH') {
      dispatch(reset())
    }
  }, [isError, isSuccess, message, errorType, successType])

  const handleSelect = (action) => {
    setSelectedAction(action)
  }

  const classesNamesCheckSelected = (classes, action) => {
    if (action === selectedAction) {
      return classes + ' action-selected'
    }
    return classes
  }

  return (
    <div className='page-container'>
      <h3>Configuración</h3>
      <section className='my-info'>
        <article className='actions-list'>
          <div className={classesNamesCheckSelected('action action-border-bottom', 'info')} onClick={() => handleSelect('info')}>
            <InfoOutlinedIcon /> <p>Mi información</p>
          </div>
          <div className={classesNamesCheckSelected('action action-border-bottom', 'update')} onClick={() => handleSelect('update')}>
            <LoopOutlinedIcon /> <p>Actualizar datos</p>
          </div>
          <div className={classesNamesCheckSelected('action', 'security')} onClick={() => handleSelect('security')}>
            <AdminPanelSettingsOutlinedIcon /> <p>Seguridad</p>
          </div>
        </article>
        <aside className='context-info'>
          <Info show={selectedAction === 'info'} />
          <Update show={selectedAction === 'update'} setSelectedAction={setSelectedAction} />
          <Security show={selectedAction === 'security'} setSelectedAction={setSelectedAction} />
        </aside>
      </section>
    </div>
  )
}

export default UserInfo
