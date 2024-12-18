import { Tabs } from 'antd';

const ShowTravelCard = ({ guide, isOpen, onClose }) => {
  if (!isOpen) return null;

  const onChange = (key) => {
    console.log(key);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <img
          src={guide.img_url}
          style={{
            width: "95%",
            height: "100px",
            objectFit: "cover",
            borderRadius: "15px",
          }}
        />
        <h4>{guide.title}</h4>

        <div className="travel-guide-content">
          <div className="attractions-section">
            <span>About:</span>
            <textarea
              readOnly
              defaultValue={guide.about || "No description available"}
              placeholder="Describe interesting about in the area..."
              style={{
                height: "120px",
                width: "98%", /* 宽度设置为100% */
                minHeight: "45px", /* 最小高度为100px */
                padding: "1px", /* 内边距为10px */
                border: "1px solid #e0e0e0", /* 边框为1px的灰色 */
                borderRadius: "5px", /* 边框圆角为4px */
                resize: "vertical", /* 可垂直调整大小 */
                outline: "none", /* 无轮廓 */
                fontSize: "13px"
            }}
            />
          </div>
          <span>Travels:</span>
          <Tabs defaultActiveKey="1" onChange={onChange} 
            type="card"
            size={"small"}
            items={guide.travels.map((travel, index) => {
            const id = String(index + 1);
            return {
                label: `Day ${id}`,
                key: id,
                children:`${travel.travel}`
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
