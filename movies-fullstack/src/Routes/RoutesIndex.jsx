import { Routes, Route } from 'react-router-dom'
import Home from '@/Pages/Home'
import Login from '@/Pages/Login'
import Signup from '@/Pages/Signup'
import PageNotFound from '@/Pages/PageNotFound'
import CreateMovie from '@/Pages/CreateMovie'
import EditMovie from '@/Pages/EditMovie'
import ForgottenPassword from '@/Pages/ForgottenPassword'
import ConfirmEmail from '@/Pages/ConfirmEmail'
import ResetPassword from '@/Pages/ResetPassword'
import UserInfo from '@/Pages/UserInfo'
import PendingEmailConfirmation from '@/Pages/PendingEmailConfirmation'
import MovieInfo from '@/Pages/MovieInfo'

const RouterIndex = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/verification-pending/:newUser' element={<PendingEmailConfirmation />} />
      <Route path='/verify/:id/:token' element={<ConfirmEmail />} />
      <Route path='/me' element={<UserInfo />} />
      <Route path='/movie/:id' element={<MovieInfo />} />
      <Route path='/new-movie' element={<CreateMovie />} />
      <Route path='/edit/:id' element={<EditMovie />} />
      <Route path='/forgotten' element={<ForgottenPassword />} />
      <Route path='/reset-password/:id/:token' element={<ResetPassword />} />
      <Route path='/*' element={<PageNotFound />} />
    </Routes>
  )
}

export default RouterIndex
