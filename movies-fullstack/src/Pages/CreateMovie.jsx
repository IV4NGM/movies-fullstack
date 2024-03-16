import { useForm, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllGenres, createMovie } from '@/Features/Movies/movieSlice'

import TextField from '@mui/material/TextField'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'
import 'dayjs/locale/es'

import NoMovie from '@/assets/NoMovie.jpg'

const CreateMovie = () => {
  dayjs.locale('es')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { genres } = useSelector((state) => state.movie)

  const [backdropURL, setBackdropURL] = useState('')
  const [posterURL, setPosterURL] = useState('')

  const genresAllowed = genres

  const registerProductFormSchema = yup.object().shape({
    title: yup.string().required('Escribe el título de la película'),
    original_title: yup.string().required('Escribe el título original de la película'),
    original_language: yup.string().required('Escribe el idioma original de la película'),
    vote_average: yup.string('Debes ingresar un número').required('Escribe la calificación de la película').matches(/^[1-9]\d*(\.\d{1,2})?$/, 'La calificación debe ser un número con máximo 2 decimales').typeError('Debes ingresar un número'),
    overview: yup.string().required('Escribe la descripción de la película'),
    genre_ids: yup.array().min(1, 'Selecciona al menos un género'),
    backdrop_path: yup.string().required('Ingresa una imagen de fondo de la película'),
    poster_path: yup.string().required('Ingresa el póster de la película')
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
    formattedData.genre_ids = formattedData.genre_ids.map((id) => parseInt(id))
    dispatch(createMovie(formattedData))
    navigate('/')
  }

  useEffect(() => {
    if (user) {
      if (!user.isVerified) {
        navigate('/verification-pending/0')
      } else if (!user.isAdmin) {
        navigate('/')
      }
    } else {
      navigate('/login')
    }
    dispatch(getAllGenres())
  }, [navigate, user, dispatch])

  return (
    <div className='page-container'>
      <h2>Crear una nueva película</h2>
      <div className='form form-movie'>
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
                {...register('original_language')}
              />
              <label htmlFor='original_language'>Idioma original de la película</label>
            </div>
            <p className='warning-text'>{errors.original_language?.message}</p>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                name='release_date'
                control={control}
                defaultValue={null}
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

            <div className='form-floating'>
              <input
                type='text'
                name='vote_average'
                placeholder='Calificación promedio de la película'
                id='vote_average'
                className='form-control'
                {...register('vote_average')}
              />
              <label htmlFor='vote_average'>Calificación promedio de la película</label>
            </div>
            <p className='warning-text'>{errors.vote_average?.message}</p>

            <p className='medium-text'>Géneros de la película</p>
            {genresAllowed.map((genre, index) => (
              <div className='form-check' key={`genre-div-${index}`}>
                <input
                  type='checkbox'
                  id={`genre_${genre.genre_id}`}
                  value={genre.genre_id}
                  className='form-check-input'
                  {...register('genre_ids')}
                />
                <label className='form-check-label' htmlFor={`genre_${genre.genre_id}`}>{genre.name}</label>
              </div>))}
            <p className='warning-text'>{errors.genre_ids?.message}</p>

            <div className='form-floating'>
              <textarea
                name='overview'
                placeholder='Resumen de la película'
                id='overview'
                className='form-control'
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
                value={backdropURL}
                onChange={(event) => setBackdropURL(event.target.value)}
              />
              <label htmlFor='backdrop_path'>URL de la imagen de fondo de la película</label>
            </div>
            <img
              src={backdropURL || NoMovie || ''} className='movie-image-card edit-image' alt='Movie-image' onError={({ currentTarget }) => {
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
                value={posterURL}
                onChange={(event) => setPosterURL(event.target.value)}
              />
              <label htmlFor='poster_path'>URL del póster de la película</label>
            </div>
            <img
              src={posterURL || NoMovie || ''} className='movie-image-card edit-image' alt='Movie-image' onError={({ currentTarget }) => {
                currentTarget.onerror = null
                currentTarget.src = NoMovie
              }}
            />
            <p className='warning-text'>{errors.poster_path?.message}</p>
            {/* <div className='form-flex-row'>
              <div className='form-check'>
                <input className='form-check-input' type='radio' name='image-src' id='image-src-url' value='url' checked={imageSrc === 'url'} onChange={(event) => setImageSrc(event.target.value)} />
                <label className='form-check-label' htmlFor='image-src-url'>
                  URL
                </label>
              </div>
              <div className='form-check'>
                <input className='form-check-input' type='radio' name='image-src' id='image-src-file' value='file' checked={imageSrc === 'file'} onChange={(event) => setImageSrc(event.target.value)} />
                <label className='form-check-label' htmlFor='image-src-file'>
                  De archivo
                </label>
              </div>
            </div> */}

            {/* {imageSrc === 'url'
              ? (
                <>
                  <div className='form-floating'>
                    <input
                      type='text'
                      name='image'
                      placeholder='URL'
                      id='image'
                      className='form-control'
                      {...register('image')}
                      value={imageUrl}
                      onChange={(event) => setImageUrl(event.target.value)}
                    />
                    <label htmlFor='image'>URL de la imagen del producto</label>
                  </div>
                  <img
                    src={imageUrl || ProductDefaultImage || ''} className='product-image-card edit-image' alt='Product-image' onError={({ currentTarget }) => {
                      currentTarget.onerror = null
                      currentTarget.src = ProductDefaultImage
                    }}
                  />
                  <p className='warning-text'>{errors.image?.message}</p>
                </>
              )
              : (
                <div className='form-flex-column'>
                  <input
                    type='file'
                    name='image64'
                    id='image64'
                    className='form-control'
                    onChange={(event) => {
                      setImageFile(URL.createObjectURL(event.target.files[0]))
                      handleFileRead(event)
                    }}
                  />
                  <img src={imageFile || ProductDefaultImage} className='product-image-card edit-image' alt='Product-image' />
                  <p className='warning-text'>{base64ErrorText}</p>
                </div>
              )} */}

            <button type='submit' className='btn btn-success'>
              Crear película
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateMovie
