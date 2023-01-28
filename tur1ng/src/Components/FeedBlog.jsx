import React, { useEffect, useState } from 'react'
import { ThumbUpOffAlt, ThumbUp } from '@mui/icons-material'
import { useAuthContext } from '../hooks/useAuthContext';
import { useUpvoteContext } from '../hooks/useUpvoteContext';
import { NavLink } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';


const FeedBlog = ({ blog }) => {
    const initialLike = JSON.parse(localStorage.getItem(`tur1ng_like-${blog._id}`));
    const { upvote, dispatch } = useUpvoteContext();
    console.log(initialLike)
    const [click, setClick] = useState(initialLike ? true : false);
    const [initialUpvote, setInitialUpvote] = useState(0);
    const { user } = useAuthContext();
    console.log(click)
    useEffect(() => {
        const fetchUpvoteCount = async () => {
            const response = await fetch('/upvote/' + blog._id, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const data = await response.json()

            if (response.ok) {
                setInitialUpvote(data.upvoteCount);
                dispatch({ type: 'DISPLAY_UPVOTE', payload: data.upvoteCount })
                console.log(data);
            }
        }
        if (user) {
            fetchUpvoteCount()
        }
    }, [dispatch,initialLike])
    const updateUpvote = async (factor) => {
        const resp = await fetch('/upvote/' + blog._id, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${user.token}`,
                "Content-type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ factor })
        })
        const data = await resp.json();
        if (resp.ok) {
            dispatch({ type: factor === 1 ? 'INCREMENT' : 'DECREMENT', payload: data });

        }

    }
    const handleUpvote = async () => {
        if (click) {
            setClick(false);
            localStorage.setItem(`tur1ng_like-${blog._id}`, JSON.stringify(false))
            await updateUpvote(-1);
            
        } else {
            localStorage.setItem(`tur1ng_like-${blog._id}`, JSON.stringify(true))
            setClick(true)
            await updateUpvote(1);
        }
    }
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
                <div className='blog_title__container'>
                    <h2 className='blog__post__title'>{blog.title.length > 100 ? blog.title.slice(0, 100) + '...' : blog.title}</h2>
                </div>
                <div className='blog__post__description'>{blog.description.length > 150 ? blog.description.slice(0, 150) + '...' : blog.description}</div>
                <div className='post__informations'>
                    <div className='post__author__name'> <p>{blog.author.length > 40 ? blog.author.slice(0, 40) + '...' : blog.author}</p></div>
                    <div className='post__reach'>
                        <button className='upvote_btn' style={{ display: 'flex', alignItems: 'center', gap: '.3rem' }} onClick={handleUpvote} >{click ? <ThumbUp /> : <ThumbUpOffAlt />} {upvote ? upvote : initialUpvote}</button>
                        <NavLink name='read__more__btn' to={`/blog/${blog._id}`} className='read__more__btn' style={{ ...BtnStyle, backgroundColor: "#2d2c39", fontSize: '.8rem', width: '95px', textDecoration: 'none' }} >READ MORE</NavLink>
                        <div className='blog_post_date' style={{ color: 'rgb(135 143 159 / 80%)',textTransform:'capitalize',fontWeight:'600' }}>{formatDistanceToNow(new Date(blog.createdAt) , {addSuffix :true})}</div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default FeedBlog