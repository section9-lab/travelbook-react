import React, { useState, useEffect } from "react";
import { useLanguage } from "../Component/LanguageContext";
import AddTravelPlanModal from "../Component/AddTravelPlanModal";
import TravelGuideDisplay from "../Component/TravelGuideDisplay";
import { BiEdit, BiShare } from "react-icons/bi";
import { travel_plans_list, add_travel_plans, public_travel } from "../Conf/api";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

const PersonalPage = () => {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [plans, setPlans] = useState([]);

  const handleAddPlan = async (newPlan) => {
    // 保存到服务器
    // 等待 FingerprintJS 加载并获取设备指纹
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    const duid = result.visitorId; // 获取设备指纹
    console.info("==add_travel_plans==");
    newPlan.userId = duid;
    console.info(newPlan);
    add_travel_plans(newPlan)
      .then((response) => {
        console.info(response.data);
      })
      .catch((error) => {
        console.error("Net Error:", error);
      });

    setPlans([...plans, { ...newPlan, id: plans.length + 1 }]);
  };

  useEffect(() => {
    console.info("useEffect");
    console.info(plans)
    if (plans && plans.length > 0) {
      console.info("Plans already exist, skipping fetch.");
      return; // 如果有数据，不发起请求
    }
    const fetchPlans = async () => {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      const duid = result.visitorId; // 获取设备指纹
      console.info("==travel_plans_list==");
      console.info(duid);
      travel_plans_list(duid)
        .then((response) => {
          if (response.data && Array.isArray(response.data.data)) {
            console.info(response.data.data);
            setPlans(response.data.data);
          } else {
            console.error("Fetched plans is not an array:", response.data);
          }
        })
        .catch((error) => {
          console.error("Net Error", error);
        });
    };

    fetchPlans();
  }, []);

  const handleEditPlan = (updatedPlan) => {
    setPlans(
      plans.map((plan) =>
        plan.id === editingPlan.id ? { ...plan, ...updatedPlan } : plan
      )
    );
    setEditingPlan(null);
  };

  const startEditPlan = (plan) => {
    setEditingPlan(plan);
  };


  if (editingPlan) {
    return (
      <TravelGuideDisplay
        initialGuide={
          editingPlan || {
            title: `${editingPlan.title}`,
            about: `${editingPlan.about}`,
            travels: `${editingPlan.travels}`,
          }
        }
        onSave={(updatedGuide) => {
          handleEditPlan({ guide: updatedGuide });
        }}
        onCancel={() => setEditingPlan(null)}
      />
    );
  }


  
    const handleClick = (planId) => {
      // 显示确认框，提示用户是否发布
      const confirmed = window.confirm("Are you sure you want to publish this plan?");
      
      // 如果用户点击“确定”，则继续执行请求
      if (confirmed) {
        handleShare(planId);  // 调用传入的 handleShare 函数
      }
    };


  const handleShare = (id) =>{
    console.info("handleShare travel id:"+id)
    public_travel(id).then((response) => {
      console.info(response.data);
    })
    .catch((error) => {
      console.error("Net Error:", error);
    });
  }

  return (
    <div className="personal-center">
      <h2>{t("personalCenter")}</h2>
      <div className="travel-plans">
        {Array.isArray(plans) && plans.length > 0 ? (
          plans.map((plan) => (
            <div key={plan.id} className="travel-plan-card">
              <div className="travel-plan-header">
                <h4>title:{plan.title}</h4>
                <img
                  src={plan.img_url}
                  className="guide-image"
                  style={{
                    width: "85%",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "15px",
                  }}
                />
                <p
                  style={{
                    display: "flex",
                    maxHeight: "50px",
                    fontSize: "x-small",
                  }}
                >
                  {new Date(plan.startTime).toLocaleString()}
                  {" --> "}
                  {new Date(plan.endTime).toLocaleString()}
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <button
                    style={{
                      fontSize: "x-large",
                      backgroundColor: "#fff",
                      border: "none",
                      padding: "1px 40px",
                    }}
                    onClick={() => handleClick(plan.id)} 
                  >
                    <BiShare />
                  </button>
                  <button
                    style={{
                      fontSize: "x-large",
                      backgroundColor: "#fff",
                      border: "none",
                      padding: "1px 40px",
                    }}
                    className="edit-plan-button"
                    onClick={() => startEditPlan(plan)}
                  >
                    <BiEdit />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No travel plans available.</p>
        )}
      </div>

      <button className="add-plan-button" onClick={() => setIsModalOpen(true)}>
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
