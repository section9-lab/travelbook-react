import React, { useEffect, useState } from "react";
import { useLanguage } from "../Component/LanguageContext";
import HeartButton from "../Component/HeartButton";
import { get_home } from "../Conf/api";


// 搜索组件保持不变
const SearchBar = ({ onSearch }) => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");

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

const hot = 12;

// 旅行指南卡片组件
const TravelGuideCard = ({ id, title, destination, hot, img_url }) => (
  <div className="travel-guide-card">
    <img
      src={img_url}
      alt={destination}
      className="guide-image"
      style={{
        width: "100%",
        height: "200px",
        objectFit: "cover",
        borderRadius: "10px",
      }}
    />
    <h4>{title}</h4>
    <p>目的地：{destination}</p>
    <HeartButton initialCount={hot} travel_id={id} />
  </div>
);

// 广场页面组件
const Home = () => {
  const [plans, setPlans] = useState([]);
  useEffect(() => {
    console.info("Home useEffect");
    if (plans && plans.length > 0) {
      console.info("Plans already exist, skipping fetch.");
      return; // 如果有数据，不发起请求
    }
    get_home()
      .then((response) => {
        if (response.data && Array.isArray(response.data.data)) {
          console.info(response.data.data);
          setPlans(response.data.data);
        } else {
          console.error("Fetched plans is not an array:", response.data);
        }
      })
      .catch((error) => {
        console.error("Net Error", error);
      });
  }, []);

  const handleSearch = (term) => {
    // 搜索逻辑：模糊匹配目的地或标题
    const filteredGuides = guides.filter(
      (guide) => guide.destination.includes(term) || guide.title.includes(term)
    );

    // 如果搜索结果为空，可以显示提示
    if (filteredGuides.length === 0) {
      alert("没有找到matching的旅行指南");
    }
  };

  return (
    <div className="square-page">
      <SearchBar onSearch={handleSearch} />
      <div
        className="square-travel-guides"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "15px",
        }}
      >
        {plans.map((guide) => (
          <TravelGuideCard key={guide.id} {...guide} />
        ))}
      </div>
    </div>
  );
};

export default Home;
