import React, { useState } from "react";
import { Tabs, Input } from "antd";
import "./TravelGuideDisplay.css";

const { TextArea } = Input;

const TravelGuideDisplay = ({ inGuide, onSave, onCancel }) => {
  console.info("=====TravelGuideDisplay=======")
  console.info(inGuide)
  const [guide, setGuide] = useState(inGuide );

  
  useEffect(() => {
    console.info('Updated guide:', guide.travels);
  }, [guide]);

  const handleTitleChange = (e) => {
    setGuide((prev) => ({
      ...prev,
      title: e.target.value,
    }));
  };

  const handleAttractionsChange = (e) => {
    setGuide((prev) => ({
      ...prev,
      about: e.target.value,
    }));
  };

  const handleTravelsChange = (dayIndex, e) => {
    const newTravels = [...guide.travels];

    console.info("==handleTravelsChange==");
    console.info(newTravels);
    newTravels[dayIndex] = {
      ...newTravels[dayIndex],
      travel: e.target.value,
    };

    setGuide((prev) => ({
      ...prev,
      travels: newTravels,
    }));
  };

  const addDay = () => {
    setGuide((prev) => ({
      ...prev,
      travels: [
        ...prev.travels,
        {
          day: prev.travels.length + 1,
          travel: "",
        },
      ],
    }));
  };

  const removeDay = (dayIndex) => {
    setGuide((prev) => {
      const updatedTravels = prev.travels.filter((_, index) => index !== dayIndex);
      console.info('Updated Travels:', updatedTravels);
      return {
        ...prev,
        travels: updatedTravels,
      };
    });
  };

  const onChange = (key) => {
    // handleAttractionsChange()
    console.log("touch:"+key);
  };

  const onEdit = (targetKey, action) => {
    if (action === "add") {
      addDay();
    } 
    if (action === 'remove'){
      console.info("remove:"+(targetKey-1));
      console.info(guide)
      removeDay(targetKey-1);
      console.info(guide)
    }
  };

  return (
    <div>
      <img
        src={guide.img_url}
        style={{
          width: "95%",
          height: "100px",
          objectFit: "cover",
          borderRadius: "15px",
        }}
      />

      <span>Title:</span>
      <Input
        showCount
        maxLength={30}
        value={guide.title}
        onChange={handleTitleChange}
      />

      <p>About:</p>
      <TextArea
        showCount
        maxLength={500}
        value={guide.about}
        onChange={handleAttractionsChange}
        placeholder="Describe interesting about in the area..."
        style={{
          height: "120px",
          resize: "none",
          fontSize: "13px",
        }}
      />
      <p>Travels:</p>
      <Tabs
        defaultActiveKey="1"
        onChange={onChange}
        type="editable-card"
        size={"small"}
        onEdit={onEdit}
        items={guide.travels.map((dayPlan, index) => {
          const id = String(index + 1);
          return {
            label: `Day${id}`,
            key: id,
            children: (
              <TextArea
                value={dayPlan.travel}
                onChange={(e) => handleTravelsChange(index, e)}
                placeholder="Describe activities "
                autoSize={{
                  minRows: 3,
                  maxRows: 5,
                }}
              />
            ),
          };
        })}
      />
      <div className="guide-actions">
        <button onClick={() => onSave(guide)} className="save-btn">
          Save Guide
        </button>
        <button onClick={onCancel} className="cancel-btn">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default TravelGuideDisplay;
