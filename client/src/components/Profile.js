import React, { useEffect, useState } from "react";
import avatar from "../assets/profile.webp";
import toast, { Toaster } from "react-hot-toast";
import convertToBase64 from "../helper/convert";
import { useNavigate } from "react-router-dom";
import { auth } from "../lib/firebase/auth";
import { signOut } from "firebase/auth";

import styles from "../styles/Login.module.css";
import extend from "../styles/Profile.module.css";

export default function Profile() {
  const navigate = useNavigate();
  const [file, setFile] = useState();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const authenticate = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => {
      authenticate();
    };
  }, [user]);

  // image upload handler 
  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  // logout handler function
  const logout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        // An error happened.
      });
  };

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="flex justify-center h-screen py-5">
        <div
          className={`${styles.glass} ${extend.glass}`}
          style={{ width: "45%", paddingTop: "3em" }}
        >
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Profile</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Your details here.
            </span>
          </div>

          <div className="py-1">
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                <img
                  src={user ? user.photoURL : file || avatar}
                  className={`${styles.profile_img} ${extend.profile_img}`}
                  alt="avatar"
                />
              </label>

              <input
                onChange={onUpload}
                type="file"
                id="profile"
                name="profile"
              />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <div
                className={`flex justify-center ${styles.btn} ${extend.textbox}`}
              >
                {user ? user.displayName : "Name"}
              </div>

              <div
                className={`flex justify-center ${styles.btn} ${extend.textbox}`}
              >
                {user ? user.phoneNumber : "Phone Number"}
              </div>

              <div
                className={`flex justify-center ${styles.btn} ${extend.textbox}`}
              >
                {user ? user.email : "Email"}
              </div>

              <div
                className={`flex justify-center px-5 ${styles.btn} ${extend.textbox}`}
              >
                {user ? user.uid : "Address"}
              </div>

              <div
                className={`flex justify-center ${styles.btn} ${extend.textbox}`}
              >
                {user ? user.metadata.lastSignInTime : "Last Login"}
              </div>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                come back later?{" "}
                <button className="text-red-500" onClick={logout}>
                  Logout
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
