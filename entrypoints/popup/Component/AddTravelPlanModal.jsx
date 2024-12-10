import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import DateTimeRangePicker from './DateTimeRangePicker';
import TravelGuideDisplay from './TravelGuideDisplay';
import SelectorAI from './SelectorAI';
import { BiCalendar } from "react-icons/bi";
import axios from 'axios';


const AddTravelPlanModal = ({ isOpen, onClose, onSubmit }) => {
  const { t } = useLanguage();
  
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);


  const handleDateRangeChange = (start, end) => {
    setStartTime(start);
    setEndTime(end);
  };

  const aiGentravelPlan = {
    startTime,
    endTime,
    source,
    destination
};

  const handleSubmit = async () => {
    try {
      // handleChange()
      // const response = await axios.get('https://reqres.in/api/users?page=2');
      console.info(aiGentravelPlan)
      const response = await axios.post('https://travelbook-kappa.vercel.app/gen_travel_plans',aiGentravelPlan,{
      // const response = await axios.post('http://localhost:5000/gen_travel_plans',aiGentravelPlan,{
        headers: {
          'Access-Control-Allow-Origin': 'travelbook',
          'Content-Type': 'application/json',
        },
      });
      const travelData = response.data
      console.info(travelData)
      // 构造假的响应数据
      // const mockGuideData = response.data.data ? {
      //   id: `${crypto.randomUUID()}`,
      //   title: `Travel Guide: ${source} to ${destination}`,
      //   startTime: `${startTime}`,
      //   endTime: `${endTime}`,
      //   about: 'Explore the beautiful landscapes and local culture.',
      //   travels: Array.from({ length: Math.ceil((new Date(endTime) - new Date(startTime)) / (1000 * 60 * 60 * 24)) }, (_, i) => ({
      //     day: Math.floor(i/2),
      //     travels: `Day ${Math.floor(i/2)}} activities based on user ${response.data.data[0].first_name}'s recommendations...`
      //   }))
      // } : null;
      // console.info(mockGuideData)
      // {
      //   "day": 0,
      //   "travels": "Day 0} activities based on user Michael's recommendations..."
      // }
      // setApiResponse(mockGuideData);

      setApiResponse(travelData)
    } catch (error) {
      alert('Network Error');
      console.error('Error generating guide:', error);
      setApiResponse(null);
    }
  };

  const handleGuideSave = (savedGuide) => {
    onSubmit(savedGuide);
    setApiResponse(null);
    onClose();
  };

  const handleGuideCancel = () => {
    setApiResponse(null);
  };

  const options = [
    { value: 'gemini', label: 'Gemini' },
    { value: 'llama', label: 'Llama3' },
    { value: 'openai', label: 'OpenAI' },
    { value: 'hunyuan', label: 'HunYuan' },
    { value: 'kimi', label: 'Kimi' },
    { value: 'qwq', label: 'Qwq' },
    // 可以继续添加更多选项
  ];
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    console.info("select:", selectedValue);

    // 如果 selectedValue 为空，使用默认值
    aiGentravelPlan.model = selectedValue || "gemini";
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{t('addTravelPlan')}</h2>
        <label>{t('travelDateRange')}</label>
        <div className="date-input-container">
          <input 
            type="text" 
            value={startTime && endTime 
              ? `${new Date(startTime).toLocaleString()} - ${new Date(endTime).toLocaleString()}`
              : t('selectDateRange')
            }
            readOnly
            className="date-input"
            style={{ width: '75%', gap: '4px'}} 
          />
          <button className="calendar-button"onClick={() => setIsDatePickerOpen(true)}>
            <BiCalendar/>
          </button>
        </div>
        
        {isDatePickerOpen && (
          <div
            className="calendar-popup"
            style={{
              position: 'absolute',
              top: '10px',
              width: '95%',
              left: '0',
              zIndex: 1000,
              backgroundColor: 'white',
              border: '1px solid #ccc',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}>

            <DateTimeRangePicker
              startDate={startTime}
              endDate={endTime}
              onChange={handleDateRangeChange}
              onClose={() => setIsDatePickerOpen(false)}
            />
          </div>
        )}
        <div className='input-source-location'>
          <input
            type="text" 
            placeholder={t('source')}
            value={source}
            onChange={(e) => setSource(e.target.value)}
            style={{ width: '75%', gap: '4px'}} 
          />
        </div>
        <div className='input-destination-location'>
          <input 
            type="text" 
            placeholder={t('destination')}
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
            style={{ width: '75%', gap: '4px'}} 
          />*
        </div>

        <div className="modal-actions">
          <div className='ai-select-container'>
            <select
              id="ai-selector"
              onChange={handleChange} defaultValue="gemini">
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <button onClick={handleSubmit}>{t('generateGuide')}</button>
          <button onClick={onClose}>{t('cancel')}</button>
        </div>
      </div>
        {/* 在此处根据response结果展开卡片，如果请求结果为空，或没有请求则不展开 */}
        {apiResponse && (
          <div className="guide-response-container">
            <TravelGuideDisplay 
              initialGuide={apiResponse}
              onSave={handleGuideSave}
              onCancel={handleGuideCancel}
            />
          </div>
        )}
    </div>
  );
};

export default AddTravelPlanModal;

