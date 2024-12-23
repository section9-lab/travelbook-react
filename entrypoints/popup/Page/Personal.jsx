import React, { useState, useEffect } from "react";
import { Spin, Avatar, Card, message } from "antd";
import { BsFillPersonFill } from "react-icons/bs";
import CryptoJS from "crypto-js";

import { useLanguage } from "../Component/LanguageContext";
import AddTravelPlanModal from "../Component/personal/AddTravelPlanModal";
import TravelGuideDisplay from "../Component/personal/TravelGuideDisplay";
import ShowPersonalCard from "../Component/personal/ShowPersonalCard";
import Login from "../Component/personal/auth/Login.jsx";

import {
  travel_plans_list,
  add_travel_plans,
  public_travel,
  edit_travel_plans,
  delete_travel_plan,
  googleAuthLogout,
} from "../Conf/api";

const { Meta } = Card;

const Personal = () => {
  const { t, language } = useLanguage();
  const [isAuthed, setIsAuthed] = useState(() => {
    return localStorage.getItem("isAuthed") === "true";
  });

  const setAuthed = (value) => {
    setIsAuthed(value);
    localStorage.setItem("isAuthed", value);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [plans, setPlans] = useState([]);
  const [load, setLoad] = useState(false);
  //const [userInfo, setUserInfo] = useState(userInfo);
  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;
  const setUserInfo = (newUserInfo) => {
    localStorage.setItem("userInfo", JSON.stringify(newUserInfo));
    console.info(localStorage.getItem("userInfo"));
  };

  useEffect(() => {
    console.info("Personal useEffect plans:", plans);
    console.info("isAuthed", isAuthed);
    console.info("userInfo:", userInfo);

    if (plans && plans.length > 0) {
      console.info("Plans already exist, skipping fetch.");
      return; // 如果有数据，不发起请求
    } else {
      getPersonalPlanList();
    }
  }, []);

  const getPersonalPlanList = async () => {
    setLoad(true);
    console.info("==travel_plans_list==");
    const userID = getUserId();
    console.info(userID);
    await travel_plans_list(userID)
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
        travel_plans_list(userID).then((response) => {
          setLoad(false);
          if (Object.entries(response.data.data).length === 0) {
            console.info("travel_plans_list is null:", response.data.data);
          } else if (response.data && Array.isArray(response.data.data)) {
            console.info("travel_plans_list:", response.data.data);
            setPlans(response.data.data);
          } else {
            console.error("travel_plans_list is bad:", response.data.data);
          }
        });
      });
  };

  const getUserId = () => {
    let user_id = "";
    if (userInfo !== null) {
      console.info(userInfo);
      user_id = userInfo.user_id;
    } else {
      const userAgent = navigator.userAgent;
      const md5 = CryptoJS.MD5(userAgent).toString();
      user_id = md5;
    }
    return user_id;
  };

  const addPlan = async (newPlan) => {
    // 保存到服务器
    console.info("==add_travel_plans==");
    newPlan.userId = getUserId();
    console.info(newPlan);
    add_travel_plans(newPlan, language)
      .then((response) => {
        newPlan.id = response.data;
        console.info(newPlan);
        setPlans((prevPlans) => [...prevPlans, newPlan]); //在当前数组中增加一个
      })
      .catch((error) => {
        console.error("Net Error:", error);
      });
  };

  const handleEditTravel = async (newPlan) => {
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
    newPlan.userId = getUserId();
    console.info(newPlan);
    edit_travel_plans(newPlan, plans.id)
      .then((response) => {
        console.info(response.data);
      })
      .catch((error) => {
        console.error("Net Error:", error);
      });
  };

  const startEditPlan = (plan) => {
    console.info("startEditPlan:", plan);
    setEditingPlan(plan);
  };

  const clickShare = (planId) => {
    console.info("clickShare planId", planId);
    // 显示确认框，提示用户是否发布
    const confirmed = window.confirm("Are you sure publish this plan?");

    // 如果用户点击“确定”，则继续执行请求
    if (confirmed) {
      handleShareTravel(planId); // 调用传入的 handleShare 函数
    }
  };

  const handleShareTravel = (id) => {
    console.info("handleShare travel id:", id);
    console.info("plans:", plans);

    public_travel(id, language)
      .then((response) => {
        message.success("Share Success");
        console.info(response.data);
      })
      .catch((error) => {
        message.error("Share Failure");
        console.error("Net Error:", error);
      });
  };

  const handleRemoveTravel = (id) => {
    const confirmed = window.confirm("Are you sure remove this plan?");

    // 如果用户点击“确定”，则继续执行请求
    if (confirmed) {
      console.info("handleRemove id:" + id);
      delete_travel_plan(id)
        .then((response) => {
          message.success("Remove Success");
          console.info(response.data);
          setPlans((prevPlans) => prevPlans.filter((plan) => plan.id !== id));
        })
        .catch((error) => {
          message.error("Remove Failure");
          console.error("Net Error:", error);
        });
    }
  };

  const toggleModal = (target) => {
    console.info("toggleModal:", target);
    setIsModalOpen(target);
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
          handleEditTravel(updatedGuide);
          setEditingPlan(null);
        }}
        onCancel={() => setEditingPlan(null)}
      />
    );
  }

  // 处理登出
  const handleLogout = async () => {
    const userId = getUserId();
    googleAuthLogout(userId)
      .then((response) => {
        setAuthed(false);
        setUserInfo(null);
      })
      .catch((error) => {
        console.error("登出出错:", error);
      });
  };

  if (!isAuthed) {
    return (
      <Login
        setAuthed={setAuthed}
        getUserId={getUserId}
        setUserInfo={setUserInfo}
      />
      // <LoginPage/>
    );
  }

  return (
    <div className="personal-center">
      {
        <Card
          style={{
            width: "100%",
            height: "18%",
            display: "flex", // 使用 Flexbox 布局
            flexDirection: "row", // 设置主轴为行
            alignItems: "center", // 垂直居中对齐
            justifyContent: "space-between", // 两边对齐
            background: "#58a", // 背景色
          }}
        >
          <Meta
            avatar={
              <Avatar src={userInfo?.picture} icon={<BsFillPersonFill />} />
            }
            title={userInfo?.username}
            description={userInfo?.email}
            style={{ marginBottom: "2px" }}
          />
          <button onClick={handleLogout}>LOG OUT</button>
        </Card>
      }
      {Array.isArray(plans) && plans.length > 0 ? (
        plans.map((plan) => (
          <ShowPersonalCard
            key={plan.id}
            travel={plan}
            onShare={() => clickShare(plan.id)}
            onRemove={handleRemoveTravel}
            onEdit={startEditPlan}
          />
        ))
      ) : plans.length === 0 ? (
        <p
          style={{
            textAlign: "center",
            padding: "50px",
            fontSize: "16px",
            color: "#888",
          }}
        >
          <span>No travel plan.</span>
          <br />
          <br />
          <span>Please click the Add button to generate your travel plan.</span>
        </p>
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
