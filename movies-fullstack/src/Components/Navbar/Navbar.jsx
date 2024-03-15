import { NavLink } from 'react-router-dom'
import eagleIcon from '@/assets/eagle-icon.png'

const Navbar = () => {
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
            <button type='button' className='form-control me-2 btn btn-outline-secondary'>Regístrate</button>
            <button className='form-control me-2 btn btn-outline-success' type='submit'>Iniciar sesión</button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
