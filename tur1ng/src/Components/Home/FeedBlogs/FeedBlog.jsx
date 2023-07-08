import React, { useEffect, useState } from 'react'
import { ThumbUpOffAlt, ThumbUp } from '@mui/icons-material'
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useUpvoteContext } from '../../../hooks/useUpvoteContext';
import { NavLink } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import apiConfig from '../../../api.config';
import { useFetchUpvote } from '../../../hooks/useFetchUpvote';
import { Share } from '@mui/icons-material';


const FeedBlog = ({ blog }) => {
    const { dispatch } = useUpvoteContext();
    const [initialUpvote, setInitialUpvote] = useState(0);
    const { user } = useAuthContext();
    const { getUpvoteCount,upvoteVal,clicked } = useFetchUpvote();

    useEffect(() => {
        const fetchUpvoteCount = async () => {
            await getUpvoteCount(blog._id)
        }
        if (user) {
            fetchUpvoteCount()
        }
    }, [dispatch, initialUpvote])
    const updateUpvote = async () => {
        const resp = await fetch(apiConfig.URL + '/blogapi/upvote/' + blog._id, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${user.token}`,
                "Content-type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ _id: user.user._id })
        })
        const data = await resp.json();
        if (resp.ok) {
            setInitialUpvote(data.updatedBlog.upvoteCount);
            dispatch({ type: data.currentState === 'liked' ? 'INCREMENT' : 'DECREMENT', payload: data.updatedBlog });

        }

    }
    const handleUpvote = async () => {
        await updateUpvote();
    }
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert(`Copied: ${text}`);
      };
    const BtnStyle = {
        color: '#fff',
        padding: '5px 10px',
        width: '65px',
        borderBottom: 'none',
        borderRadius: '6px',
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: 'Poppins',
        cursor: 'pointer',
        border: "none",
        outline: "none"
    }
    return (
        <>
            <div className='posted__blogs'>
                <img src={blog.eventImage} width='20%' height='20%' alt={blog.title.length > 10 ? blog.title.slice(0, 10) + '...' : blog.title} style={{ borderRadius: '8px', boxShadow: '0px 0px 4px #ccc' }} />
                <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column', width: '43vw' }}>
                    <div className='blog_title__container'>
                        <h2 className='blog__post__title'>{blog.title.length > 100 ? blog.title.slice(0, 100) + '...' : blog.title}</h2>
                    </div>
                    <Share onClick={() => copyToClipboard(`/blog/${blog._id}`)} />
                    <div className='blog__post__description'>{blog.description.length > 150 ? blog.description.slice(0, 150) + '...' : blog.description}</div>
                    <div className='post__informations'>
                        <div className='post__author__name'> <p>{blog.author.length > 40 ? blog.author.slice(0, 40) + '...' : blog.author}</p></div>
                        <div className='post__reach'>
                            <button className='upvote_btn' style={{ display: 'flex', alignItems: 'center', gap: '.3rem' }} onClick={handleUpvote} >{clicked ? <ThumbUp /> : <ThumbUpOffAlt />} {upvoteVal}</button>
                            <NavLink name='read__more__btn' to={`/blog/${blog._id}`} className='read__more__btn' style={{ ...BtnStyle, backgroundColor: "#2d2c39", fontSize: '.8rem', width: '95px', textDecoration: 'none' }} >READ MORE</NavLink>
                            <div className='blog_post_date' style={{ color: 'rgb(135 143 159 / 80%)', textTransform: 'capitalize', fontWeight: '600' }}>{formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })}</div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default FeedBlog