import React from 'react'
import{BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Landingpage from './pages/Landingpage'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import Dashboard from './pages/intern/Dashboard'
import AdminDashboard from './pages/admin/AdminDashboard'
import Notfound from './pages/Notfound'
import Adminlogin from './pages/auth/Adminlogin'

const App = () => {
  return (
<Router>
  <Routes>
    <Route path='/' element={<Landingpage/>} />
    <Route path='/Login' element={<Login/>} />
    <Route path='/Signup' element={<Signup/>} />
    <Route path='/Dashboard' element={<Dashboard/>} />
    <Route path='/Adminlogin' element={<Adminlogin/>} />
    <Route path='/AdminDashboard' element={<AdminDashboard/>} />
    <Route path='*' element={<Notfound/>} />
  </Routes>
</Router>
  )
}

export default App