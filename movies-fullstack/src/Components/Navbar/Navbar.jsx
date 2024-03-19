import './Navbar.scss'
import { NavLink, useNavigate } from 'react-router-dom'
import eagleIcon from '@/assets/eagle-icon.png'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '@/Features/Auth/authSlice'
import { resetApiState } from '@/Features/Movies/movieSlice'

import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import { useEffect } from 'react'

const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    dispatch(resetApiState())
    setTimeout(() => {
      navigate('/login')
    }, 10)
  }

  useEffect(() => {
    dispatch(resetApiState())
  }, [navigate])

  return (
    <nav className='navbar navbar-expand-lg bg-body-tertiary sticky-top' data-bs-theme='dark'>
      <div className='container-fluid'>
        <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarSupportedContent'>
          <span className='navbar-toggler-icon' />
        </button>
        <NavLink className='navbar-brand' to='/'>
          <img src={eagleIcon} alt='Eagle Blade Logo' className='d-inline-block align-text-top logo-nav' />
          <p>Eagle Blade</p>
        </NavLink>
      </div>
      <div className='collapse navbar-collapse' id='navbarSupportedContent'>
        <div className='navbar-nav me-auto mb-2 mb-lg-0'>
          {user?.token && user?.isAdmin ? <button className='btn btn-success btn-new-product' onClick={() => navigate('/new-movie')}>Crear película</button> : ''}
          {!user?.token
            ? (
              <>
                <button className='btn btn-secondary btn-not-logged' onClick={() => navigate('/signup')}>Registrarse</button>
                <button className='btn btn-success btn-not-logged' onClick={() => navigate('/login')}>Iniciar sesión</button>
              </>
            )
            : (
              <>
                <div className='dropdown navbar__dropdown'>
                  <button className='btn btn-outline-success dropdown-toggle' type='button' data-bs-toggle='dropdown'>
                    {user.name}
                  </button>
                  <ul className='dropdown-menu dropdown-menu-end'>
                    <li className='dropdown-item-flex dropdown-item-flex--margin'>
                      <h5 className='dropdown-item-flex--center dropdown-item-flex__title'><strong>Tu cuenta</strong></h5>
                      <p className='dropdown-item-flex__p'><AccountBoxOutlinedIcon className='dropdown-item-flex__icon' /> {user.name}</p>
                      <p className='dropdown-item-flex__p'><EmailOutlinedIcon className='dropdown-item-flex__icon' /> {user.email}</p>
                      {user?.isAdmin ? <p className='dropdown-item-flex__p'><VerifiedUserOutlinedIcon className='dropdown-item-flex__icon' /> Administrador</p> : ''}
                    </li>
                    <li><hr className='dropdown-divider' /></li>
                    <li className='dropdown-item'><NavLink to='/me'><SettingsOutlinedIcon /> Configuración</NavLink></li>
                    {user?.isAdmin && <li className='dropdown-item'><NavLink to='/new-movie'><AddOutlinedIcon /> Crear película</NavLink></li>}
                    <li><hr className='dropdown-divider' /></li>
                    <li className='dropdown-item'><span className='navbar-brand navbar-brand__logout' onClick={onLogout}><LogoutOutlinedIcon /> Cerrar Sesión</span></li>
                  </ul>
                </div>
              </>
            )}
        </div>
      </div>

    </nav>
  )
}

export default Navbar
