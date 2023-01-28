import React from 'react'
import PostAddIcon from '@mui/icons-material/PostAdd';

const BlogCard = ({ blog }) => {
    return (
        <>
            <div className='posted__blogs'>
                <div className='blog_title__container'>
                    <h2 className='blog__post__title'>{blog.title}</h2>
                </div>
                <div className='blog__post__description'>{blog.description}</div>
                <div className='post__informations'>
                    <div className='post__author__name'> <p>{blog.author}</p></div>
                    <div className='post__reach'>
                        <button className='upvote_btn'><PostAddIcon /></button>
                        <div className='blog_post_date' style={{ color: '#6d7993cc' }}>26-01-2023</div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default BlogCard