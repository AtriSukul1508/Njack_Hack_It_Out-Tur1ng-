import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useBlogsContext } from '../../../hooks/useBlogsContext';
import suggestiveContentBg from '../../../Assets/suggestions.svg'
import SuggestiveBlog from './SuggestiveBlog';
import { CircularProgress } from '@mui/material';
import apiConfig from '../../../api.config';

const HomeLeftComponent = () => {
    const { blogs, dispatch } = useBlogsContext();
    const { user } = useAuthContext();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchSuggestiveBlogs = async () => {
            const response = await fetch(apiConfig.URL+'/blogapi/getsuggestiveblog', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const data = await response.json()

            if (response.ok) {
                dispatch({ type: 'DISPLAY_SUGGESTIVE_BLOG', payload: data });
                setIsLoading(false)
            }
        }
        if (user) {
            fetchSuggestiveBlogs()
        }
    }, [dispatch])

    return (
        <>
            <div className='suggestive__content__container'>
                <img src={suggestiveContentBg} style={{ width: '7vw', height: '7vw' }} alt='Suggestions for you' />
                <h2 style={{ fontFamily: 'Poppins', color: '#4596b6' }}>Suggestions for you</h2>

                {isLoading ?
                    <div style={{ width: '34vw' }}><CircularProgress /></div> :
                    <div className='suggest__contents'>
                        {blogs && blogs.map((blog) => (
                            <SuggestiveBlog blog={blog} key={blog._id} />
                        ))}
                    </div>
                }
            </div>
        </>
    )
}

export default HomeLeftComponent