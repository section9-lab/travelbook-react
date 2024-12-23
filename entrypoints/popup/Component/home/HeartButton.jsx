import React, { useState } from "react";
import { BsFillHeartFill } from "react-icons/bs";
import { update_hot } from "../../Conf/api";
import { useLanguage } from "../LanguageContext";
import { Avatar, message } from "antd";
import { BiSolidUser } from "react-icons/bi";

const HeartButton = ({ guide, initialCount, travel_id }) => {
  const [hot, setHot] = useState(initialCount); // 初始热度值
  const [isClicked, setIsClicked] = useState(false); // 用于处理心形动画
  const { language } = useLanguage(); // 获取当前语言状态

  // 处理点击事件
  const handleClick = async () => {
    setIsClicked(true); // 设置动画效果

    console.info("handleClick:" + travel_id);

    update_hot(travel_id, language)
      .then((response) => {
        message.success("Update Success");
        // 更新本地热度值
        setHot(hot + 1);
        setIsClicked(true);
      })
      .catch((error) => {
        message.error("Update Failure");
        console.error("更新失败:", error);
        setIsClicked(false);
      });
  };

  return (
    <div
      style={{
        height: "50px",
        display: "flex",
        alignItems: "center", // 垂直居中
        marginTop: "auto" 
      }}
    >
      <Avatar src={guide?.picture} icon={<BiSolidUser />} 
      style={{ marginLeft: "10px" }} />
      <div
        style={{
          display: "flex",
          alignItems: "center", // 点赞图标和数字垂直居中
          gap: "5px", // 图标和数字之间的间距
          marginLeft: "80px", 
        }}
      >
        <BsFillHeartFill
          onClick={handleClick}
          style={{
            marginLeft: "1px",
            color: isClicked ? "red" : "black", // 点击时显示红色
            transform: isClicked ? "scale(1.3)" : "scale(1)", // 动画放大
            transition: "transform 0.5s ease", // 平滑的动画过渡
          }}
        />
        {hot}
      </div>
    </div>
  );
};

export default HeartButton;
