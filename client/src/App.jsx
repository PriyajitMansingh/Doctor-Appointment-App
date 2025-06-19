import {BrowserRouter,Routes,Route} from "react-router-dom"
import HomePage from "./pages/HomePage"
import Login from "./pages/Login"
import Register from "./pages/Register" 
import  {useSelector}  from "react-redux"
import Spinner from "./components/Spinner.jsx"
import PublicRoute from "./components/PublicRoute"
import ProtectedRoute from "./components/ProtectedRoute"
import ApplyDoctor from "./pages/ApplyDoctor.jsx"
import NotificationPage from './pages/NotificationPage';
import User from "./admin/User"
import Doctor from './admin/Doctor';
import Profile from "./pages/doctor/Profile.jsx"
import BookingPage from "./pages/BookingPage.jsx"
import Appointments from "./pages/Appointments.jsx"
import DoctorAppointments from "./pages/doctor/DoctorAppointments.jsx"
function App() {
  const {loading}=useSelector(state=>state.alerts)
return (
    <>
      <BrowserRouter>
      {loading?(<Spinner/>): (<Routes>
          <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/apply-doctor" element={<ProtectedRoute><ApplyDoctor /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute><User /></ProtectedRoute>} />
          <Route path="/admin/doctors" element={<ProtectedRoute><Doctor /></ProtectedRoute>} />
          <Route path="/doctor/profile/:id" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/book-appointment/:doctorId" element={<ProtectedRoute><BookingPage /></ProtectedRoute>} />
          <Route path="/notification" element={<ProtectedRoute><NotificationPage /></ProtectedRoute>} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
          <Route path="/appointments" element={<ProtectedRoute><Appointments /></ProtectedRoute>} />
          <Route path="/doctor-appointments" element={<ProtectedRoute><DoctorAppointments /></ProtectedRoute>} />
        </Routes>)}
       
      </BrowserRouter>
    </>
  )
}

export default App
