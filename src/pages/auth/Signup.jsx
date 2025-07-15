import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import homelogo from '../../assets/homelogo.jpg';
import { useLanguage } from '../../contexts/LanguageContext';

const API_URL = "http://192.168.0.135:3001";

const Signup = () => {
  const { language, setLanguage } = useLanguage();

  const [fullName, setfullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [college, setCollege] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const content = {
    en: {
      pageTitle: 'Sign Up',
      fullNameLabel: 'Full Name',
      fullNamePlaceholder: 'Enter your full name',
      emailLabel: 'Email address',
      emailPlaceholder: 'Enter your email',
      passwordLabel: 'Password',
      passwordPlaceholder: 'Create a password',
      confirmPasswordLabel: 'Confirm Password',
      confirmPasswordPlaceholder: 'Confirm your password',
      collegeLabel: 'College',
      collegePlaceholder: 'Enter your college name',
      signupButton: 'Sign Up',
      alreadyAccount: 'Already have an account? ',
      loginLink: 'Login',
      languageLabel: 'Select Language',
      errors: {
        allFields: 'All fields are required',
        passwordMismatch: 'Passwords do not match',
        userExists: 'User already exists',
      },
    },
    hi: {
      pageTitle: 'साइन अप करें',
      fullNameLabel: 'पूरा नाम',
      fullNamePlaceholder: 'अपना पूरा नाम दर्ज करें',
      emailLabel: 'ईमेल पता',
      emailPlaceholder: 'अपना ईमेल दर्ज करें',
      passwordLabel: 'पासवर्ड',
      passwordPlaceholder: 'पासवर्ड बनाएं',
      confirmPasswordLabel: 'पासवर्ड की पुष्टि करें',
      confirmPasswordPlaceholder: 'अपना पासवर्ड पुष्टि करें',
      collegeLabel: 'कॉलेज का नाम',
      collegePlaceholder: 'अपना कॉलेज का नाम दर्ज करें',
      signupButton: 'साइन अप करें',
      alreadyAccount: 'पहले से खाता है? ',
      loginLink: 'लॉगिन',
      languageLabel: 'भाषा चुनें',
      errors: {
        allFields: 'सभी फ़ील्ड आवश्यक हैं',
        passwordMismatch: 'पासवर्ड मेल नहीं खाते',
        userExists: 'उपयोगकर्ता पहले से मौजूद है',
      },
    },
  };

  const lang = content[language];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName || !email || !password || !confirmPassword || !college) {
      setError(lang.errors.allFields);
      return;
    }

    if (password !== confirmPassword) {
      setError(lang.errors.passwordMismatch);
      return;
    }

    try {
      // const encryptedEmail = encryptWithRSA(email);
      // const encryptedPassword = encryptWithRSA(password);
      const response = await axios.post(`${API_URL}/signup`, {
        fullName,
        email,
        password,
        confirmPassword,
        college,
      });

      if (response.status === 200 || response.status === 201) {
        sessionStorage.setItem('loggedInUser', JSON.stringify(response.data.user));
        navigate('/dashboard');
      }
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setError(lang.errors.userExists);
      } else {
        setError(language === 'en' ? 'Signup failed. Please try again.' : 'साइनअप विफल। कृपया पुनः प्रयास करें।');
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
            <label htmlFor="fullName" className="form-label">{lang.fullNameLabel}</label>
            <input type="text" className="form-control" id="fullName" placeholder={lang.fullNamePlaceholder} value={fullName} onChange={(e) => setfullName(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">{lang.emailLabel}</label>
            <input type="email" className="form-control" id="email" placeholder={lang.emailPlaceholder} value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label htmlFor="college" className="form-label">{lang.collegeLabel}</label>
            <input type="text" className="form-control" id="college" placeholder={lang.collegePlaceholder} value={college} onChange={(e) => setCollege(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">{lang.passwordLabel}</label>
            <input type="password" className="form-control" id="password" placeholder={lang.passwordPlaceholder} value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">{lang.confirmPasswordLabel}</label>
            <input type="password" className="form-control" id="confirmPassword" placeholder={lang.confirmPasswordPlaceholder} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </div>

          {error && <div className="alert alert-danger" role="alert">{error}</div>}

          <div className="d-grid">
            <button type="submit" className="btn btn-success">{lang.signupButton}</button>
          </div>
        </form>

        <p className="mt-3 text-center">
          {lang.alreadyAccount}
          <Link to="/login">{lang.loginLink}</Link>
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

export default Signup;
