import { BrowserRouter } from 'react-router-dom'
import RoutesIndex from '@/Routes/RoutesIndex'
import Navbar from '@/Components/Navbar/Navbar'
import Footer from '@/Components/Footer/Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <RoutesIndex />
        <Footer />
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App
