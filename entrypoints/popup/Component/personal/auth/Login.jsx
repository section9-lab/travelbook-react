import React, { useState, useEffect } from "react";
import { Button, message } from "antd";
import {
  GoogleOutlined,
  WechatOutlined,
  ChromeOutlined,
} from "@ant-design/icons";
import { getAuthStatus, googleAuth, visitorLogin } from "../../../Conf/api";

import API_BASE_URL from "../../../Conf/axiosInstance";

const Login = ({ setAuthed, getUserId, setUserInfo }) => {
  const [loading, setLoading] = useState(false);

  // 处理登录
  //   const handleLogin = async () => {
  //     try {
  //       // 1. 获取授权URL
  //       const response = await fetch(`${FLASK_BACKEND_URL}/auth/google`);
  //       const data = await response.json();

  //       if (data.auth_url) {
  //         // 2. 打开新窗口
  //         const authWindow = window.open(
  //           data.auth_url,
  //           "google-oauth",
  //           "width=500,height=600,menubar=no,toolbar=no"
  //         );

  //         // 3. 监听认证窗口的消息
  //         window.addEventListener("message", (event) => {
  //           // 验证消息来源
  //           if (event.origin === FLASK_BACKEND_URL) {
  //             if (event.data.type === "oauth-success") {
  //               setIsAuthenticated(true);
  //               setUserInfo(event.data.user);
  //               //authWindow.close();
  //                // 移除消息监听器
  //             window.removeEventListener('message', handleMessage);

  //             // 尝试定期检查窗口是否已关闭
  //             const checkWindow = setInterval(() => {
  //               if (authWindow.closed) {
  //                 clearInterval(checkWindow);
  //               } else {
  //                 try {
  //                   authWindow.close();
  //                 } catch (e) {
  //                   console.log("无法自动关闭窗口");
  //                 }
  //               }
  //             }, 1000);

  //             }
  //           }
  //         });
  //       }
  //     } catch (error) {
  //       console.error("认证过程出错:", error);
  //     }
  //   };

  // 检查登录状态
  useEffect(() => {
    const checkAuthStatus = async () => {
      const userID = getUserId();
      getAuthStatus(userID)
        .then((response) => {
          if (response.authenticated) {
            setAuthed(true);
            setUserInfo(response.user);
          }
        })
        .catch((error) => {
          console.error("检查登录状态出错:", error);
        });
    };

    checkAuthStatus();
  }, []);

  const googleLogin = async () => {
    googleAuth()
      .then((data) => {
        if (data.auth_url) {
          // 打开新窗口
          const authWindow = window.open(
            data.auth_url,
            "google-oauth",
            "width=380,height=480,menubar=no,toolbar=no"
          );

          // 监听认证窗口的消息
          const handleMessage = (event) => {
            if (event.origin === API_BASE_URL) {
              if (event.data.type === "oauth-success") {
                console.info("handleMessage data:", event.data.user);
                setAuthed(true);
                setUserInfo(event.data.user);

                // 移除消息监听器
                window.removeEventListener("message", handleMessage);

                // 尝试定期检查窗口是否已关闭
                const checkWindow = setInterval(() => {
                  if (authWindow && authWindow.closed) {
                    clearInterval(checkWindow);
                  } else {
                    try {
                      authWindow.close();
                    } catch (e) {
                      console.log("无法自动关闭窗口");
                    }
                  }
                }, 1000);
              }
            }
          };
          window.addEventListener("message", handleMessage);

          // 设置定时器检查窗口状态
          const checker = setInterval(() => {
            if (authWindow && authWindow.closed) {
              clearInterval(checker);
              window.removeEventListener("message", handleMessage);
            }
          }, 1000);
        }
      })
      .catch((error) => {
        console.error("认证过程出错:", error);
      });
  };

  const clickWeChatLogin = async () => {
    message.info("Wechat is dev....");
    message.info("Please use Google or Visitor");
  };

  const clickVisitorLogin = async () => {
    const userID = getUserId();
    console.info(userID);
    visitorLogin(userID)
      .then((response) => {
        console.info("visitorLogin:", response.data.data);
        setAuthed(true);
        setUserInfo(response.data.data);
        message.success("visitorLogin");
      })
      .catch((error) => {
        console.error("visitorLogin:", error);
        message.error("visitorLogin");
      });
  };

  // 组件的渲染部分
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      {/* 背景视频 */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover", // 确保视频覆盖整个背景
          zIndex: 1, // 将视频放置到背景层
        }}
      >
        <source
          src="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
          type="video/mp4"
        />
        您的浏览器不支持视频播放。
      </video>

      {/* 登录按钮 */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)", // 精确居中
          zIndex: 1, // 确保按钮显示在视频上方
        }}
      >
        <Button
          type="primary"
          onClick={googleLogin}
          size="large"
          loading={loading}
          style={{
            width: "100%",
          }}
        >
          <GoogleOutlined style={{ marginRight: "8px" }} />
          Google Login
        </Button>
        <br />
        <br />

        <Button
          size="large"
          loading={loading}
          onClick={clickWeChatLogin}
          style={{
            width: "100%",
            backgroundColor: "green", // 设置绿色背景
            color: "white", // 设置白色文字
            borderColor: "green", // 设置绿色边框
            borderWidth: "1px", // 设置边框宽度
            borderStyle: "solid", // 设置边框样式
          }}
        >
          <WechatOutlined style={{ marginRight: "8px" }} />
          WeChat Login
        </Button>
        <br />
        <br />
        <Button
          color="Green"
          onClick={clickVisitorLogin}
          size="large"
          //loading={loading}
          style={{
            width: "100%",
          }}
        >
          <ChromeOutlined style={{ marginRight: "8px" }} />
          Visitors Use
        </Button>
      </div>
    </div>
  );
};

export default Login;
