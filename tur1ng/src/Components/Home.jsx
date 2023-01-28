import React from 'react';
import HomeLeftComponent from './HomeLeftComponent';
import HomeRightComponent from './HomeRightComponent';
import '../styles/home.css';
const Home = () => {
  return (
    <>
      <div className='home__container'>
        <HomeLeftComponent />
        <HomeRightComponent />

      </div>
    </>
  )
}

export default Home