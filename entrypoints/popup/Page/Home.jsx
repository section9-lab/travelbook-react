import React, { useEffect, useState } from "react";
import HomeTravelCardList from "../Component/home/HomeTravelCardList";
import SearchBar from "../Component/home/SearchBar";
import { get_home, home_search } from "../Conf/api";
import { useLanguage } from "../Component/LanguageContext";

/**
 * @returns {JSX.Element}
 */
const Home = () => {
  const { language } = useLanguage(); // 获取当前语言状态
  const [plans, setPlans] = useState([]);
  const hasFetched = useRef(false); // 防止重复请求

  useEffect(() => {
    console.info("Home useEffect get_home...");
    console.info(language);

    get_home(language)
      .then((response) => {
        const data_list = response.data.data;
        console.info("get_home data:", data_list);
        if (response.data && Array.isArray(data_list)) {
          setPlans(data_list);
        } else {
          console.error("Fetched plans is not an array:", response.data);
        }
      })
      .catch((error) => {
        console.error("Net Error", error);
        get_home(language).then((response) => {
          const data_list = response.data.data;
          console.info("get_home data:", data_list);
          if (response.data && Array.isArray(data_list)) {
            setPlans(data_list);
          } else {
            console.error("Fetched plans is not an array:", response.data);
          }
        });
      });
  }, [language]);

  const handleSearch = (term) => {
    console.info("handleSearch:", term);
    home_search(term, language)
      .then((response) => {
        const data_list = response.data.data;
        console.info(data_list);
        if (response.data && Array.isArray(data_list)) {
          setPlans(data_list);
        } else {
          setPlans([])
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
        {plans.length > 0 ? (
          plans.map((guide) => <HomeTravelCardList key={guide.id} {...guide} />)
        ) : (
          <div className="no-results">No about Destination</div>
        )}
      </div>
    </div>
  );
};

export default Home;
