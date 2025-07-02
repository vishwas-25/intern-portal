import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import homelogo from '../../assets/homelogo.jpg';
import dummydata from '../../data';
import { useLanguage } from '../../contexts/LanguageContext'; // Import language context

const Signup = () => {
  const { language, setLanguage } = useLanguage();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setError(lang.errors.allFields);
      return;
    }

    if (password !== confirmPassword) {
      setError(lang.errors.passwordMismatch);
      return;
    }

    const userExists = dummydata.find((user) => user.email === email);
    if (userExists) {
      setError(lang.errors.userExists);
      return;
    }

    const newUser = {
      name,
      email,
      password,
      role: 'intern', // default role
    };

    dummydata.push(newUser); // Just for demo
    localStorage.setItem('loggedInUser', JSON.stringify(newUser));
    navigate('/dashboard');
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: '100vh' }}
    >
      <div className="card p-4 shadow" style={{ maxWidth: '500px', width: '100%' }}>
        {/* Language Selector */}
        <div className="mb-3 text-end">
          <label htmlFor="language-select" className="me-2">
            {lang.languageLabel}:
          </label>
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
            <label htmlFor="name" className="form-label">
              {lang.fullNameLabel}
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder={lang.fullNamePlaceholder}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              {lang.emailLabel}
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder={lang.emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              {lang.passwordLabel}
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder={lang.passwordPlaceholder}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              {lang.confirmPasswordLabel}
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              placeholder={lang.confirmPasswordPlaceholder}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <div className="d-grid">
            <button type="submit" className="btn btn-success">
              {lang.signupButton}
            </button>
          </div>
        </form>

        <p className="mt-3 text-center">
          {lang.alreadyAccount}
          <Link to="/login">{lang.loginLink}</Link>
        </p>

        <div className="text-center mt-4">
          <Link to="/">
            <img
              src={homelogo}
              alt="Home Logo"
              style={{
                height: '60px',
                borderRadius: '8px',
              
              }}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
