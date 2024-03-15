import { BrowserRouter } from 'react-router-dom'
import RoutesIndex from '@/Routes/RoutesIndex'
import Navbar from '@/Components/Navbar/Navbar'
import Footer from '@/Components/Footer/Footer'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <RoutesIndex />
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
