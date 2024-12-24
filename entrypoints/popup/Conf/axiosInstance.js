import axios from "axios";

const CLOUD_PROD = "https://travelbook.section9lab.cn";
const LOCAL_TEST = "http://localhost:5000";

export const API_BASE_URL = CLOUD_PROD;

// 创建 Axios 实例
const axiosInstance = axios.create({
  baseURL: API_BASE_URL, // 替换为 API_BASE_URL
  timeout: 20000, // 设置请求超时时间（可选）
});

// 请求失败重试机制
axiosInstance.interceptors.response.use(
  (response) => response, // 如果响应正常，直接返回
  async (error) => {
    const config = error.config;

    // 检查是否已经设置了重试标记，如果没有则初始化
    if (!config.__retryCount) {
      config.__retryCount = 0;
    }

    // 设置最大重试次数
    const MAX_RETRY = 5;

    // 如果未达到最大重试次数，则重试
    if (config.__retryCount < MAX_RETRY) {
      config.__retryCount += 1;

      // 等待一段时间后重试（指数退避策略或固定延迟）
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 秒延迟

      // 重新发起请求
      return axiosInstance(config);
    }

    // 如果超出重试次数，则抛出错误
    return Promise.reject(error);
  }
);

export default axiosInstance;
