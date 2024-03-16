/* eslint-disable react/prop-types */
import './LikesButton.scss'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import { red } from '@mui/material/colors'

import { useSelector, useDispatch } from 'react-redux'
import { likeMovie, resetLikesMovie, dislikeMovie } from '@/Features/Movies/movieSlice'
import { useNavigate } from 'react-router-dom'

const LikesButton = ({ like = true, filled = true, likesCount, movieId }) => {
  const navigate = useNavigate()

  let title = ''
  if (like) {
    if (filled) {
      title = 'Ya no me gusta'
    } else {
      title = 'Me gusta'
    }
  } else {
    if (filled) {
      title = 'Ya no me disgusta'
    } else {
      title = 'No me gusta'
    }
  }

  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)

  const onClick = () => {
    if (user?.token) {
      if (like) {
        if (filled) {
          dispatch(resetLikesMovie(movieId, user.token))
        } else {
          dispatch(likeMovie(movieId, user.token))
        }
      } else {
        if (filled) {
          dispatch(resetLikesMovie(movieId, user.token))
        } else {
          dispatch(dislikeMovie(movieId, user.token))
        }
      }
    } else {
      if (!user) {
        navigate('/login')
      } else {
        navigate('/verification-pending/0')
      }
    }
  }

  return (
    <div className='like-button-container'>
      <Tooltip title={title} onClick={onClick}>
        <IconButton>
          {like
            ? <>{filled ? <ThumbUpIcon color='success' /> : <ThumbUpOutlinedIcon color='success' />}</>
            : <>{filled ? <ThumbDownIcon sx={{ color: red[500] }} /> : <ThumbDownOutlinedIcon sx={{ color: red[500] }} />}</>}
        </IconButton>
      </Tooltip>
      <span>{likesCount}</span>
    </div>

  )
}

export default LikesButton
