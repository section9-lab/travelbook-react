import React, { useState } from 'react';

function SelectorAI() {
  // 定义状态来存储选中的值
  const [selectedValue, setSelectedValue] = useState('');

  // 定义选项数组
  const options = [
    { value: 'hunyuan', label: 'Hunyuan' },
    { value: 'openai', label: 'OpenAI' },
    { value: 'kimi', label: 'Kimi' },
    { value: 'llama', label: 'Llama3.1' },
    // 可以继续添加更多选项
  ];

  // 处理选择变化的函数
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div className='ai-select-container'>
      <select
        id="ai-selector"
        value={selectedValue}
        onChange={handleChange}>
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