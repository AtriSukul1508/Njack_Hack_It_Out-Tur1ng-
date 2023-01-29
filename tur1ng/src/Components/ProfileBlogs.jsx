import React, { useEffect, useState } from 'react'
import '../styles/userallblog.css'
import { useBlogsContext } from '../hooks/useBlogsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import UserBlogCard from './UserBlogCard';
import emptyBlog from '../Assets/emptyblog.svg';
import { CircularProgress } from '@mui/material';
const ProfileBlogs = () => {
  const { blogs, dispatch } = useBlogsContext();
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(true);
  console.log(blogs)
  useEffect(() => {
    const fetchBlogs = async () => {
      if (!user) {
        return
      }
      const response = await fetch('/blogapi/userallblog', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const data = await response.json()

      if (response.ok) {
        dispatch({ type: 'DISPLAY_BLOG', payload: data });
        setIsLoading(false)
      }
    }
    if (user) {
      fetchBlogs()
      console.log(blogs)
    }
  }, [dispatch])


  return (
    <>
      {blogs.length >0 ? <>
        <div className='allposts_container'>
          <div className='user__blogs__container'>
            <h1 style={{ fontFamily: 'Poppins' }}>Your Posts</h1>

            {isLoading ? <div> <CircularProgress /></div> :
              <div className='blogs'>
                {blogs && blogs.map(blog => (
                  <UserBlogCard blog={blog} key={blog._id} />
                )
                )}
              </div>}
          </div>
        </div>
      </> :
        <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: '3rem', gap: '1.5rem' }}>
          <h1 style={{ fontFamily: 'Poppins' }}>Your Posts</h1>
          <img src={emptyBlog} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '40vw', height: '40vh' }} alt='You have not posted anything' />
          <p style={{ fontSize: '1.3rem', fontFamily: 'Poppins', color: '#ff8200' }}>You have not posted anything</p>
        </div>
      }

    </>
  )
}

export default ProfileBlogs