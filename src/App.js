import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Landingpage from './pages/Landingpage';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Dashboard from './pages/intern/Dashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import Adminlogin from './pages/auth/Adminlogin';
import Notfound from './pages/Notfound';
import Protectedroute from './components/Protectedroute';

// Intern pages
import InternsList from './pages/Internslist';
import Interndetails from './pages/Interndetails';
import ProfilePage from './pages/intern/ProfilePage';
import CollegeInternsPage from './pages/CollegeInternsPage'; 

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Landingpage/>} /> {/*landing page  agr ackend ka api na chal rha ho & u have to do designing in other page then just bring it upar*/}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/adminlogin" element={<Adminlogin />} />

        {/* Intern routes */}
        <Route path="/dashboard" element={<Protectedroute><Dashboard /></Protectedroute>} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/interns" element={<InternsList />} />
        <Route path="/interns/:id" element={<Interndetails />} />

        {/*  Grouped College Interns Route */}
        <Route path="/grouped/:college/:year" element={<CollegeInternsPage />} />

        {/* Admin */}
        <Route path="/admindashboard" element={<AdminDashboard />} />

        {/* Fallback */}
        <Route path="*" element={<Notfound />} />
      </Routes>
    </Router>
  );
};

export default App;





