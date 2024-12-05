import React, { createContext, useState, useContext, ReactNode } from 'react';

// Translation Dictionary
const translations = {
  zh: {
    square: '广场',
    personal: '个人',
    addTravelPlan: '添加旅行计划',
    destination: '目的地',
    source: '出发地',
    startDate: '开始日期',
    endDate: '结束日期',
    generateGuide: 'AI生成攻略',
    confirm: '确认',
    cancel: '取消',
    search: '搜索',
    rating: '热度'
  },
  en: {
    square: 'Square',
    personal: 'Personal', 
    addTravelPlan: 'Add New Travel Plan',
    source: 'Source',
    destination: 'Destination',
    startDate: 'Start Date',
    endDate: 'End Date',
    generateGuide: 'AI Generate Guide',
    confirm: 'Confirm',
    cancel: 'Cancel',
    search: 'Search',
    rating: 'Rating'
  }
};

// Language Context
interface LanguageContextType {
  language: 'zh' | 'en';
  t: (key: keyof typeof translations['zh']) => string;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'zh',
  t: () => '',
  toggleLanguage: () => {}
});

// Language Provider Component
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'zh' | 'en'>('zh');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'zh' ? 'en' : 'zh');
  };

  const t = (key: keyof typeof translations['zh']) => {
    return translations[language][key];
  };

  return (
    <LanguageContext.Provider value={{ language, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
// Custom hook for using language context
export const useLanguage = () => useContext(LanguageContext);
