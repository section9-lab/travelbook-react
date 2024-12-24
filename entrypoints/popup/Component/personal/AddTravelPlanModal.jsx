import React, { useState } from "react";
import { useLanguage } from "../LanguageContext";
import TravelGuideDisplay from "./TravelGuideDisplay";
import { Button, Input, Select, DatePicker } from "antd";
import { gen_travel_plans } from "../../Conf/api";
import "./AddTravelPlanModal.css";

const { RangePicker } = DatePicker;

const AddTravelPlanModal = ({ isOpen, onClose, onSubmit }) => {
  const { t, language } = useLanguage();
  const [showAdd, setShowAdd] = useState(true); // 显示添加旅行计划框
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [travelPlan, setTravelPlan] = useState(null);
  const [loading, setLoading] = useState(false); // 是否显示进度条

  const aiGentravelPlan = {
    startTime,
    endTime,
    source,
    destination,
  };

  const handleSubmit = () => {
    setLoading(true); // 显示进度条
    console.info("======gen_travel_plans=====");
    gen_travel_plans(aiGentravelPlan, language)
      .then((response) => {
        console.info("gen_travel_plans:", response.data);
        setTravelPlan(response.data);
        setShowAdd(false);
        setLoading(false);
      })
      .catch((error) => {
        alert("Network Error");
        console.error("Error generating guide:", error);
        setTravelPlan(null);
        setShowAdd(false);
        setLoading(false);
      });
  };

  const handleGuideSave = (savedGuide) => {
    onSubmit(savedGuide);
    setTravelPlan(null);
    onClose();
    setShowAdd(true);
  };

  const handleGuideCancel = () => {
    setTravelPlan(null);
    setShowAdd(false);
    setLoading(false);
  };

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    console.info("select:", selectedValue);

    // 如果 selectedValue 为空，使用默认值
    aiGentravelPlan.model = selectedValue || "gemini";
  };
  // 处理时间变化
  const handleRangeChange = (dates, dateStrings) => {
    console.info("dates:", dates);
    console.info("dateStrings:", dateStrings);
    if (!dates) {
      console.log("日期已清空");
      return;
    }
    console.info("start:", dateStrings[0]);
    console.info("end:", dateStrings[1]);
    setStartTime(dateStrings[0]);
    setEndTime(dateStrings[1]);
  };

  if (isOpen === false) {
    console.info("isOpen:", isOpen);
    return null;
  }

  return (
    <>
      {showAdd && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{t("addTravelPlan")}</h2>
            <label>{t("travelDateRange")}</label>
            <div className="date-input-container">
              <RangePicker
                id={{
                  start: "startInput",
                  end: "endInput",
                }}
                onChange={handleRangeChange}
                showTime
              />
              <br />
              <br />
              <Input
                size="large"
                placeholder={t("source")}
                value={source}
                onChange={(e) => setSource(e.target.value)}
              />
              <br />
              <Input
                size="large"
                placeholder={t("destination")}
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
              <br />
              <div className="modal-actions">
                <Select
                  defaultValue="gemini"
                  style={{ width: 120 }}
                  onChange={handleChange}
                  options={[
                    { value: "gemini", label: "Gemini" },
                    { value: "llama", label: "Llama3" },
                    { value: "openai", label: "OpenAI" },
                    { value: "hunyuan", label: "HunYuan" },
                    { value: "kimi", label: "Kimi" },
                    { value: "qwq", label: "Qwen" },
                  ]}
                />
                <Button type="primary" onClick={handleSubmit}>
                  {t("generateGuide")}
                </Button>

                {loading && (
                  <progress
                    style={{ marginLeft: "7px", width: "20%", margin: "auto" }}
                    value={null}
                    max="100"
                  />
                )}
                <Button type="primary" onClick={onClose} danger>
                  Cancel
                </Button>
              </div>
              <br />
            </div>
          </div>

          {/* 在此处根据response结果展开卡片，如果请求结果为空，或没有请求则不展开 */}
          {travelPlan && (
            <div className="guide-response-container">
              <TravelGuideDisplay
                inGuide={travelPlan}
                onSave={handleGuideSave}
                onCancel={handleGuideCancel}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AddTravelPlanModal;
