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
          <Route path="/notification" element={<ProtectedRoute><NotificationPage /></ProtectedRoute>} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        </Routes>)}
       
      </BrowserRouter>
    </>
  )
}

export default App
