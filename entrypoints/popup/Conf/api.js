// apiService.js
import axios from "axios";

const CLOUD_PROD = "https://travelbook.section9lab.cn";
const LOCAL_TEST = "http://localhost:5000";

const API_BASE_URL = CLOUD_PROD;

export const get_home = () => {
  return axios.get(`${API_BASE_URL}/home`);
};

export const home_search = (dest) => {
  return axios.get(`${API_BASE_URL}/home_search`, {
    params: { destination: dest },
  });
};

export const update_hot = (travel_id) => {
  return axios.get(`${API_BASE_URL}/update_hot`, {
    params: { id: travel_id },
  });
};

export const travel_plans_list = (duid) => {
  return axios.get(`${API_BASE_URL}/travel_plans_list`, {
    params: { user_id: duid },
  });
};

export const public_travel = (travel_id) => {
  return axios.get(`${API_BASE_URL}/public_travel`, {
    params: { id: travel_id },
  });
};

export const add_travel_plans = (newPlan) => {
  return axios.post(`${API_BASE_URL}/add_travel_plans`, newPlan, {
    headers: {
      "Access-Control-Allow-Origin": "travelbook",
      "Content-Type": "application/json",
    },
  });
};

export const gen_travel_plans = (GenPlan) => {
  return axios.post(`${API_BASE_URL}/gen_travel_plans`, GenPlan, {
    headers: {
      "Access-Control-Allow-Origin": "travelbook",
      "Content-Type": "application/json",
    },
  });
};
