import { ToastContainer } from 'react-toastify'
import './App.css'
import Header from './components/custom/Header'
import CreateTrip from './pages/Create/CreateTrip'
import Home from './pages/Home/Home'
import { Routes ,Route} from 'react-router-dom'
import ViewTrip from './pages/view/[tripId]/viewTrip'
import { Footer } from './pages/view/components/Footer'
import MyTrips from './pages/MyTrips/MyTrips'
import Hero from './components/custom/Hero'
function App() {
  return (
    <>
    <ToastContainer/>
    <Header/>
    <Routes>
      <Route path='/' element={<Hero/>}/>
      <Route path='/create-trip' element={<CreateTrip/>}/>
      <Route path='/view-trip/:tripId' element={<ViewTrip/>}/>
      <Route path='/my-trips' element={<MyTrips/>}/>
    </Routes>
    <Footer/>
    </>
  )
}

export default App
