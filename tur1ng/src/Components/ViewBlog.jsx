import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CircularProgress } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import { useAuthContext } from '../hooks/useAuthContext'
import { ThumbUp, ThumbUpOffAlt } from '@mui/icons-material';
import format from 'date-fns/format';
import apiConfig from '../api.config'
const ViewBlog = () => {
    const { id } = useParams();
    const { user } = useAuthContext();
    const initialLike = JSON.parse(localStorage.getItem('tur1ng_like'));
    const [click, setClick] = useState(initialLike ? true : false);
    const [blog, setBlog] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [upvote, setUpvote] = useState(0);
    useEffect(() => {
        const fetchABlog = async () => {
            const response = await fetch(apiConfig.URL + '/blogapi/blog/' + id, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const data = await response.json()
            console.log(data);

            if (response.ok) {
                setBlog(data);
                setUpvote(data.upvoteCount)
                setIsLoading(false)
                console.log(data);
            }
        }
        if (user) {
            fetchABlog();
        }
    }, [id])

    return (
        <div
            style={{
                width: '100vw',
                padding: '6rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <div
                style={{
                    width: '80%',
                    maxWidth: '1000px',
                    boxShadow: '2px 2px 20px rgb(0 0 0 / 20%)',
                    borderRadius: '20px',
                    padding: '50px',
                }}
            >
                {isLoading ? (
                    <div
                        style={{
                            // marginTop: '3%',
                            paddingTop: '3%',
                            width: 'fit-content',
                            margin: 'auto',
                            marginBottom: '10%',
                        }}
                    >
                        <CircularProgress />
                    </div>
                ) : (
                    <div
                        style={{
                            margin: ' 4% 5%',
                        }}
                    >
                        <Typography
                            variant="h4"
                            align="center"
                            style={{ fontWeight: '800', textTransform: 'capitalize', color: '#ff8200', fontFamily: 'Poppins' }}
                            color="primary"
                            gutterBottom
                        >
                            {blog.title}
                        </Typography>
                        <hr />
                        <br />
                        <img src={blog.eventImage} width='100%' alt={blog.title.length > 10 ? blog.title.slice(0, 10) + '...' : blog.title} />
                        <br />
                        <hr />
                        <br />
                        <Typography variant="body1" align="left" gutterBottom
                        >
                            {blog.description}
                        </Typography>
                        <hr />
                        <br />
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="body1" align="left" gutterBottom
                                style={{
                                    backgroundColor: '#2d2c39',
                                    color: '#fff',
                                    borderRadius: '15px',
                                    padding: '3px 10px',
                                    width: 'max-content',
                                    fontFamily: 'Poppins'
                                }}
                            >
                                {blog.author}
                            </Typography>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem' }}>
                                <button disabled className='upvote_btn' style={{ display: 'flex', alignItems: 'center', gap: '.3rem', cursor: 'text' }} >{click ? <ThumbUp /> : <ThumbUpOffAlt />} {upvote}</button>
                                <div className='blog_post_date' style={{ color: '#6d7993cc' }}>{format(new Date(blog.createdAt), 'd MMM yyyy')}</div>
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    )
}

export default ViewBlog