import React, { useState } from "react";
import { BsFillHeartFill } from "react-icons/bs";
import { update_hot } from "../Conf/api";

const HeartButton = ({ initialCount, travel_id }) => {
  const [hot, setHot] = useState(initialCount); // 初始热度值
  const [isClicked, setIsClicked] = useState(false); // 用于处理心形动画

  // 处理点击事件
  const handleClick = async () => {
    setIsClicked(true); // 设置动画效果

    console.info("handleClick:"+travel_id)

    update_hot(travel_id)
      .then((response) => {
        // 更新本地热度值
        setHot(hot + 1);
        setIsClicked(true);
      })
      .catch((error) => {
        console.error("更新失败:", error);
        setIsClicked(false);
      });
  };

  return (
    <p onClick={handleClick}>
      <BsFillHeartFill
        style={{
          marginLeft: "10px",
          color: isClicked ? "red" : "black", // 点击时显示红色
          transform: isClicked ? "scale(1.3)" : "scale(1)", // 动画放大
          transition: "transform 0.5s ease", // 平滑的动画过渡
        }}
      />{" "}
      {hot}
    </p>
  );
};

export default HeartButton;
