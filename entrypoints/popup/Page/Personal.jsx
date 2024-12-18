import React, { useState, useEffect } from "react";
import { Spin } from "antd";
import { useLanguage } from "../Component/LanguageContext";
import AddTravelPlanModal from "../Component/AddTravelPlanModal";
import TravelGuideDisplay from "../Component/TravelGuideDisplay";
import CryptoJS from "crypto-js";
import ShowPersonalCard from "../Component/personal/ShowPersonalCard";
import {
  travel_plans_list,
  add_travel_plans,
  public_travel,
  edit_travel_plans,
  delete_travel_plan,
} from "../Conf/api";

const Personal = () => {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [plans, setPlans] = useState([]);
  const [load, setLoad] = useState(false);

  const fetchPlanList = async () => {
    setLoad(true);
    console.info("==travel_plans_list==");
    const userAgent = navigator.userAgent;
    const md5 = CryptoJS.MD5(userAgent).toString();
    await travel_plans_list(md5)
      .then((response) => {
        setLoad(false);
        if (Object.entries(response.data.data).length === 0) {
          console.info("travel_plans_list is null:", response.data.data);
        } else if (response.data && Array.isArray(response.data.data)) {
          console.info("travel_plans_list:", response.data.data);
          setPlans(response.data.data);
        } else {
          console.error("travel_plans_list is bad:", response.data.data);
        }
      })
      .catch((error) => {
        console.error("Net Error", error);
      });
  };

  const addPlan = async (newPlan) => {
    // 保存到服务器
    console.info("==add_travel_plans==");
    console.info(newPlan);
    setPlans((prevPlans) => [...prevPlans, newPlan]); //在当前数组中增加一个
    const userAgent = navigator.userAgent;
    const md5 = CryptoJS.MD5(userAgent).toString();
    newPlan.userId = md5;
    add_travel_plans(newPlan)
      .then((response) => {
        console.info(response.data);
      })
      .catch((error) => {
        console.error("Net Error:", error);
      });
  };

  const handleUpdatePlan = async (newPlan) => {
    // 保存到服务器
    console.info("==update_travel_plans==");
    setPlans((prevPlans) => {
      const planIndex = prevPlans.findIndex((plan) => plan.id === newPlan.id);
      if (planIndex !== -1) {
        // 如果找到相同 id 的计划，进行更新
        const updatedPlans = [...prevPlans];
        updatedPlans[planIndex] = newPlan;
        return updatedPlans;
      } else {
        // 如果没有找到，则新增
        return [...prevPlans, newPlan];
      }
    });

    const userAgent = navigator.userAgent;
    const md5 = CryptoJS.MD5(userAgent).toString();
    newPlan.userId = md5;
    console.info(newPlan);
    edit_travel_plans(newPlan)
      .then((response) => {
        console.info(response.data);
      })
      .catch((error) => {
        console.error("Net Error:", error);
      });
  };

  useEffect(() => {
    console.info("Personal useEffect plans:", plans);
    if (plans && plans.length > 0) {
      console.info("Plans already exist, skipping fetch.");
      return; // 如果有数据，不发起请求
    } else {
      fetchPlanList();
    }
  }, []);

  const startEditPlan = (plan) => {
    console.info("startEditPlan:", plan);
    setEditingPlan(plan);
  };

  if (editingPlan) {
    console.info("editingPlan:", editingPlan);
    return (
      <TravelGuideDisplay
        inGuide={
          editingPlan || {
            title: `${editingPlan.title}`,
            about: `${editingPlan.about}`,
            travels: `${editingPlan.travels}`,
          }
        }
        onSave={(updatedGuide) => {
          console.info(updatedGuide);
          handleUpdatePlan(updatedGuide);
          setEditingPlan(null);
        }}
        onCancel={() => setEditingPlan(null)}
      />
    );
  }

  const handleClick = (planId) => {
    // 显示确认框，提示用户是否发布
    const confirmed = window.confirm("Are you sure publish this plan?");

    // 如果用户点击“确定”，则继续执行请求
    if (confirmed) {
      handleShare(planId); // 调用传入的 handleShare 函数
    }
  };

  const handleShare = (id) => {
    console.info("handleShare travel id:" + id);
    public_travel(id)
      .then((response) => {
        console.info(response.data);
      })
      .catch((error) => {
        console.error("Net Error:", error);
      });
  };

  const handleRemove = (id) => {
    const confirmed = window.confirm("Are you sure remove this plan?");

    // 如果用户点击“确定”，则继续执行请求
    if (confirmed) {
      console.info("handleRemove id:" + id);
      delete_travel_plan(id)
        .then((response) => {
          console.info(response.data);
          setPlans((prevPlans) => prevPlans.filter((plan) => plan.id !== id));
        })
        .catch((error) => {
          console.error("Net Error:", error);
        });
    }
  };

  const toggleModal = (target) => {
    console.info("toggleModal:", target);
    setIsModalOpen(target);
  };

  return (
    <div className="personal-center">
      {Array.isArray(plans) && plans.length > 0 ? (
        plans.map((plan) => (
          <ShowPersonalCard
            travel={plan}
            onShare={handleClick}
            onRemove={handleRemove}
            onEdit={startEditPlan}
          />
        ))
      ) : (
        <Spin style={{ padding: "200px" }} size="large" />
      )}

      <button className="add-plan-button" onClick={() => toggleModal(true)}>
        +
      </button>
      <AddTravelPlanModal
        isOpen={isModalOpen}
        onClose={() => toggleModal(false)}
        onSubmit={addPlan}
      />
    </div>
  );
};

export default Personal;
