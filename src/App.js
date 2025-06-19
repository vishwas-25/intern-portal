import React from 'react'
import{BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Landingpage from './pages/Landingpage'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import Dashboard from './pages/intern/Dashboard'
import AdminDashboard from './pages/admin/AdminDashboard'
import Notfound from './pages/Notfound'
import Adminlogin from './pages/auth/Adminlogin'
import Protectedroute from './components/Protectedroute'
import Internslist from './pages/Internslist';        // list of interns
import Interndetails from './pages/Interndetails';

const App = () => {
  return (
<Router>
  <Routes>
  <Route path='/' element={<Landingpage />} />
  <Route path='/login' element={<Login />} />
  <Route path='/signup' element={<Signup />} />
  <Route path='/dashboard' element={<Protectedroute><Dashboard /></Protectedroute>} />
  <Route path='/adminlogin' element={<Adminlogin />} />
  <Route path='/admindashboard' element={<AdminDashboard />} />

  {/* ✅ Correct intern routes */}
  <Route path='/interns' element={<Internslist />} />
  <Route path='/interns/:id' element={<Interndetails />} />

  <Route path='*' element={<Notfound />} />
</Routes>
</Router>
  )
}

export default App


