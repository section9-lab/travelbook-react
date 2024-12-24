import React, { useEffect, useState } from "react";
import { Input, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import { useLanguage } from "../Component/LanguageContext";
import HomeTravelCardList from "../Component/home/HomeTravelCardList";
import { get_home, home_search } from "../Conf/api";

const { Search } = Input;
/**
 * @returns {JSX.Element}
 */
const Home = () => {
  const { language } = useLanguage(); // 获取当前语言状态
  const [searchTerm, setSearchTerm] = useState("");
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.info("Home useEffect get_home...");
    console.info(language);
    setLoading(true);
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
      })
      .finally(() => {
        setLoading(false);
      });
  }, [language]);

  const handleSearch = (searchTerm) => {
    setLoading(true);

    console.info("handleSearch:", searchTerm);
    home_search(searchTerm, language)
      .then((response) => {
        const data_list = response.data.data;
        console.info(data_list);
        if (response.data && Array.isArray(data_list)) {
          setPlans(data_list);
        } else {
          setPlans([]);
          console.error("Fetched plans is not an array:", response.data);
        }
      })
      .catch((error) => {
        console.error("Net Error", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const placeholderText = {
    zh: "搜索旅行目的地",
    en: "Search travel destinations",
  };

  // 组件拆分
  const LoadingView = () => (
    <div
      style={{
        margin: "0 auto",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
    </div>
  );

  const ContentView = ({ plans }) => (
    <>
      {plans.length > 0 ? (
        plans.map((guide) => <HomeTravelCardList key={guide.id} {...guide} />)
      ) : (
        <div
          style={{
            margin: "0 auto",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <span>No have about travel plans data!</span>
        </div>
      )}
    </>
  );

  return (
    <div className="square-page">
      <Search
        allowClear
        enterButton={language === "zh" ? "搜索" : "Search"}
        size="large"
        placeholder={placeholderText[language] || placeholderText.en}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onSearch={handleSearch}
      />
      <br />
      <br />
      <div
        className="square-travel-guides"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "15px",
        }}
      >
        {loading ? <LoadingView /> : <ContentView plans={plans} />}
      </div>
    </div>
  );
};

export default Home;
