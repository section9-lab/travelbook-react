import React, { useState } from 'react';

// 模拟生成图片URL的函数
const generatePlaceholderImage = (destination) => {
  // 这里可以使用占位图生成逻辑
  const images = [
    `https://picsum.photos/seed/${destination}1/400/300`,
    `https://picsum.photos/seed/${destination}2/400/300`,
    `https://picsum.photos/seed/${destination}3/400/300`,
    `https://picsum.photos/seed/${destination}4/400/300`,
    `https://picsum.photos/seed/${destination}5/400/300`
  ];
  return images[Math.floor(Math.random() * images.length)];
};

// 搜索组件保持不变
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

// 旅行指南卡片组件
const TravelGuideCard = ({ title, destination, rating, image }) => (
  <div className="travel-guide-card">
    <img 
      src={image} 
      alt={destination} 
      className="guide-image"
      style={{
        width: '100%', 
        height: '200px', 
        objectFit: 'cover', 
        borderRadius: '10px'
      }}
    />
    <h3>{title}</h3>
    <p>目的地：{destination}</p>
    <p>热度：{rating}/5</p>
  </div>
);

// 广场页面组件
const SquarePage = () => {
  // 模拟10条旅行指南数据
  const [guides, setGuides] = useState([
    {
      id: 1, 
      title: "日本樱花季浪漫之旅", 
      destination: "京都", 
      rating: 4.8,
      image: generatePlaceholderImage("Kyoto")
    },
    {
      id: 2, 
      title: "欧洲文艺复兴之旅", 
      destination: "佛罗伦萨", 
      rating: 4.7,
      image: generatePlaceholderImage("Florence")
    },
    {
      id: 3, 
      title: "美国国家公园探险", 
      destination: "黄石公园", 
      rating: 4.9,
      image: generatePlaceholderImage("Yellowstone")
    },
    {
      id: 4, 
      title: "北欧极光追寻", 
      destination: "特罗姆瑟", 
      rating: 4.6,
      image: generatePlaceholderImage("Tromso")
    },
    {
      id: 5, 
      title: "马尔代夫蜜月之旅", 
      destination: "马尔代夫", 
      rating: 4.5,
      image: generatePlaceholderImage("Maldives")
    },
    {
      id: 6, 
      title: "澳大利亚大堡礁之旅", 
      destination: "凯恩斯", 
      rating: 4.7,
      image: generatePlaceholderImage("Cairns")
    },
    {
      id: 7, 
      title: "秘鲁因加文明探索", 
      destination: "马丘比丘", 
      rating: 4.8,
      image: generatePlaceholderImage("MachuPicchu")
    },
    {
      id: 8, 
      title: "俄罗斯风情之旅", 
      destination: "圣彼得堡", 
      rating: 4.6,
      image: generatePlaceholderImage("StPetersburg")
    },
    {
      id: 9, 
      title: "摩洛哥撒哈拉沙漠冒险", 
      destination: "撒哈拉沙漠", 
      rating: 4.7,
      image: generatePlaceholderImage("Sahara")
    },
    {
      id: 10, 
      title: "新西兰中土世界之旅", 
      destination: "惠灵顿", 
      rating: 4.9,
      image: generatePlaceholderImage("Wellington")
    }
  ]);

  const handleSearch = (term) => {
    // 搜索逻辑：模糊匹配目的地或标题
    const filteredGuides = guides.filter(guide => 
      guide.destination.includes(term) || guide.title.includes(term)
    );
    
    // 如果搜索结果为空，可以显示提示
    if (filteredGuides.length === 0) {
      alert('没有找到matching的旅行指南');
    }
  };

  return (
    <div className="square-page">
      <SearchBar onSearch={handleSearch} />
      <div className="square-travel-guides" 
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '15px',
      }}>
        {guides.map(guide => (
          <TravelGuideCard 
            key={guide.id} 
            {...guide} 
          />
        ))}
      </div>
    </div>
  );
};

export default SquarePage;