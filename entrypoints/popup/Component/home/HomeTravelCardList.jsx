import HeartButton from "./HeartButton";
import ShowTravelCard from "./ShowTravelCard";
import { useLanguage } from "../LanguageContext";
import {
  EnvironmentOutlined,
} from "@ant-design/icons";



// 旅行指南卡片组件
const HomeTravelCardList = (guide) => {
  const { t } = useLanguage(); // 获取当前语言状态
  const [showTravelCard, setShowTravelCard] = useState(false);

  const showCard = (guide) => {
    console.info("showCard");
    setShowTravelCard(guide);
  };

  return (
    <>
      <div
        className="travel-guide-card"
        style={{
          backgroundColor: "white",
          border: "1px solid #ddd",
          borderRadius: "10px",
          marginBottom: "10px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column", // 设置为列布局
        }}
      >
        <div
          onClick={() => showCard(guide)}
        >
          <img
            src={guide.img_url}
            alt={guide.destination}
            className="guide-image"
            style={{
              width: "100%",
              height: "200px",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
          <span style={{ fontSize: "13px", fontWeight: "bold" }}>
            {guide.title}
          </span>
          <br />
          <br />
          <EnvironmentOutlined style={{fontSize: '15px'}}/>
          <span style={{ fontSize: "12px" }}>
            {" "+guide?.destination}
          </span>
        </div>

        <HeartButton
          guide={guide}
          initialCount={guide.hot}
          travel_id={guide.id}
        />
      </div>
      <ShowTravelCard
        guide={guide}
        isOpen={showTravelCard}
        onClose={() => setShowTravelCard(false)}
      />
    </>
  );
};

export default HomeTravelCardList;
