import React, { useState } from "react";
import { Tabs, Input } from "antd";
import "./TravelGuideEdit.css";
import { 
  EnvironmentOutlined,
  AlertOutlined,
  CarOutlined,
  CameraOutlined,
  CoffeeOutlined,
  HomeOutlined,
  CloudOutlined,
} from "@ant-design/icons";

const { TextArea } = Input;

const TravelGuideEdit = ({ inGuide, onSave, onCancel }) => {
  const [guide, setGuide] = useState(inGuide);

  console.info("=====TravelGuideEdit=======");

  console.info(guide?.about);
  if (inGuide === null) {
    console.info(inGuide);
    return;
  }

  useEffect(() => {
    console.info("Updated guide:", guide.about);
  }, [guide]);

  let aboutList = [
    {
      key: "summary",
      label: <AlertOutlined style={{ fontSize: '22px' }}/>,
      content: guide?.about?.summary || "No information available",
    },
    {
      key: "hot_spots",
      label: <CameraOutlined style={{ fontSize: '22px' }}/>,
      content: guide?.about?.hot_spots || "No information available", // 如果不是数组，使用默认值
    },
    {
      key: "weather",
      label: <CloudOutlined style={{ fontSize: '22px' }}/>,
      content: guide?.about?.weather || "No information available",
    },
    {
      key: "transport",
      label: <CarOutlined style={{ fontSize: '22px' }}/>,
      content: guide?.about?.transport || "No information available",
    },
    {
      key: "food",
      label: <CoffeeOutlined style={{ fontSize: '22px' }}/>,
      content: guide?.about?.food || "No information available",
    },
    {
      key: "stay",
      label: <HomeOutlined style={{ fontSize: '22px' }}/>,
      content: guide?.about?.stay || "No information available",
    },
  ];

  const items = aboutList.map((tab, index) => {
    console.info("item", tab);

    if (Array.isArray(tab.content)) {
      console.info(tab);
      //return null; // 处理数组时返回什么需要明确
      return {
        label: tab.label,
        // label: <CarOutlined />,
        key: tab.key,
        children: (
          <div>
            {tab.content.map((item, idx) => (
              <div key={idx} style={{ marginBottom: "10px" }}>
                <Input
                  prefix={<EnvironmentOutlined />}
                  value={item} // 设置初始值
                  onChange={(e) =>
                    handleInputChange(index, idx, e.target.value)
                  } // 处理输入变化
                  placeholder={`Edit ${item} here...`}
                />
              </div>
            ))}
          </div>
        ),
      };
    } else {
      return {
        label: tab.label,
        key: tab.key,
        children: (
          <div>
            <TextArea
              value={tab.content}
              onChange={(e) => handleAttractionsChange(index, e)}
              placeholder={`Edit ${tab.label} here...`}
              autoSize={{
                minRows: 4,
                maxRows: 14,
              }}
            />
          </div>
        ),
      };
    }
  });

  const handleAttractionsChange = (index, event) => {
    const updatedTableList = [...aboutList];
    updatedTableList[index].content = event.target.value;

    console.info("updatedTableList:", updatedTableList);
    aboutList = updatedTableList;

    // 转换为目标结构
    const transformedAbout = updatedTableList.reduce((acc, item) => {
      acc[item.key] = item.content;
      return acc;
    }, {});

    setGuide((prev) => ({
      ...prev,
      about: transformedAbout,
    }));
  };

  const handleTitleChange = (e) => {
    setGuide((prev) => ({
      ...prev,
      title: e.target.value,
    }));
  };
  const handleInputChange = (tabIndex, inputIndex, newValue) => {
    setGuide((prev) => {
      // 更新 about 的指定数组内容
      const updatedAbout = { ...prev.about };

      if (Array.isArray(updatedAbout[aboutList[tabIndex].key])) {
        updatedAbout[aboutList[tabIndex].key] = updatedAbout[
          aboutList[tabIndex].key
        ].map((item, idx) => (idx === inputIndex ? newValue : item));
      }

      return {
        ...prev,
        about: updatedAbout,
      };
    });
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
      const updatedTravels = prev.travels.filter(
        (_, index) => index !== dayIndex
      );
      console.info("Updated Travels:", updatedTravels);
      return {
        ...prev,
        travels: updatedTravels,
      };
    });
  };

  const onChange = (key) => {
    // handleAttractionsChange()
    console.log("touch:" + key);
  };

  const onEdit = (targetKey, action) => {
    if (action === "add") {
      addDay();
    }
    if (action === "remove") {
      console.info("remove:" + (targetKey - 1));
      console.info(guide);
      removeDay(targetKey - 1);
      console.info(guide);
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <img
        src={guide.img_url}
        style={{
          width: "95%",
          height: "100px",
          objectFit: "cover",
          borderRadius: "15px",
        }}
      />
      <Input addonBefore="Title" 
      value={guide.title}
      onChange={handleTitleChange}
      />

      {/* <Input
        showCount
        maxLength={85}
        value={guide.title}
        onChange={handleTitleChange}
      /> */}

      <p>About:</p>
      <Tabs
        tabPosition="left"
        defaultActiveKey="summary" // Default tab
        onChange={onChange}
        style={{
          padding: "0 0 15px 0",
        }}
        items={items}
      />
      <p>Travels:</p>
      <Tabs
        defaultActiveKey="1"
        onChange={onChange}
        type="editable-card"
        size={"small"}
        onEdit={onEdit}
        style={{
          padding: "0 0 20px 0",
        }}
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
                  minRows: 4,
                  maxRows: 8,
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

export default TravelGuideEdit;
