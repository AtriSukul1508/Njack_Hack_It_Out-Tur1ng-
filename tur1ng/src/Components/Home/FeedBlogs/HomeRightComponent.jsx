import React, { useEffect, useState } from 'react'
import '../../../styles/home.css';
import { useBlogsContext } from '../../../hooks/useBlogsContext';
import { useAuthContext } from '../../../hooks/useAuthContext';
import FeedBlog from './FeedBlog';
import { CircularProgress } from '@mui/material';
import apiConfig from '../../../api.config';
import Footer from '../../Footer/Footer';

const HomeRightComponent = () => {
    const { blogs, dispatch } = useBlogsContext();
    const { user } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const fetchBlogs = async () => {
            const response = await fetch(apiConfig.URL+'/blogapi/allblogs', {
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
        }, {
            title: "Lorem ipsum lorem",
            author: "Atri Sukul",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
        {
            title: "Lorem ipsum lorem",
            author: "Atri Sukul",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        }, {
            title: "Lorem ipsum lorem",
            author: "Atri Sukul",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        }
    ]
    return (
        <>
            <div className='feed__content__container'>
                <h1 style={{ textAlign: 'center', fontFamily: 'Poppins' }}>Top picks of the day</h1>
                {isLoading ?
                    <div style={{ width: '63vw', display: 'flex', justifyContent: 'center' }}><CircularProgress /></div> :
                    <div className='feed__blog__container'>
                        {blogss && blogss.map(blog => (
                            <FeedBlog blog={blog} />
                        ))}
                    </div>}
            </div>
            {/* <Footer /> */}
        </>
    )
}

export default HomeRightComponent