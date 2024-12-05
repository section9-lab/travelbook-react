import React, { useState } from 'react';
import { useLanguage } from '../Component/LanguageContext';
import AddTravelPlanModal from '../Component/AddTravelPlanModal';
import TravelGuideDisplay from '../Component/TravelGuideDisplay';

const PersonalPage = () => {
  const { t } = useLanguage();
  const [plans, setPlans] = useState([
    { 
      id: 1, 
      source: "北京",
      destination: "日本东京", 
      startTime: "2024-07-15T10:00", 
      endTime: "2024-07-22T20:00",
      guide: {
        title: "Beijing to Tokyo Travel Guide",
        attractions: "Explore the rich cultural heritage of both cities.",
        itinerary: [
          { day: 1, activities: "Arrive in Tokyo, check-in to hotel" },
          { day: 2, activities: "Visit Tokyo Tower and explore Shinjuku" }
        ]
      }
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);

  const handleAddPlan = (newPlan) => {
    setPlans([...plans, { ...newPlan, id: plans.length + 1 }]);
  };

  const handleEditPlan = (updatedPlan) => {
    setPlans(plans.map(plan => 
      plan.id === editingPlan.id 
        ? { ...plan, ...updatedPlan } 
        : plan
    ));
    setEditingPlan(null);
  };

  const startEditPlan = (plan) => {
    setEditingPlan(plan);
  };


  if (editingPlan) {
    return (
      <TravelGuideDisplay 
        initialGuide={editingPlan.guide || {
          title: `${editingPlan.source} to ${editingPlan.destination} Travel Guide`,
          attractions: '',
          itinerary: []
        }}
        onSave={(updatedGuide) => {
          handleEditPlan({ guide: updatedGuide });
        }}
        onCancel={() => setEditingPlan(null)}
      />
    );
  }

  return (
    <div className="personal-center">
      <h2>{t('personalCenter')}</h2>
      <div className="travel-plans">
        {plans.map(plan => (
          <div key={plan.id} className="travel-plan-card">
            <div className="travel-plan-header">
              
              <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3>{plan.source} {'='} {plan.destination}</h3>
                <button 
                  className="edit-plan-button" 
                  onClick={() => startEditPlan(plan)}>
                  ✏️
                </button>
              </div>

                <p>
                  {new Date(plan.startTime).toLocaleString()} 
                  {' - '} 
                  {new Date(plan.endTime).toLocaleString()}
                </p>
              </div>

          </div>
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

export default PersonalPage;