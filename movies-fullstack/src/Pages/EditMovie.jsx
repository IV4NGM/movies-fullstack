import { useForm, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getAllGenres, createMovie, resetApiState, getOneMovie, updateMovie, deleteMovie } from '@/Features/Movies/movieSlice'

import TextField from '@mui/material/TextField'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import utc from 'dayjs/plugin/utc'

import NoMovie from '@/assets/NoMovie.jpg'
import { toast } from 'react-toastify'
import Spinner from '@/Components/Spinner/Spinner'
import CustomModal from '@/Components/CustomModal/CustomModal'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import LoopOutlinedIcon from '@mui/icons-material/LoopOutlined'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'

dayjs.extend(utc)

const EditMovie = () => {
  dayjs.locale('es')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { id } = useParams()

  const { user } = useSelector((state) => state.auth)
  const { genres, movies, isSuccess, successType, isError, message, errorType, isLoading } = useSelector((state) => state.movie)

  let movieData = {}
  let releaseDate = {}

  const moviesIds = movies.map((movie) => movie._id)
  const movieIndex = moviesIds.findIndex((movieId) => movieId === id)

  if (movieIndex !== -1) {
    movieData = movies[movieIndex]
    // setBackdropURL(movieData?.backdrop_path)
    // setPosterURL(movieData?.poster_path)
  }
  releaseDate = new Date(movieData?.release_date) || new Date()
  const genreIdsSelected = movieData?.genres?.map(genre => genre.genre_id)

  const successTypesAllowed = ['UPDATED_MOVIE', 'DELETED_MOVIE']
  const errorTypesAllowed = ['GET_ONE_MOVIE', 'UPDATE_MOVIE', 'DELETE_MOVIE']

  const genresAllowed = genres

  const [showModalDelete, setShowModalDelete] = useState(false)

  const [backdropURL, setBackdropURL] = useState('')
  const [posterURL, setPosterURL] = useState('')

  const [userBackdropURL, setUserBackdropURL] = useState('')
  const [userPosterURL, setUserPosterURL] = useState('')

  yup.addMethod(yup.string, 'stripEmptyString', function () {
    return this.transform((value) => (value === '' ? undefined : value))
  })

  const registerProductFormSchema = yup.object().shape({
    title: yup.string().required('Escribe el título de la película').stripEmptyString().default(movieData.title),
    original_title: yup.string().required('Escribe el título original de la película').stripEmptyString().default(movieData.original_title),
    original_language: yup.string().required('Escribe el idioma original de la película').stripEmptyString().default(movieData.original_language),
    vote_average: yup.string('Debes ingresar un número').required('Escribe la calificación de la película').matches(/^[1-9]\d*(\.\d{1,3})?$/, 'La calificación debe ser un número con máximo 3 decimales').typeError('Debes ingresar un número'),
    overview: yup.string().required('Escribe la descripción de la película').stripEmptyString().default(movieData.overview),
    genre_ids: yup.array().min(1, 'Selecciona al menos un género'),
    backdrop_path: yup.string().required('Ingresa una imagen de fondo de la película').stripEmptyString().default(movieData.backdrop_path),
    poster_path: yup.string().required('Ingresa el póster de la película').stripEmptyString().default(movieData.poster_path)
  })

  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(registerProductFormSchema)
  })

  const onSubmit = (data) => {
    const { release_date: releaseDate, ...formattedData } = data
    const utcDate = new Date(releaseDate)
    utcDate.setUTCHours(0, 0, 0, 0) // Set time to 00:00:00:000 in UTC
    formattedData.release_date = utcDate.toUTCString()
    formattedData.addURLPrefix = false
    if (!formattedData.genre_ids) {
      toast.error('No hay géneros disponibles')
    } else {
      formattedData.genre_ids = formattedData.genre_ids.map((id) => parseInt(id))
      // console.log(formattedData)
      dispatch(updateMovie({ movieId: id, ...formattedData }))
    }
  }

  useEffect(() => {
    if (user) {
      if (!user.isVerified) {
        navigate('/verification-pending/0')
      } else if (!user.isAdmin) {
        navigate('/')
      }
      dispatch(getOneMovie(id))
    } else {
      navigate('/login')
    }
    dispatch(getAllGenres())
  }, [user])

  useEffect(() => {
    if (isError && errorTypesAllowed.includes(errorType)) {
      toast.error(message)
    }

    if (isSuccess && successTypesAllowed.includes(successType)) {
      toast.success(message)
      navigate('/')
    }
    if (errorType !== 'AUTH') {
      dispatch(resetApiState())
    }
  }, [isError, isSuccess, message, errorType])

  useEffect(() => {
    if (movieData) {
      setBackdropURL(movieData.backdrop_path || '')
      setPosterURL(movieData.poster_path || '')
    }
    setUserBackdropURL(backdropURL)
    setUserPosterURL(posterURL)
  }, [backdropURL, posterURL, movieData])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleBackdropChange = (event) => {
    setUserBackdropURL(event.target.value)
  }

  const handlePosterChange = (event) => {
    setUserPosterURL(event.target.value)
  }

  return (
    <div className='page-container'>
      <h2>Editar película</h2>
      <div className='form form-movie form-update-movie'>
        <div className='form-container'>
          <form
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className='form-floating'>
              <input
                type='text'
                name='title'
                placeholder='Título de la película en español'
                id='title'
                className='form-control'
                defaultValue={movieData?.title}
                {...register('title')}
              />
              <label htmlFor='title'>Título de la película en español</label>
            </div>
            <p className='warning-text'>{errors.title?.message}</p>

            <div className='form-floating'>
              <input
                type='text'
                name='original_title'
                placeholder='Título original de la película'
                id='original_title'
                className='form-control'
                defaultValue={movieData?.original_title}
                {...register('original_title')}
              />
              <label htmlFor='original_title'>Título original de la película</label>
            </div>
            <p className='warning-text'>{errors.original_title?.message}</p>

            <div className='form-floating'>
              <input
                type='text'
                name='original_language'
                placeholder='Idioma original de la película (en, es, ja)'
                id='original_language'
                className='form-control'
                defaultValue={movieData?.original_language}
                {...register('original_language')}
              />
              <label htmlFor='original_language'>Idioma original de la película</label>
            </div>
            <p className='warning-text'>{errors.original_language?.message}</p>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                name='release_date'
                control={control}
                defaultValue={dayjs.utc(movieData?.release_date)}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    label='Fecha de lanzamiento'
                    inputFormat='DD/MM/YYYY'
                    textField={<TextField error={!!errors.release_date} helperText={errors.release_date?.message} />}
                  />
                )}
              />
            </LocalizationProvider>

            <div className='form-floating form-average-score'>
              <input
                type='text'
                name='vote_average'
                placeholder='Calificación promedio de la película'
                id='vote_average'
                className='form-control'
                defaultValue={movieData?.vote_average}
                {...register('vote_average')}
              />
              <label htmlFor='vote_average'>Calificación promedio de la película</label>
            </div>
            <p className='warning-text'>{errors.vote_average?.message}</p>

            <p className='medium-text'>Géneros</p>
            {/* {!genresAllowed.length &&
              <button
                className='btn btn-secondary'
                type='button'
                onClick={() => {
                  dispatch(getAllGenres())
                }}
              >
                <LoopOutlinedIcon /> Recargar géneros
              </button>} */}
            <div className='form-genres-container'>
              {movieData?.genres?.length && genresAllowed.map((genre, index) => (
                <div className='form-check' key={`genre-div-${index}`}>
                  <input
                    type='checkbox'
                    id={`genre_${genre.genre_id}`}
                    value={genre.genre_id}
                    className='form-check-input'
                    defaultChecked={genreIdsSelected?.includes(genre.genre_id)}
                    {...register('genre_ids')}
                  />
                  <label className='form-check-label' htmlFor={`genre_${genre.genre_id}`}>{genre.name}</label>
                </div>))}
            </div>
            <p className='warning-text'>{errors.genre_ids?.message.includes('genre_ids') ? 'Selecciona al menos un género' : errors.genre_ids?.message}</p>

            <div className='form-floating'>
              <textarea
                name='overview'
                placeholder='Resumen de la película'
                id='overview'
                className='form-control'
                defaultValue={movieData?.overview}
                {...register('overview')}
              />
              <label htmlFor='overview'>Resumen de la película</label>
            </div>
            <p className='warning-text'>{errors.overview?.message}</p>

            <p className='medium-text'>Imagen de fondo la película</p>
            <div className='form-floating'>
              <input
                type='text'
                name='backdrop_path'
                placeholder='URL de la imagen de fondo'
                id='backdrop_path'
                className='form-control'
                {...register('backdrop_path')}
                value={userBackdropURL}
                onChange={handleBackdropChange}
              />
              <label htmlFor='backdrop_path'>URL de la imagen de fondo de la película</label>
            </div>
            <img
              src={userBackdropURL || NoMovie || ''} className='movie-image-card edit-image' alt='Movie-image' onError={({ currentTarget }) => {
                currentTarget.onerror = null
                currentTarget.src = NoMovie
              }}
            />
            <p className='warning-text'>{errors.backdrop_path?.message}</p>

            <p className='medium-text'>Póster de la película</p>
            <div className='form-floating'>
              <input
                type='text'
                name='poster_path'
                placeholder='URL del póster'
                id='poster_path'
                className='form-control'
                {...register('poster_path')}
                value={userPosterURL}
                onChange={handlePosterChange}
              />
              <label htmlFor='poster_path'>URL del póster de la película</label>
            </div>
            <img
              src={userPosterURL || NoMovie || ''} className='movie-image-card edit-image' alt='Movie-image' onError={({ currentTarget }) => {
                currentTarget.onerror = null
                currentTarget.src = NoMovie
              }}
            />
            <p className='warning-text'>{errors.poster_path?.message}</p>

            <button type='submit' className='btn btn-success'>
              <EditOutlinedIcon /> Modificar película
            </button>

            <div className='flex-row buttons-row'>
              <button type='button' className='btn btn-outline-secondary' onClick={() => navigate('/')}><CancelOutlinedIcon /> Descartar cambios</button>
              <button type='button' className='btn btn-outline-danger' onClick={() => setShowModalDelete(true)}><DeleteOutlineOutlinedIcon /> Eliminar película</button>
            </div>
          </form>
        </div>
      </div>
      <CustomModal
        title='Eliminar película'
        showModal={showModalDelete}
        setShowModal={setShowModalDelete}
        text='¿Estás seguro de que quieres eliminar esta película? Esta acción no se puede deshacer.'
        onYes={() => dispatch(deleteMovie(id))}
        textYes='Eliminar película'
        textNo='Cancelar'
        danger
      />
    </div>
  )
}

export default EditMovie
