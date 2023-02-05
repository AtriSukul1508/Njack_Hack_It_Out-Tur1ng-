import React from 'react';
import HomeLeftComponent from './SuggestiveBlogs/HomeLeftComponent';
import HomeRightComponent from './FeedBlogs/HomeRightComponent';
import '../../styles/home.css';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useLogout } from '../../hooks/useLogout';
import { ToastContainer, toast } from 'react-toastify';
const Home = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const isTokenExpired = (token) => {
    const payloadBase64 = token.split('.')[1];
    const decodedJson = atob(payloadBase64)
    const decoded = JSON.parse(decodedJson)
    const exp = decoded.exp;
    const expired = (Date.now() >= exp * 1000)
    return expired
  }
  if (isTokenExpired(user.token)) {
    // console.log('token expired')
    // logout();
    toast.error("Token expired", {
      position: toast.POSITION.BOTTOM_RIGHT

    });
  }
  return (
    <>
      <div className='home__container'>
        <HomeLeftComponent />
        <HomeRightComponent />
        <ToastContainer />

      </div>
    </>
  )
}

export default Home