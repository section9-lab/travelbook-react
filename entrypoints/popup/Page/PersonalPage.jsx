import React, { useState } from 'react';
import { useLanguage } from '../Component/LanguageContext';
import AddTravelPlanModal from '../Component/AddTravelPlanModal';
import TravelGuideDisplay from '../Component/TravelGuideDisplay';
import { BiEdit,BiShare } from "react-icons/bi";
import axios from 'axios';
import FingerprintJS from '@fingerprintjs/fingerprintjs';


const PersonalPage = () => {
  const { t } = useLanguage();
  const [plans, setPlans] = useState([
    { 
      id: 1, 
      source: "北京",
      destination: "日本东京", 
      startTime: "2024-07-15T10:00", 
      endTime: "2024-07-22T20:00",
      title: "Beijing to Tokyo Travel Guide",
      about: "Tokyo is a beautiful city in Japan.",
      travels: [
        { day: 1, activities: "Arrive in Tokyo, check-in to hotel" },
        { day: 2, activities: "Visit Tokyo Tower and explore Shinjuku" }
      ]
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);

  const handleAddPlan = async(newPlan) => {

    // 保存到服务器
    try{
        // 等待 FingerprintJS 加载并获取设备指纹
        const fp = await FingerprintJS.load();
        const result = await fp.get();
        const duid = result.visitorId; // 获取设备指纹
        console.info(duid);
        console.info('==save==')
        newPlan.userId = duid
        console.info(newPlan)
        
        const response = axios.post('https://travelbook-kappa.vercel.app/add_travel_plans',newPlan,{
        // const response = axios.post('http://localhost:5000/add_travel_plans',newPlan,{
          headers: {
            'Access-Control-Allow-Origin': 'travelbook',
            'Content-Type': 'application/json',
          }
        });
        console.info(response.result)
      }catch (error) {
        alert('Network Error Save Local');
        console.error('Error generating guide:', error);
      }
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
        initialGuide={editingPlan || {
          title: `${editingPlan.title}`,
          about: `${editingPlan.about}`,
          travels: `${editingPlan.travels}`
        }}
        onSave={(updatedGuide) => {
          // // 保存到服务器
          // try{
          //   console.info('==save==')
          //   console.info(updatedGuide)
          //   const response = axios.post('http://localhost:5000/add_travel_plans',updatedGuide,{
          //     headers: {
          //       'Access-Control-Allow-Origin': 'travelbook',
          //       'Content-Type': 'application/json',
          //     }
          //   });
          //   console.info(response)
          // }catch (error) {
          //   alert('Network Error Save Local');
          //   console.error('Error generating guide:', error);
          // }
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
                <h4>{plan.title}</h4>
                <button 
                  className="edit-plan-button" 
                  onClick={() => startEditPlan(plan)}>
                  <BiEdit />
                </button>
              </div>
              <span>{plan.about}</span>
              <p style={{ display: 'flex', maxHeight:'50px',fontSize: 'x-small'}}>
                {new Date(plan.startTime).toLocaleString()} 
                {' -- '} 
                {new Date(plan.endTime).toLocaleString()}
                <button style={{ marginLeft: '25%', fontSize: 'x-large',
                  backgroundColor: '#fff',border: 'none'}}>
                  <BiShare/>
                </button>
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