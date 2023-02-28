import React, { useEffect, useState } from 'react'
import { ThumbUpOffAlt, ThumbUp } from '@mui/icons-material'
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useUpvoteContext } from '../../../hooks/useUpvoteContext';
import { NavLink } from 'react-router-dom';
import apiConfig from '../../../api.config';
import { useFetchUpvote } from '../../../hooks/useFetchUpvote';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

const FeedBlog = ({ blog }) => {
    const { dispatch } = useUpvoteContext();
    const [initialUpvote, setInitialUpvote] = useState(0);
    const { user } = useAuthContext();
    const { getUpvoteCount, upvoteVal, clicked } = useFetchUpvote();

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
    return (
        <>
            <div className='posted__blogs'>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            component="img"
                            alt={blog.title.length > 10 ? blog.title.slice(0, 10) + '...' : blog.title}
                            height="240"
                            image="https://images.unsplash.com/flagged/photo-1584725739991-3887201dc930?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {blog.title.length > 100 ? blog.title.slice(0, 100) + '...' : blog.title}
                            </Typography>
                            <div className='post__author__name'> <p>{blog.author.length > 40 ? blog.author.slice(0, 40) + '...' : blog.author}</p></div>
                            <Typography variant="body2" color="text.secondary">
                                {blog.description.length > 150 ? blog.description.slice(0, 150) + '..... ' : blog.description}
                                <NavLink style={{color:'gray'}} name='read__more__btn' to={`/blog/${blog._id}`} className='read__more__btn'>read more</NavLink>
                            </Typography>

                        </CardContent>
                        <CardActions>
                            <div className='post__reach'>
                                <button className='upvote_btn' style={{ display: 'flex', alignItems: 'center', gap: '.3rem' }} onClick={handleUpvote} >{clicked ? <ThumbUp /> : <ThumbUpOffAlt />} {upvoteVal}</button>
                                <div className='blog_post_date' style={{ color: 'rgb(135 143 159 / 80%)', textTransform: 'capitalize', fontWeight: '600' }}>1 Day ago</div>
                            </div>
                        </CardActions>
                    </Card>
                </Grid>
            </div>
        </>
    )
}

export default FeedBlog