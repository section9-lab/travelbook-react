import React, { useEffect, useState } from "react";
import { useLanguage } from "../LanguageContext";
import DateTimeRangePicker from "./DateTimeRangePicker";
import TravelGuideDisplay from "./TravelGuideDisplay";
import { gen_travel_plans } from "../../Conf/api";
import { BiCalendar } from "react-icons/bi";
import "./AddTravelPlanModal.css";

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

  console.info("=====AddTravelPlanModal========");

  const handleDateRangeChange = (start, end) => {
    setStartTime(start);
    setEndTime(end);
  };

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

  const options = [
    { value: "gemini", label: "Gemini" },
    { value: "llama", label: "Llama3" },
    { value: "openai", label: "OpenAI" },
    { value: "hunyuan", label: "HunYuan" },
    { value: "kimi", label: "Kimi" },
    { value: "qwq", label: "Qwen" },
    // 可以继续添加更多选项
  ];
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    console.info("select:", selectedValue);

    // 如果 selectedValue 为空，使用默认值
    aiGentravelPlan.model = selectedValue || "gemini";
  };

  if (isOpen === false) {
    console.info("isOpen:", isOpen);
    return null;
  }

  return (
    <div className="modal-overlay">
      {showAdd && (
        <div className="modal-content">
          <h2>{t("addTravelPlan")}</h2>
          <label>{t("travelDateRange")}</label>
          <div className="date-input-container">
            <input
              type="text"
              value={
                startTime && endTime
                  ? `${new Date(startTime).toLocaleString()} - ${new Date(
                      endTime
                    ).toLocaleString()}`
                  : t("selectDateRange") || ""
              }
              readOnly
              className="date-input"
              style={{ width: "75%", gap: "4px" }}
            />
            <button
              className="calendar-button"
              onClick={() => setIsDatePickerOpen(true)}
            >
              <BiCalendar />
            </button>
          </div>

          {isDatePickerOpen && (
            <div
              className="calendar-popup"
              style={{
                position: "absolute",
                top: "10px",
                width: "95%",
                left: "0",
                zIndex: 1000,
                backgroundColor: "white",
                border: "1px solid #ccc",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <DateTimeRangePicker
                startDate={startTime}
                endDate={endTime}
                onChange={handleDateRangeChange}
                onClose={() => setIsDatePickerOpen(false)}
              />
            </div>
          )}
          <div className="input-source-location">
            <input
              type="text"
              placeholder={t("source")}
              value={source}
              onChange={(e) => setSource(e.target.value)}
              style={{ width: "75%", gap: "4px" }}
            />
          </div>
          <div className="input-destination-location">
            <input
              type="text"
              placeholder={t("destination")}
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
              style={{ width: "75%", gap: "4px" }}
            />
            *
          </div>

          <div className="modal-actions">
            <div className="ai-select-container">
              <select
                id="ai-selector"
                onChange={handleChange}
                defaultValue="gemini"
              >
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <button onClick={handleSubmit}>{t("generateGuide")}</button>
            {loading && (
              <progress
                style={{ marginLeft: "7px", width: "20%", margin: "auto" }}
                value={null}
                max="100"
              />
            )}
            <button onClick={onClose}>{t("cancel")}</button>
          </div>
        </div>
      )}
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
  );
};

export default AddTravelPlanModal;
