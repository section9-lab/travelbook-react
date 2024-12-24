import axiosInstance from "./axiosInstance";

export const get_home = (langg) => {
  return axiosInstance.get(`/home`, {
    params: { language: langg },
  });
};

export const home_search = (dest, langg) => {
  return axiosInstance.get(`/home_search`, {
    params: {
      destination: dest,
      language: langg,
    },
  });
};

export const update_hot = (travel_id, langg) => {
  return axiosInstance.get(`/update_hot`, {
    params: {
      id: travel_id,
      language: langg,
    },
  });
};

export const travel_plans_list = async (duid) => {
  return axiosInstance.get(`/travel_plans_list`, {
    params: { user_id: duid },
  });
};

export const public_travel = (travel_id, langg) => {
  return axiosInstance.get(`/public_travel`, {
    params: {
      id: travel_id,
      language: langg,
    },
  });
};

export const add_travel_plans = (newPlan, langg) => {
  console.info(newPlan);
  return axiosInstance.post(`/add_travel_plans`, newPlan, {
    params: { language: langg },
  });
};

export const gen_travel_plans = (GenPlan, langg) => {
  return axiosInstance.post(`/gen_travel_plans`, GenPlan, {
    params: { language: langg },
  });
};

export const edit_travel_plans = (Plan, travel_id) => {
  return axiosInstance.post(`/edit_travel_plans`, Plan, {
    params: { id: travel_id },
  });
};

export const delete_travel_plan = (travel_id) => {
  return axiosInstance.get(`/delete_travel_plan`, {
    params: { id: travel_id },
  });
};

export const getAuthStatus = (user_id) => {
  return axiosInstance.get(`/auth/status`, {
    withCredentials: true,
    params: { user_id: user_id },
  });
};

export const googleAuth = async () => {
  const response = await axiosInstance.get(`/auth/google`);
  return response.data; // axios 自动解析 JSON 响应到 `response.data`
};

export const googleAuthLogout = (user_id) => {
  return axiosInstance.get(`/auth/logout`, {
    withCredentials: true,
    params: { user_id: user_id },
  });
};

export const visitorLogin = (user_id) => {
  return axiosInstance.get(`/auth/visitor`, {
    params: { user_id: user_id },
  });
};
