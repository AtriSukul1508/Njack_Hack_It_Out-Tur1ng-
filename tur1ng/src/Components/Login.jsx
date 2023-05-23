import React, { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import {
  Email,
  Lock,
  Google,
  Facebook,
  GitHub,
  PanoramaFishEye,
} from "@mui/icons-material";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import "../styles/login.css";
import { useLogin } from "../hooks/useLogin";
import ErrorIcon from "@mui/icons-material/Error";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();
  const verifyAndPostData = async (event) => {
    event.preventDefault();
    await login(email, password);
  };

  const [isActive, setIsActive] = useState(false);

  function showPW() {
    var x = document.getElementById("user_password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

  return (
    <>
      <div className="credentials__container">
        <div className="credentials__container_left">
          <div className="heading_line" style={{ textAlign: "center" }}>
            <h1 className="heading_title">
              Tur<span>1</span>ng<span>_</span>
            </h1>
          </div>
          <div className="welcome_msg">
            <p>Welcome Back</p>
          </div>
          <div className="login_opt">
            <p>Login using</p>
            <div className="login_opt_icons">
              <Google fontSize="large" className="opt_icons--g" />
              {/* For OAuth via Google */}
              <Facebook fontSize="large" className="opt_icons--f" />
              {/* For OAuth via Facebook */}
              <GitHub fontSize="large" className="opt_icons--gh" />
              {/* For OAuth via Github */}
            </div>
            <div className="btns_submit">
              <p className="mt-3" style={{ color: "#000" }}>
                Don't have an account?{" "}
                <NavLink
                  style={{
                    textDecoration: "none",
                    color: "#6d7993",
                    fontWeight: "bold",
                    ":hover": { color: "#000" },
                  }}
                  className="hover_effect_signup_txt"
                  to="/signup"
                >
                  Sign Up
                </NavLink>
              </p>
            </div>
          </div>
        </div>
        <div className="container_login">
          <div className="heading_line" style={{ textAlign: "center" }}>
            <h2 style={{ fontFamily: "Poppins", margin: ".8rem 0" }}>
              Log In to your account
            </h2>
          </div>
          <form method="POST" className="login__info">
            <div className="login__credentials">
              <div className="user_email_field info_field">
                <Email className="info_icon" />
                <input
                  type="text"
                  name="email"
                  autoComplete="off"
                  placeholder="Enter your mail ID"
                  onChange={(e) => setEmail(e.target.value)}
                  id="user_mail"
                />
              </div>
              <div className="user_password_field info_field">
                <Lock className="info_icon" />
                <input
                  type="password"
                  name="password"
                  autoComplete="off"
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                  id="user_password"
                />
                {isActive ? (
                  <AiFillEyeInvisible
                    size={20}
                    className="eye_icon"
                    onClick={() => {
                      setIsActive(!isActive);
                      showPW();
                    }}
                  />
                ) : (
                  <AiFillEye
                    size={20}
                    className="eye_icon"
                    onClick={() => {
                      setIsActive(!isActive);
                      showPW();
                    }}
                  />
                )}
              </div>
            </div>

            {error && (
              <div className="error">
                <ErrorIcon fontSize="small" /> {error}
              </div>
            )}
            <NavLink
              className="forget_password"
              to="/forgetpassword"
              style={{
                marginTop: ".8rem",
                textDecoration: "none",
              }}
            >
              Forgot Password?
            </NavLink>
            <div className="btns_submit">
              <input
                type="submit"
                name="login__btn"
                className="login__btn"
                id="login__btn"
                onClick={verifyAndPostData}
                value="Login"
                disabled={isLoading}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
