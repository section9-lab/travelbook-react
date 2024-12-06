import SquarePage from './Page/SquarePage';
import PersonalPage from './Page/PersonalPage';
import { LanguageProvider, useLanguage } from './Component/LanguageContext';
import Logo from '../../assets/logo.svg';
import { BiSolidHomeAlt2, BiSolidUser } from "react-icons/bi";
import './App.css';

// Logo Component
const AppLogo = () => {
  const { language } = useLanguage(); // 获取当前语言状态

  return (
    <div className="app-logo">
      <img src={Logo} height="25" width="25" alt="Logo" />
        <span>
          {language === 'zh' ? ' 路书' : ' TravelBook'}
        </span>
    </div>
  );
};

// Language Toggle Component
const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button className="language-toggle" onClick={toggleLanguage}>
      {language === 'zh' ? 'EN' : '中'}
    </button>
  );
};

// Main App Component
const App = () => {
  const [activePage, setActivePage] = useState('square');
  const { t } = useLanguage();

  return (
    <div className="app-container">
      <div className="app-header">
        <AppLogo />
        <LanguageToggle />
      </div>

      <div className="app-content">
        {activePage === 'square' ? <SquarePage /> : <PersonalPage />}
      </div>

      <div className="app-footer">
        <button 
          className={`nav-button ${activePage === 'square' ? 'active' : ''}`}
          onClick={() => setActivePage('square')}
        >
          <BiSolidHomeAlt2/>
        </button>
        <button 
          className={`nav-button ${activePage === 'personal' ? 'active' : ''}`}
          onClick={() => setActivePage('personal')}
        >
          <BiSolidUser/>
        </button>
      </div>
    </div>
  );
};

// Wrap App with LanguageProvider
const AppWrapper = () => {
  return (
    <LanguageProvider>
      <App />
    </LanguageProvider>
  );
};

export default AppWrapper;