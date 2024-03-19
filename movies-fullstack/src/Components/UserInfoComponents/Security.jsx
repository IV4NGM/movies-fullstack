import { useSelector } from 'react-redux'

const Security = ({ show = false }) => {
  const { user } = useSelector((state) => state.auth)
  if (!show) return <></>
  return (
    <div>
      <h4>Cambiar contraseña</h4>
      <h4 className='security-danger'>Zona de peligro</h4>
      <button className='btn btn-danger'>Eliminar cuenta</button>
    </div>
  )
}

export default Security
