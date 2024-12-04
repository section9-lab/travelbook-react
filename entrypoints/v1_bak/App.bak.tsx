import React, { useState } from 'react';
import SquarePage from './Component/SquarePage.bak';
import PersonalCenterPage from './Component/PersonalCenterPage.bak';
import './App.css';

// Logo Component
const AppLogo = () => (
  <div className="app-logo">
    🌍 TravelMate
  </div>
);

// Language Toggle Component
const LanguageToggle = () => {
  const [language, setLanguage] = useState('zh');

  const toggleLanguage = () => {
    setLanguage(language === 'zh' ? 'en' : 'zh');
  };

  return (
    <button className="language-toggle" onClick={toggleLanguage}>
      {language === 'zh' ? 'EN' : '中'}
    </button>
  );
};

// Main App Component
const App = () => {
  const [activePage, setActivePage] = useState('square');

  return (
    <div className="app-container">
      <div className="app-header">
        <AppLogo />
        <LanguageToggle />
      </div>

      <div className="app-content">
        {activePage === 'square' ? <SquarePage /> : <PersonalCenterPage />}
      </div>

      <div className="app-footer">
        <button 
          className={`nav-button ${activePage === 'square' ? 'active' : ''}`}
          onClick={() => setActivePage('square')}
        >
          广场
        </button>
        <button 
          className={`nav-button ${activePage === 'personal' ? 'active' : ''}`}
          onClick={() => setActivePage('personal')}
        >
          个人中心
        </button>
      </div>
    </div>
  );
};

export default App;