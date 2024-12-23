import React, { useEffect } from "react";
import { Button, message } from "antd";
import { BsGoogle, BsWechat } from "react-icons/bs";

const GOOGLE_LOGIN_URL = "http://localhost:5000/login"; // 后端的登录接口

const LoginPage = () => {
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      // 获取当前页面的 URL
      const currentPage = window.location.href;

      // 创建弹出窗口并打开 OAuth 流程
      const popup = window.open(
        `${GOOGLE_LOGIN_URL}?redirect_uri=${encodeURIComponent(currentPage)}`,
        "OAuth Popup",
        "width=400,height=500"
      );
      console.info(popup.name);

      if (!popup) {
        console.error("弹窗未成功打开！");
        message.error("弹窗未成功打开，请检查浏览器设置！");
        return;
      }

      // 监听来自弹出窗口的消息
      const messageListener = (event) => {
        console.info("接收到消息:", event);
        // 只接受来自同源的消息
        if (event.origin !== window.location.origin) {
          return;
        }

        // 获取 OAuth 流程完成后的用户信息
        const { user_info, token_info, error } = event.data;

        if (error) {
          console.info("OAuth 流程失败！");
          message.error("OAuth 流程失败！");
        } else {
          // 将用户信息和令牌信息存储到 localStorage
          console.info("保存 userInfo 和 tokenInfo 到 localStorage");
          localStorage.setItem("userInfo", JSON.stringify(user_info));
          localStorage.setItem("tokenInfo", JSON.stringify(token_info));

          message.success("登录成功！");
        }
        const userInfo = localStorage.getItem("userInfo");
        console.info("userInfo1:", userInfo);
        // 移除监听器，避免多次触发
        window.removeEventListener("message", messageListener);
        // 关闭弹出窗口
        if (popup) popup.close();
      };

      // 添加消息监听器
      window.addEventListener("message", messageListener, false);
    } catch (error) {
      message.error("请求失败，请重试！");
      console.error("登录请求错误:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
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
          onClick={handleLogin}
          size="large"
          loading={loading}
          style={{
            width: "100%",
          }}
        >
          <BsGoogle style={{ marginRight: "8px" }} />
          Google Login
        </Button>
        <br />
        <br />

        <Button
          type="dashed"
          size="large"
          loading={loading}
          style={{
            width: "100%",
          }}
        >
          <BsWechat style={{ marginRight: "8px" }} />
          WeChat Login Visitors use
        </Button>
        <br/>
        <br/>
        <Button
          type="primary"
          onClick={handleLogin}
          size="large"
          loading={loading}
          style={{
            width: "100%",
          }}
        >
          <BsGoogle style={{ marginRight: "8px" }} />
          Visitors Use
        </Button>

      </div>
    </div>
  );
};

export default LoginPage;
