import React, { useState } from "react";
import { useLanguage } from "../../LanguageContext";
import TravelGuideEdit from "../TravelGuideEdit";
import { Button, Input, Select, DatePicker, message } from "antd";
import { gen_travel_plans } from "../../../Conf/api";
import "./AddTravelPlan.css";

const { RangePicker } = DatePicker;

const AddTravelPlan = ({ isShowAddCard, setIsShowAddCard, onSubmit }) => {
  const { t, language } = useLanguage();
  const [showInputCard,setShowInputCard] = useState(true)
  const [showAddResultCard, setShowAddResultCard] = useState(true); // 显示添加旅行计划框
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [travelPlan, setTravelPlan] = useState(null);
  const [loading, setLoading] = useState(false); // 是否显示进度条

  if (isShowAddCard === false) {
    console.info("isShowAddCard:", isShowAddCard);
    return null;
  }

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
        setShowInputCard(false)
        setShowAddResultCard(true);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error generating guide:", error);
        message.error("gen_travel_plan fail");
        setTravelPlan(null);
        setLoading(false);
        setShowAddResultCard(false);
        setShowInputCard(true)
        setIsShowAddCard();
      });
  };

  const handleGuideSave = (savedGuide) => {
    console.info("handleGuideSave:", savedGuide);
    onSubmit(savedGuide);
    setShowAddResultCard(false);
    setIsShowAddCard();
    setTravelPlan(null);
  };

  const handleGuideCancel = () => {
    console.info("handleGuideCancel");
    setTravelPlan(null);
    setShowAddResultCard(false);
    setLoading(false);
    setIsShowAddCard();
  };

  const handleSelectChange = (event) => {
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

  return (
    <div className="modal-overlay">
      {showInputCard && (
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
                onChange={handleSelectChange}
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
              <Button type="primary" onClick={() => setIsShowAddCard()} danger>
                Cancel
              </Button>
            </div>
            <br />
          </div>
        </div>
      )}

      {/* 在此处根据response结果展开卡片，如果请求结果为空，或没有请求则不展开 */}
      {travelPlan && showAddResultCard && (
        <div className="guide-response-container">
          <TravelGuideEdit
            inGuide={travelPlan}
            onSave={handleGuideSave}
            onCancel={handleGuideCancel}
          />
        </div>
      )}
    </div>
  );
};

export default AddTravelPlan;
