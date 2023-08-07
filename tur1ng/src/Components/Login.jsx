import React, { useState, useEffect } from "react";
import { auth, provider,facebookProvider } from "./config"
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Email, Lock } from "@mui/icons-material";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/login.css";
import { useLogin } from "../hooks/useLogin";
import ErrorIcon from "@mui/icons-material/Error";
import { useAuthContext } from "../hooks/useAuthContext";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login, error, isLoading } = useLogin();
  const { dispatch } = useAuthContext();

  const verifyAndPostData = async (event) => {
    event.preventDefault();
    await login(email, password);
  };

  function showHidePW() {
    const pw = document.getElementById("user_password");
    const pwIcon = document.getElementById("pw_icon");
    if (pw.type === "password") {
      pw.type = "text";
      pwIcon.style.color = "#000";
    } else {
      pw.type = "password";
      pwIcon.style.color = "#ccc";
    }
  }

  const handleGoogleClick = async (e) => {
    e.preventDefault()
    try {
      const result = await signInWithPopup(auth, provider)
      console.log("result", result)

      const user = auth.currentUser;
      alert(`Login sucessful! Welcome ${user.displayName} [${user.email}]`)
      // console.log('currentUser ', JSON.stringify(user.toJSON()));
      // localStorage.setItem('tur1ng_user', JSON.stringify(user.toJSON()))
      // dispatch({ type: 'LOGIN', payload: user.toJSON() });
    }
    catch (error) {
      console.error("Error during Google authentication:", error.message);
    }
  }

  const logOut = async () => {
    try {
      await signOut(auth)
    }
    catch (error) {
      console.log(error)
    }
  }

  const signInWithFacebook = async (e) => {
    e.preventDefault()
    try {
      const result = await signInWithPopup(auth, facebookProvider)
      console.log("result", result)

    }
    catch (error) {
      console.error("Error during Facebook authentication:", error.message);
    }
  }
  return (
    <>
      <div className="credentials__container">
        <div className="container_login">
          <div className="heading_line" style={{ textAlign: "center" }}>
            <h1 className="heading_title">
              Tur<span style={{fontWeight:"bold"}}>1</span>ng<span>_</span>
            </h1>

            <h2 className="welcome_msg">Welcome Back</h2>

            <h3 className="login_msg">Log In to your account</h3>
          </div>
          <form method="POST" className="login__info" aria-label="Login form">
            <div className="login__credentials">
              <div className="user_email_field info_field">
                <Email className="info_icon" />
                <input className="formtext"
                  type="text"
                  name="email"
                  autoComplete="off"
                  placeholder="Enter your mail ID"
                  onChange={(e) => setEmail(e.target.value)}
                  id="user_mail"
                  required
                  aria-required="true"
                  aria-label="Enter your email"
                />
              </div>
              <div className="user_password_field info_field">
                <Lock className="info_icon" />
                <input className="formtext"
                  type="password"
                  name="password"
                  autoComplete="off"
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                  id="user_password"
                  required
                  aria-required="true"
                  aria-label="Enter your password"
                />
                {showPassword ? (
                  <AiFillEyeInvisible
                    size={20}
                    onClick={() => {
                      setShowPassword(!showPassword);
                      showHidePW();
                    }}
                    id="pw_icon"
                    aria-label={showPassword ? "Hide Password" : "Show Password"}
                  />
                ) : (
                  <AiFillEye
                    size={20}
                    onClick={() => {
                      setShowPassword(!showPassword);
                      showHidePW();
                    }}
                    id="pw_icon"
                    aria-label={!showPassword ? "Hide Password" : "Show Password"}
                  />
                )}
              </div>
            </div>

            {error && (
              <div className="error" role="alert">
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
                role="button"
              />
              <div className="signin_opt">
                Login Using :
                <div className="signin_opt--icons">
                  <span>
                    <FaGoogle size={30} className="google_icon" onClick={handleGoogleClick} />
                  </span>
                  {/* Can be used for OAuth via google */}

                  <NavLink to="#">
                    <FaFacebookF size={30} className="facebook_icon" onClick={signInWithFacebook}/>
                  </NavLink>
                  {/* Can be used for OAuth via facebook */}

                  <NavLink to="#">
                    <FaGithub size={30} className="github_icon" />
                  </NavLink>
                  {/* Can be used for OAuth via github */}
                </div>
              </div>
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
