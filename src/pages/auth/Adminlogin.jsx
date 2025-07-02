import React from 'react';
import { Link } from 'react-router-dom';
import homelogo from '../../assets/homelogo.jpg';
import { useLanguage } from '../../contexts/LanguageContext';

const AdminLogin = () => {
  const { language, setLanguage } = useLanguage();

  const content = {
    en: {
      pageTitle: 'Admin Login',
      emailLabel: 'Email address',
      emailPlaceholder: 'Enter admin email',
      passwordLabel: 'Password',
      passwordPlaceholder: 'Enter password',
      loginButton: 'Login',
      languageLabel: 'Select Language',
    },
    hi: {
      pageTitle: 'एडमिन लॉगिन',
      emailLabel: 'ईमेल पता',
      emailPlaceholder: 'एडमिन ईमेल दर्ज करें',
      passwordLabel: 'पासवर्ड',
      passwordPlaceholder: 'पासवर्ड दर्ज करें',
      loginButton: 'लॉगिन',
      languageLabel: 'भाषा चुनें',
    },
  };

  const lang = content[language];

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

        <h3 className="text-center mb-4 text-danger">{lang.pageTitle}</h3>

        <form>
          <div className="mb-3">
            <label htmlFor="adminEmail" className="form-label">
              {lang.emailLabel}
            </label>
            <input
              type="email"
              className="form-control"
              id="adminEmail"
              placeholder={lang.emailPlaceholder}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="adminPassword" className="form-label">
              {lang.passwordLabel}
            </label>
            <input
              type="password"
              className="form-control"
              id="adminPassword"
              placeholder={lang.passwordPlaceholder}
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-danger">
              {lang.loginButton}
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <Link to="/">
            <img
              src={homelogo}
              alt="Home Logo"
              style={{
                height: '60px',
                borderRadius: '8px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
              }}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
