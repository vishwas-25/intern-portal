import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import homelogo from '../../assets/homelogo.jpg';
import { useLanguage } from '../../contexts/LanguageContext';
import { encryptWithRSA } from '../../utils/encryption';
//import jwt from 'jsonwebtoken'
// Local backend URL
const API_URL = "http://192.168.0.135:3001";

// eslint-disable-next-line
const toBase64 = (str) => btoa(unescape(encodeURIComponent(str)));

const Login = () => {
  const { language, setLanguage } = useLanguage();
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [error, seterror] = useState('');
  const navigate = useNavigate();

  const content = {
    en: {
      pageTitle: 'Login',
      emailLabel: 'Email address',
      emailPlaceholder: 'Enter your email',
      passwordLabel: 'Password',
      passwordPlaceholder: 'Enter your password',
      loginButton: 'Login',
      signupPrompt: "Don't have an account? ",
      signupLink: 'Sign Up',
      languageLabel: 'Select Language',
    },
    hi: {
      pageTitle: 'लॉगिन',
      emailLabel: 'ईमेल पता',
      emailPlaceholder: 'अपना ईमेल दर्ज करें',
      passwordLabel: 'पासवर्ड',
      passwordPlaceholder: 'अपना पासवर्ड दर्ज करें',
      loginButton: 'लॉगिन',
      signupPrompt: 'खाता नहीं है? ',
      signupLink: 'साइन अप करें',
      languageLabel: 'भाषा चुनें',
    },
  };

  const lang = content[language];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Encode credentials before sending
      const encryptedEmail = encryptWithRSA(email);
const encryptedPassword = encryptWithRSA(password);
      const response = await axios.post(
        `${API_URL}/login`,
        {
          email: encryptedEmail,
          password: encryptedPassword,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        sessionStorage.setItem('loggedInUser', JSON.stringify(response.data.user));
        if (response.data.user.role === 'admin') {
          navigate('/Adminlogin');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        seterror(language === 'en' ? 'Invalid email or password' : 'अमान्य ईमेल या पासवर्ड');
      } else {
        console.error(err);
        seterror(language === 'en' ? 'Login failed. Please try again.' : 'लॉगिन विफल। कृपया पुनः प्रयास करें।');
      }
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card p-4 shadow" style={{ maxWidth: '500px', width: '100%' }}>
        <div className="mb-3 text-end">
          <label htmlFor="language-select" className="me-2">{lang.languageLabel}:</label>
          <select
            id="language-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="form-select d-inline-block"
            style={{ width: 'auto' }}
          >
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
          </select>
        </div>

        <h3 className="text-center mb-4">{lang.pageTitle}</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">{lang.emailLabel}</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder={lang.emailPlaceholder}
              value={email}
              onChange={(e) => setemail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">{lang.passwordLabel}</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder={lang.passwordPlaceholder}
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-danger">{error}</p>}

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">{lang.loginButton}</button>
          </div>
        </form>

        <p className="mt-3 text-center">
          {lang.signupPrompt}
          <Link to="/signup">{lang.signupLink}</Link>
        </p>

        <div className="text-center mt-4">
          <Link to="/">
            <img src={homelogo} alt="Home Logo" style={{ height: '60px', borderRadius: '8px' }} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;