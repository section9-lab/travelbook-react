import React, { useState } from 'react';

// Search Component for Square Page
const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="search-bar">
      <input 
        type="text" 
        placeholder="搜索旅行目的地" 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>搜索</button>
    </div>
  );
};

// Travel Guide Card Component
const TravelGuideCard = ({ title, destination, rating }) => (
  <div className="travel-guide-card">
    <h3>{title}</h3>
    <p>目的地：{destination}</p>
    <p>热度：{rating}/5</p>
  </div>
);

// Square Page Component
const SquarePage = () => {
  const [guides, setGuides] = useState([
    { id: 1, title: "日本关西自由行", destination: "大阪", rating: 4.5 },
    { id: 2, title: "欧洲浪漫之旅", destination: "巴黎", rating: 4.8 },
    { id: 3, title: "美国西海岸", destination: "旧金山", rating: 4.3 }
  ]);

  const handleSearch = (term) => {
    // 实际应用中会调用后端API
    console.log(`搜索：${term}`);
  };

  return (
    <div className="square-page">
      <SearchBar onSearch={handleSearch} />
      <div className="travel-guides">
        {guides.map(guide => (
          <TravelGuideCard 
            key={guide.id} 
            title={guide.title} 
            destination={guide.destination} 
            rating={guide.rating} 
          />
        ))}
      </div>
    </div>
  );
};

export default SquarePage;