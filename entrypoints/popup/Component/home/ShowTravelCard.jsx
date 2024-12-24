import { Tabs, Card } from "antd";
import {
  EnvironmentOutlined,
} from "@ant-design/icons";


const { TabPane } = Tabs;

const ShowTravelCard = ({ guide, isOpen, onClose }) => {
  if (!isOpen) return null;

  const onChange = (key) => {
    console.log(key);
  };

  const tableList = [
    {
      key: "summary",
      label: "Summary",
      content: guide?.about?.summary || "No information available",
    },
    {
      key: "hot_spots",
      label: "HotSpots",
      content: guide?.about?.hot_spots?.length > 0 ? (
        <div>
          {guide.about.hot_spots.map((spot, index) => (
            <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "4px" }}>
              <EnvironmentOutlined style={{ marginRight: "8px" }} />
              {spot}
            </div>
          ))}
        </div>
      ) : (
        "No information available"
      ),
    },
    {
      key: "transport",
      label: "Transport",
      content: guide?.about?.transport || "No information available",
    },
    {
      key: "stay",
      label: "Stay",
      content: guide?.about?.stay || "No information available",
    },
    {
      key: "food",
      label: "Food",
      content: guide?.about?.food || "No information available",
    },
    {
      key: "weather",
      label: "Weather",
      content: guide?.about?.weather || "No information available",
    },
  ];
  const items = tableList.map((tab) => ({
    label: tab.label,
    key: tab.key,
    children: tab.content,
  }));

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <img
          src={guide.img_url}
          style={{
            width: "98%",
            height: "10%",
            objectFit: "cover",
            borderRadius: "15px",
            display: "block", // 让图像成为块级元素，才能使用 auto margin
            margin: "0 auto", // 水平居中
          }}
        />
        <h4>{guide.title}</h4>

        <div className="travel-guide-content">
          <div className="attractions-section">
            <span>About:</span>
            <Tabs
              tabPosition="left"
              defaultActiveKey="summary" // Default tab
              style={{
                padding: "0 0 15px 0",
              }}
              items={items}
            />
          </div>
          <span>Travels:</span>
          <Tabs
            defaultActiveKey="1"
            onChange={onChange}
            type="card"
            size={"small"}
            style={{
              padding: "1px 1px 30px 1px",
            }}
            items={guide.travels.map((travel, index) => {
              const id = String(index + 1);
              return {
                label: `Day ${id}`,
                key: id,
                children: `${travel.travel}`,
              };
            })}
          />
        </div>
        <button onClick={onClose} className="cancel-btn">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ShowTravelCard;
