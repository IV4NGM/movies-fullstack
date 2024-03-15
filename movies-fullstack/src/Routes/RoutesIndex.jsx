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

const RouterIndex = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/confirm/:id/:token' element={<ConfirmEmail />} />
      <Route path='/me' element={<UserInfo />} />
      <Route path='/new-movie' element={<CreateMovie />} />
      <Route path='/edit/:id' element={<EditMovie />} />
      <Route path='/forgot' element={<ForgottenPassword />} />
      <Route path='/reset/:id/:token' element={<ResetPassword />} />
      <Route path='/*' element={<PageNotFound />} />
    </Routes>
  )
}

export default RouterIndex
