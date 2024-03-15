import { NavLink, useNavigate } from 'react-router-dom'
import eagleIcon from '@/assets/eagle-icon.png'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '@/Features/Auth/authSlice'

const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/login')
  }

  return (
    <nav className='navbar navbar-expand-lg bg-body-tertiary sticky-top' data-bs-theme='dark'>
      <div className='container-fluid'>
        <NavLink className='navbar-brand' to='/'>
          <img src={eagleIcon} alt='Eagle blade logo' className='d-inline-block align-text-top logo-nav' />
          <p>Eagle Blade</p>
        </NavLink>
        <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarSupportedContent'>
          <span className='navbar-toggler-icon' />
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <a className='nav-link active'>Las películas y series más taquilleras</a>
            </li>
          </ul>
          <div className='d-flex'>
            <button type='button' className='form-control me-2 btn btn-outline-secondary' onClick={() => navigate('/signup')}>Regístrate</button>
            <button className='form-control me-2 btn btn-outline-success' onClick={() => navigate('/login')}>Iniciar sesión</button>
            <button type='button' className='form-control me-2 btn btn-outline-secondary' onClick={onLogout}>Cerrar sesión</button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
