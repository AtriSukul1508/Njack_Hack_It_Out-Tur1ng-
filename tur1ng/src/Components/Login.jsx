import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { Email, Lock } from "@mui/icons-material";
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

  return (
    <>
      <div className="credentials__container">
        <div className="container_login">
          <div className="heading_line" style={{ textAlign: "center" }}>
            <h1 className="heading_title">
              Tur<span>1</span>ng<span>_</span>
            </h1>

            <h1 className="welcome_msg">Welcome Back</h1>

            <h3 className="login_msg">Log In to your account</h3>
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
              </div>
            </div>

            {error && (
              <div className="error">
                <ErrorIcon fontSize="small" /> {error}
              </div>
            )}
            <NavLink to="/forgetpassword" className="forgot_password">
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
              <p className="signin_opt">
                Login Using :
                <div className="signin_opt--icons">
                  <NavLink to="#">
                    <FaGoogle size={30} className="google_icon" />
                  </NavLink>
                  {/* Can be used for OAuth via google */}

                  <NavLink to="#">
                    <FaFacebookF size={30} className="facebook_icon" />
                  </NavLink>
                  {/* Can be used for OAuth via facebook */}

                  <NavLink to="#">
                    <FaGithub size={30} className="github_icon" />
                  </NavLink>
                  {/* Can be used for OAuth via github */}
                </div>
              </p>
              <p className="" style={{ color: "#000" }}>
                Don't have an account?{" "}
                <NavLink className="signup__link" to="/signup">
                  Sign Up
                </NavLink>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
