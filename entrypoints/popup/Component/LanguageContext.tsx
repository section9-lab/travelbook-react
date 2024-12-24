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
    generateGuide: 'AI 生成攻略',
    confirm: '确认',
    cancel: '取消',
    search: '搜索',
    rating: '热度',
    history: '历史',
    culture: "文化",
    famous_spots: "景点",
    transport: "交通",
    accommodation: "住宿",
    food: "饮食",
    weather: "天气状况"
  },
  en: {
    square: 'Square',
    personal: 'Personal', 
    addTravelPlan: 'Add New Travel Plan',
    source: 'Source',
    destination: 'Destination',
    startDate: 'Start Date',
    endDate: 'End Date',
    generateGuide: 'AI GenPlan',
    confirm: 'Confirm',
    cancel: 'Cancel',
    search: 'Search',
    rating: 'Rating',
    history: "History",
    culture: "Culture",
    famous_spots: "Landmark",
    transport: "Transportation",
    accommodation: "Accommodations",
    food: "Food",
    weather: "Description weather"
  }
};

// Language Context
interface LanguageContextType {
  language: 'zh' | 'en';
  t: (key: keyof typeof translations['zh']) => string;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  t: () => '',
  toggleLanguage: () => {}
});

// Language Provider Component
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'zh' | 'en'>('en');

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
