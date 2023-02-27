import React from 'react'
import Navbar from './Components/Navbar/Navbar';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import WriteBlog from './Components/WriteBlog/WriteBlog';
import ProfileBlogs from './Components/UserBlog/ProfileBlogs';
import Home from './Components/Home/Home';
import Error from './Components/Error/Error';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import ViewBlog from './Components/ViewBlog/ViewBlog';
import ForgetPassword from './Components/ForgetPassword';
import Profile from './Components/UserProfile/Profile';
import Footer from './Components/Footer/Footer';

const App = () => {
  const location = useLocation();
  const { user } = useAuthContext();
  return (
    <>
      {/* {(location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/forgetpassword') ?
        <Routes>
          <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
          <Route path='/signup' element={!user ? <SignUp /> : <Navigate to='/' />} />
          <Route path='/forgetpassword' element={<ForgetPassword />} />
          <Route path='*' element={<Error />} />
        </Routes> :  */}
        {/* <> */}
          <Navbar />
          <Routes>
            {/* <Route path='/' element={user ? <Home /> : <Navigate to='/login' />} />
            <Route path='/blog/:id' element={user ? <ViewBlog /> : <Navigate to='/login' />} />
            <Route path='/addblog' element={user ? <WriteBlog /> : <Navigate to='/login' />} />
            <Route path='/userallblog' element={user ? <ProfileBlogs /> : <Navigate to='/login' />} />
            <Route path='/profile/:id' element={user ? <Profile /> : <Navigate to='/login' />} />
            <Route path='*' element={user ? <Error /> : <Navigate to='/login' />} /> */}

            <Route path='/' element={<Home />} />
            <Route path='/blog/:id' element={<ViewBlog />} />
            <Route path='/addblog' element={ <WriteBlog />} />
            <Route path='/userallblog' element={<ProfileBlogs />} />
            <Route path='/profile/:id' element={<Profile />} />
            <Route path='*' element={<Error />} />
          </Routes>
          <Footer />
        {/* </> */}
      {/* } */}

    </>
  )
}

export default App;