import axios from "axios";

const interceptUrls = [
  "http://localhost:3000/api/respondents",
  "http://localhost:3000/currentLogo",
  "http://localhost:3000/uploadLogo",
  "http://localhost:3000/api/admins",
  "http://localhost:3000/api/admins",
  "http://localhost:3000/deleteAdmin",
  "http://localhost:3000/api/Add_New_Admin",
  "http://localhost:3000/api/admin/updateInfo",
  "http://localhost:3000/uploadAdminPhoto",
  "http://localhost:3000/api/statistics",
  "http://localhost:3000/api/getAccessByDate",
  "http://localhost:3000/api/Retrivequestions",
  "http://localhost:3000/api/histogram",
];

// 请求拦截器
axios.interceptors.request.use(
  (config) => {
    // 使用可选链操作符 ?. 安全地访问 config.url
    if (
      config.url &&
      interceptUrls.some((url) => config.url?.startsWith(url))
    ) {
      const token = localStorage.getItem("token");
      if (token) {
        // 如果请求的 URL 不在 interceptUrls 列表中，并且 token 存在
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  (response) => {
    // 正常响应处理
    return response;
  },
  (error) => {
    // 检查错误响应状态码
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      // 重定向到登录页面
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);
