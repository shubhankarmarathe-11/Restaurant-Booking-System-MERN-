import { useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GoogleLogin = () => {
  const navigate = useNavigate();

  async function handleCallbackResponse(response) {
    const google_token = response.credential;

    try {
      const res = await axios.post("/api/googleauth", { google_token });
      await navigate("/");
    } catch (err) {
      console.error("Error:", err);
    }
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("googleBtn"), {
      theme: "filled_black",
      size: "large",
      width: "300",
    });
  }, []);

  return <div id="googleBtn"></div>;
};

export { GoogleLogin };
