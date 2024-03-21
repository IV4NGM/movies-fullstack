import Modal from 'react-bootstrap/Modal'
import './GeneralModal.scss'
import { useNavigate } from 'react-router-dom'
import { setShowTokenModal, logout, reset } from '@/Features/Auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { resetApiState } from '@/Features/Movies/movieSlice'
import { useEffect, useState } from 'react'

// eslint-disable-next-line react/prop-types
const GeneralModal = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [showModal, setShowModal] = useState(true)
  const { showTokenModal, tokenModalInfo } = useSelector((state) => state.auth)
  const onYes = tokenModalInfo?.onYes === 'LOGIN' ? '/login' : '/'
  const onNo = tokenModalInfo.onNo === 'LOGIN' ? '/login' : '/'

  useEffect(() => {
    setShowModal(showTokenModal)
  }, [showTokenModal])

  return (
    <Modal
      show={showModal} backdrop={tokenModalInfo?.estatico ? 'static' : true} keyboard={!tokenModalInfo?.estatico} onHide={() => {
        if (onNo === '/login') {
          dispatch(logout())
          dispatch(reset())
          dispatch(resetApiState())
          setTimeout(() => {
            navigate('/login')
          }, 10)
        } else {
          dispatch(reset())
          dispatch(resetApiState())
          navigate(onNo)
        }
        dispatch(setShowTokenModal(false))
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title><h3>{tokenModalInfo?.title}</h3></Modal.Title>
      </Modal.Header>
      <Modal.Body><p className='medium-text'>{tokenModalInfo?.text}</p></Modal.Body>
      <Modal.Footer>
        {
          tokenModalInfo?.isCancelButton
            ? (
              <button
                className='btn btn-secondary btn-modal' onClick={() => {
                  onNo()
                  dispatch(setShowTokenModal(false))
                }}
              >{tokenModalInfo?.textNo}
              </button>
              )
            : ''
        }
        <button
          className='btn btn-outline-success btn-modal' onClick={() => {
            if (onYes === '/login') {
              dispatch(logout())
              dispatch(reset())
              dispatch(resetApiState())
              setTimeout(() => {
                navigate('/login')
              }, 10)
            } else {
              navigate(onYes)
              dispatch(reset())
              dispatch(resetApiState())
            }
            dispatch(setShowTokenModal(false))
          }}
        >
          {tokenModalInfo?.textYes}
        </button>
      </Modal.Footer>
    </Modal>
  )
}

export default GeneralModal
