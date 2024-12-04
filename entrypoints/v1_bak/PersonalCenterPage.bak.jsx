import React, { useState } from 'react';

// Add Travel Plan Modal
const AddTravelPlanModal = ({ isOpen, onClose, onSubmit }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');

  const handleSubmit = () => {
    onSubmit({ startDate, endDate, departure, destination });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>添加新的旅行计划</h2>
        <input 
          type="date" 
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input 
          type="date" 
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <input 
          type="text" 
          placeholder="出发地"
          value={departure}
          onChange={(e) => setDeparture(e.target.value)}
        />
        <input 
          type="text" 
          placeholder="目的地"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        <div className="modal-actions">
          <button onClick={handleSubmit}>确认</button>
          <button onClick={onClose}>取消</button>
        </div>
      </div>
    </div>
  );
};

// Personal Center Page Component
const PersonalCenterPage = () => {
  const [plans, setPlans] = useState([
    { id: 1, destination: "日本东京", startDate: "2024-07-15", endDate: "2024-07-22" }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddPlan = (newPlan) => {
    setPlans([...plans, { ...newPlan, id: plans.length + 1 }]);
  };

  return (
    <div className="personal-center">
      <h2>我的旅行计划</h2>
      <div className="travel-plans">
        {plans.map(plan => (
          <div key={plan.id} className="travel-plan-card">
            <h3>{plan.destination}</h3>
            <p>{plan.startDate} 至 {plan.endDate}</p>
          </div>
        ))}
      </div>
      <button 
        className="add-plan-button" 
        onClick={() => setIsModalOpen(true)}
      >
        +
      </button>
      <AddTravelPlanModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddPlan}
      />
    </div>
  );
};

export default PersonalCenterPage;