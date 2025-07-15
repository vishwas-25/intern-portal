import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Hamburgersidebar from '../../components/Hamburgersidebar';

// Set axios to send cookies with every request
axios.defaults.withCredentials = true;

const Dashboardnavbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("loggedInUser"));

  const getGreetings = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const handleLogout = async () => {
    try {
      console.log('🔁 Logging out...');
      sessionStorage.clear();
      navigate("/login");
    } catch (error) {
      console.error("❌ Logout failed:", error);
    }
  };

  const handleEditProfile = () => {
    navigate("/profile");
  };

  const navLinks = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Profile', href: '/profile' },
    { label: "Interns List", href: "/interns" },
    { label: 'Settings', href: '/settings' },
    { label: 'Logout', href: '#', onClick: handleLogout }, // Sidebar logout
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 shadow">
      <Hamburgersidebar links={navLinks} />

      <a className="navbar-brand" href="/">Intern Dashboard</a>

      <div className="ms-auto text-white d-flex align-items-center gap-3">
        <span>
          {getGreetings()}, <strong>{user?.name || 'Intern'} 👋</strong>
        </span>

       
        <div className="dropdown">
          <button
            className="btn btn-outline-light btn-sm dropdown-toggle"
            type="button"
            id="userDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            
          </button>
          <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
            <li>
              <button className="dropdown-item" onClick={handleEditProfile}>
                Edit Profile
              </button>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <button className="dropdown-item text-danger" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Dashboardnavbar;
