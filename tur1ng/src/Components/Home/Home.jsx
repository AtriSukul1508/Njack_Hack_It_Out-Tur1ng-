import React from 'react';
import HomeLeftComponent from './SuggestiveBlogs/HomeLeftComponent';
import HomeRightComponent from './FeedBlogs/HomeRightComponent';
import '../../styles/home.css';
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