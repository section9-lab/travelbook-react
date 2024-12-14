import React, { useState,useEffect } from 'react';
import { useLanguage } from '../Component/LanguageContext';
import AddTravelPlanModal from '../Component/AddTravelPlanModal';
import TravelGuideDisplay from '../Component/TravelGuideDisplay';
import { BiEdit,BiShare } from "react-icons/bi";
import axios from 'axios';
import FingerprintJS from '@fingerprintjs/fingerprintjs';


const PersonalPage = () => {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [plans, setPlans] = useState([]);

  const handleAddPlan = async(newPlan) => {
    // 保存到服务器
    try{
        // 等待 FingerprintJS 加载并获取设备指纹
        const fp = await FingerprintJS.load();
        const result = await fp.get();
        const duid = result.visitorId; // 获取设备指纹
        console.info('==add_travel_plans==')
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
      // setPlans(prevPlans => [...prevPlans, { ...newPlan, id: prevPlans.length + 1 }]);

    setPlans([...plans, { ...newPlan, id: plans.length + 1 }]);
  };



  useEffect(() => {
    if (plans.length > 0) {
      console.info("Plans already exist, skipping fetch.");
      return; // 如果有数据，不发起请求
    }
    const fetchPlans = async () => {
      try {
        const fp = await FingerprintJS.load();
        const result = await fp.get();
        const duid = result.visitorId; // 获取设备指纹
        console.info('==travel_plans_list==')
        console.info(duid);
        const response = await axios.get("https://travelbook-kappa.vercel.app/travel_plans_list",{
        // const response = await axios.get("http://localhost:5000/travel_plans_list",{
          params: { user_id: duid },
        });
        // 获取状态码
        const statusCode = response.status;

        // 判断状态码
        if (statusCode >= 200 && statusCode < 300) {
          console.log('成功响应 (2xx):', response.data);
        } 
        if (response.data && Array.isArray(response.data.data)) {
          console.info(response.data.data)
          setPlans(response.data.data);
        } else {
          console.error("Fetched plans is not an array:", response.data);
        }
      } catch (error) {
        // 判断是否为响应错误
        if (error.response) {
          const statusCode = error.response.status;

          if (statusCode >= 400 && statusCode < 500) {
            console.log('客户端错误 (4xx):', statusCode);
          } else if (statusCode >= 500) {
            console.log('服务器错误 (5xx):', statusCode);
          } else {
            console.log('其他错误状态:', statusCode);
          }
        } else {
          // 未收到响应或其他错误
          console.error('请求失败，可能是网络错误或其他原因:', error.message);
        }
      }
    };
  
    fetchPlans();
  }, []);

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
      {Array.isArray(plans) && plans.length > 0 ? (
        plans.map(plan => (
          <div key={plan.id} className="travel-plan-card">
            <div className="travel-plan-header">
              <h4>title:{plan.title}</h4>
              <img src={plan.img_url} className="guide-image"
                  style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '10px' }}
                />
              <p style={{ display: 'flex', maxHeight:'50px',fontSize: 'x-small'}}>
                {new Date(plan.startTime).toLocaleString()} 
                {' --> '} 
                {new Date(plan.endTime).toLocaleString()}
              </p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <button style={{ fontSize: 'x-large',backgroundColor: '#fff',border: 'none',padding: '1px 40px'}}>
                <BiShare/>
              </button>
              <button style={{ fontSize: 'x-large',backgroundColor: '#fff',border: 'none',padding: '1px 40px'}}
                className="edit-plan-button" 
                onClick={() => startEditPlan(plan)}>
                <BiEdit />
              </button>
            </div>
          </div>
         </div>
        ))) : (
          <p>No travel plans available.</p>
        )}
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