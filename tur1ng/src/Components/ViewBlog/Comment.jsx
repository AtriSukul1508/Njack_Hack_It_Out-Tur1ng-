import React, { useState } from 'react'
import '../../styles/viewblog.css'
const Comment = () => {
    const [comment, setComment] = useState('');
    const PostComment = (e) => {
        e.preventDefault();
    }
    return (
        <>
            <div className='comment__container' >
                <h2 className='comment__heading'>Leave a reply</h2>
                <div>
                    <textarea className='comment__input' rows='10' cols='80' placeholder='Write your Comment' value={comment} onChange={(e) => setComment(e.target.value)}>
                    </textarea>
                </div>
                <div>
                    <button name='comment__btn' className='comment__btn' style={{ background: '#2d2c39', color: '#fff', padding: '10px', borderRadius: '8px', outline: 'none', border: 'none', cursor: 'pointer' }} onClick={PostComment}>Post Comment</button>
                </div>
            </div>
        </>
    )
}

export default Comment