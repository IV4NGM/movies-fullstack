import './PasswordFormInput.scss'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { useState } from 'react'

const PasswordFormInput = ({ name, placeholder, id, label = 'Contraseña', hasDefaultValue = false, initialState = {}, register, error }) => {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <>
      <div className='form-floating form-password-input'>
        <input
          type={showPassword ? 'text' : 'password'}
          name={name}
          placeholder={placeholder}
          id={id}
          className='form-control'
          defaultValue={hasDefaultValue ? initialState?.password : ''}
          {...register(id)}
        />
        <label htmlFor={id}>{label}</label>
        <div className='form-password-input-toggler' onClick={() => setShowPassword(!showPassword)}>
          <Tooltip title={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}>
            <IconButton>
              {showPassword ? <VisibilityOffOutlinedIcon sx={{ color: 'black' }} /> : <VisibilityOutlinedIcon sx={{ color: 'black' }} />}
            </IconButton>
          </Tooltip>
        </div>
      </div>
      <p className='warning-text'>{error?.message}</p>
    </>
  )
}

export default PasswordFormInput
