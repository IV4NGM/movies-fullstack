import '@/Styles/UserInfo.scss'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Info from '@/Components/UserInfoComponents/Info'
import Update from '@/Components/UserInfoComponents/Update'
import Security from '@/Components/UserInfoComponents/Security'

const UserInfo = () => {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

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
            <p>Mi información</p>
          </div>
          <div className={classesNamesCheckSelected('action action-border-bottom', 'update')} onClick={() => handleSelect('update')}>
            <p>Actualizar datos</p>
          </div>
          <div className={classesNamesCheckSelected('action', 'security')} onClick={() => handleSelect('security')}>
            <p>Seguridad</p>
          </div>
        </article>
        <aside className='context-info'>
          <Info show={selectedAction === 'info'} />
          <Update show={selectedAction === 'update'} setSelectedAction={setSelectedAction} />
          <Security show={selectedAction === 'security'} />
        </aside>
      </section>
    </div>
  )
}

export default UserInfo
