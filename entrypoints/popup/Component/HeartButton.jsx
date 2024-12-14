import React, { useState } from 'react';
import { BsFillHeartFill } from 'react-icons/bs';
import axios from 'axios';

const HeartButton = ({ initialCount }) => {
  const [hot, setHot] = useState(initialCount); // 初始热度值
  const [isClicked, setIsClicked] = useState(false); // 用于处理心形动画

  // 处理点击事件
  const handleClick = async () => {
    setIsClicked(true); // 设置动画效果

    try {
      // 发送请求更新后端数据库
      await axios.post('你的后端API地址', { newCount: hot + 1 });

      // 更新本地热度值
      setHot(hot + 1);

      // 延迟一下后移除动画效果
      setTimeout(() => setIsClicked(false), 3000);
    } catch (error) {
      console.error('更新失败:', error);
      setIsClicked(false);
    }
  };

  return (
    <p onClick={handleClick}>
      <BsFillHeartFill
        style={{
          marginLeft: '10px',
          color: isClicked ? 'red' : 'black', // 点击时显示红色
          transform: isClicked ? 'scale(1.3)' : 'scale(1)', // 动画放大
          transition: 'transform 0.5s ease', // 平滑的动画过渡
        }}
      />
      {hot}12
    </p>
  );
};

export default HeartButton;
