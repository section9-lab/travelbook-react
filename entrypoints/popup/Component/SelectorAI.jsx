import React, { useState } from 'react';

function SelectorAI(selectChange) {

  // 定义选项数组
  const options = [
    { value: 'gemini', label: 'Gemini' },
    { value: 'llama', label: 'Llama3' },
    { value: 'openai', label: 'OpenAI' },
    { value: 'hunyuan', label: 'HunYuan' },
    { value: 'kimi', label: 'Kimi' },
    { value: 'qwq', label: 'Qwq' },
    // 可以继续添加更多选项
  ];

  // 处理选择变化的函数
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    onSelect(selectedValue);
  };

  return (
    <div className='ai-select-container'>
      <select
        id="ai-selector"
        onChange={selectChange}>
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