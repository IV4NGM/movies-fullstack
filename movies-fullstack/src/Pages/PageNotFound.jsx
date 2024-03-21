import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import { useNavigate } from 'react-router-dom'

const PageNotFound = () => {
  const navigate = useNavigate()
  return (
    <div className='page-container'>
      <h2 className='space-up space-down'>No hemos encontrado la página que buscas</h2>
      <SearchOutlinedIcon className='not-found-image' />
      <h3 className='space-down-lg'>Vuelve al inicio para disfrutar tus películas favoritas</h3>
      <button className='btn btn-success btn-lg spaced' onClick={() => navigate('/')}>Ir a Inicio</button>
    </div>
  )
}

export default PageNotFound
