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
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const fetchSuggestiveBlogs = async () => {
            const response = await fetch(apiConfig.URL + '/blogapi/getsuggestiveblog', {
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

    const blogss = [
        {
            title: "Lorem ipsum lorem",
            author: "Atri Sukul",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
        {
            title: "Lorem ipsum lorem",
            author: "Atri Sukul",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
        {
            title: "Lorem ipsum lorem",
            author: "Atri Sukul",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        }
    ]

    return (
        <>
            <div className='suggestive__content__container'>
                <img src={suggestiveContentBg} style={{ width: '7vw', height: '7vw' }} alt='Suggestions for you' />
                <h2 style={{ fontFamily: 'Poppins', color: '#4596b6' }}>Suggestions for you</h2>

                {isLoading ?
                    <div style={{ width: '34vw' }}><CircularProgress /></div> :
                    <div className='suggest__contents'>
                        {blogss && blogss.map((blog) => (
                            <SuggestiveBlog blog={blog} />
                        ))}
                    </div>
                }
            </div>
        </>
    )
}

export default HomeLeftComponent