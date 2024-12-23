// apiService.js
import axios from "axios";

const CLOUD_PROD = "https://travelbook.section9lab.cn";
const LOCAL_TEST = "http://localhost:5000";

export const API_BASE_URL = CLOUD_PROD;

export const get_home = (langg) => {
  return axios.get(`${API_BASE_URL}/home`, {
    params: { language: langg },
  });
};

export const home_search = (dest, langg) => {
  return axios.get(`${API_BASE_URL}/home_search`, {
    params: {
      destination: dest,
      language: langg,
    },
  });
};

export const update_hot = (travel_id, langg) => {
  return axios.get(`${API_BASE_URL}/update_hot`, {
    params: {
      id: travel_id,
      language: langg,
    },
  });
};

export const travel_plans_list = async (duid) => {
  return axios.get(`${API_BASE_URL}/travel_plans_list`, {
    params: { user_id: duid },
  });
};

export const public_travel = (travel_id, langg) => {
  return axios.get(`${API_BASE_URL}/public_travel`, {
    params: {
      id: travel_id,
      language: langg,
    },
  });
};

export const add_travel_plans = (newPlan, langg) => {
  console.info(newPlan);
  return axios.post(`${API_BASE_URL}/add_travel_plans`, newPlan, {
    params: { language: langg },
  });
};

export const gen_travel_plans = (GenPlan, langg) => {
  return axios.post(`${API_BASE_URL}/gen_travel_plans`, GenPlan, {
    params: { language: langg },
  });
};

export const edit_travel_plans = (Plan, travel_id) => {
  return axios.post(`${API_BASE_URL}/edit_travel_plans`, Plan, {
    params: { id: travel_id },
  });
};

export const delete_travel_plan = (travel_id) => {
  return axios.get(`${API_BASE_URL}/delete_travel_plan`, {
    params: { id: travel_id },
  });
};

export const getAuthStatus = (user_id) => {
  return axios.get(`${API_BASE_URL}/auth/status`, {
    withCredentials: true,
    params: { user_id: user_id },
  });
};

export const googleAuth = async () => {
  const response = await axios.get(`${API_BASE_URL}/auth/google`);
  return response.data; // axios 自动解析 JSON 响应到 `response.data`
};

export const googleAuthLogout = (user_id) => {
  return axios.get(`${API_BASE_URL}/auth/logout`, {
    withCredentials: true,
    params: { user_id: user_id },
  });
};

export const visitorLogin = (user_id) => {
  return axios.get(`${API_BASE_URL}/auth/visitor`, {
    params: { user_id: user_id },
  });
};
