import React, { useEffect, useState } from 'react'
import '../styles/home.css'
import { useBlogsContext } from '../hooks/useBlogsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import FeedBlog from './FeedBlog';
import { CircularProgress } from '@mui/material';
const HomeRightComponent = () => {
    const { blogs, dispatch } = useBlogsContext();
    const { user } = useAuthContext();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchBlogs = async () => {
            const response = await fetch('/allblogs', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const data = await response.json()

            if (response.ok) {
                dispatch({ type: 'DISPLAY_BLOG', payload: data })
                setIsLoading(false);
            }
        }

        if (user) {
            fetchBlogs()
        }
    }, [dispatch])


    return (
        <>
            <div className='feed__content__container'>
                <h1 style={{ textAlign: 'center', fontFamily: 'Poppins' }}>Top picks of the day</h1>
                {isLoading ?
                    <div style={{ width: '63vw', display: 'flex', justifyContent: 'center' }}><CircularProgress /></div> :
                    <div className='feed__blog__container'>
                        {blogs && blogs.map(blog => (
                            <FeedBlog blog={blog} key={blog._id} />
                        ))}
                    </div>}
            </div>
        </>
    )
}

export default HomeRightComponent