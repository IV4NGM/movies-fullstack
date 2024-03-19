import { useSelector } from 'react-redux'
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined'

const Info = ({ show = false }) => {
  const { user } = useSelector((state) => state.auth)

  if (!show) return <></>
  return (
    <>
      <p className='dropdown-item-flex__p'><AccountBoxOutlinedIcon className='dropdown-item-flex__icon' /> {user.name}</p>
      <p className='dropdown-item-flex__p'><EmailOutlinedIcon className='dropdown-item-flex__icon' /> {user.email}</p>
      {user?.isAdmin ? <p className='dropdown-item-flex__p'><VerifiedUserOutlinedIcon className='dropdown-item-flex__icon' /> Administrador</p> : ''}
    </>
  )
}

export default Info
