import React, { useEffect, useState } from "react";
import TravelGuideCard from "../Component/home/TravelGuideCard";
import SearchBar from "../Component/home/SearchBar";
import { get_home, home_search } from "../Conf/api";

// 广场页面组件
const Home = () => {
  const [plans, setPlans] = useState([]);
  const hasFetched = useRef(false); // 防止重复请求

  useEffect(() => {
    console.info("Home useEffect");
    if (hasFetched.current){
      console.info(hasFetched)
      return; // 已经获取过数据，直接跳过
    } else{
      hasFetched.current = true;
    }
    console.info("Fetching get_home...");

    get_home()
      .then((response) => {
        const data_list = response.data.data
        console.info(data_list)
        if (response.data && Array.isArray(data_list)) {
          setPlans(data_list);
        } else {
          console.error("Fetched plans is not an array:", response.data);
        }
      })
      .catch((error) => {
        console.error("Net Error", error);
      });

  }, []);

  const handleSearch = (term) => {
    home_search(term)
    .then((response) => {
      const data_list = response.data.data;
      console.info("home_search data:" + data_list);
      if (response.data && Array.isArray(data_list)) {
        setPlans(data_list);
      } else {
        console.error("Fetched plans is not an array:", response.data);
      }
    })
    .catch((error) => {
      console.error("Net Error", error);
    });
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
          <TravelGuideCard key={guide.id} {...guide}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
