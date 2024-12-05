import React, { useState } from 'react';

function SelectorAI() {
  // 定义状态来存储选中的值
  const [selectedValue, setSelectedValue] = useState('');

  // 定义选项数组
  const options = [
    { value: 'option1', label: 'OpenAI' },
    { value: 'option2', label: 'Kimi' },
    { value: 'option3', label: 'Hunyuan' },
    { value: 'option3', label: 'Llma3.1' },
    // 可以继续添加更多选项
  ];

  // 处理选择变化的函数
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div>
      <select
        id="dropdownSelector"
        value={selectedValue}
        onChange={handleChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectorAI;