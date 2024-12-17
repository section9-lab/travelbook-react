const ShowTravelCard = ({ guide, isOpen, onClose }) => {
  console.info(guide.title);
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="travel-guide-header">
          <input
            type="text"
            readOnly
            defaultValue={guide.title}
            className="travel-guide-title"
          />
        </div>

        <img
          src={guide.img_url}
          style={{
            width: "90%",
            height: "100px",
            objectFit: "cover",
            borderRadius: "15px",
          }}
        />
        <div className="travel-guide-content">
          <div className="attractions-section">
            <h3>About</h3>
            <textarea
              readOnly
              defaultValue={guide.about || "No description available"}
              placeholder="Describe interesting about in the area..."
              style={{
                height: "90px",
                width: "98%", /* 宽度设置为100% */
                minHeight: "45px", /* 最小高度为100px */
                padding: "1px", /* 内边距为10px */
                border: "1px solid #e0e0e0", /* 边框为1px的灰色 */
                borderRadius: "5px", /* 边框圆角为4px */
                resize: "vertical", /* 可垂直调整大小 */
                outline: "none", /* 无轮廓 */
                fontSize: "12px"
            }}
            />
          </div>
          <div className="itinerary-section">
            <h3>Travels</h3>
            {Array.isArray(guide.travels) &&
              guide.travels.map((dayPlan, index) => (
                <div key={index} className="day-plan">
                  <div className="day-header">
                    <h4>Day {dayPlan.day}</h4>
                  </div>
                  <textarea
                    readOnly
                    defaultValue={dayPlan.travel || "No description available"}
                    placeholder={`Describe activities for Day ${dayPlan.day}...`}
                    style={{
                        width: "98%", /* 宽度设置为100% */
                        minHeight: "45px", /* 最小高度为100px */
                        padding: "1px", /* 内边距为10px */
                        border: "1px solid #e0e0e0", /* 边框为1px的灰色 */
                        borderRadius: "5px", /* 边框圆角为4px */
                        resize: "vertical", /* 可垂直调整大小 */
                        outline: "none", /* 无轮廓 */
                        fontSize: "12px"
                    }}
                  />
                </div>
              ))}
          </div>
        </div>

        <button onClick={onClose} className="cancel-btn">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ShowTravelCard;
