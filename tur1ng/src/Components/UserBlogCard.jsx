import React, { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext';
import { useBlogsContext } from '../hooks/useBlogsContext';
import format from 'date-fns/format';
import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ErrorIcon from '@mui/icons-material/Error'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserBlogCard = ({ blog }) => {
    const { dispatch } = useBlogsContext();
    const { user } = useAuthContext();
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState(blog.title);
    const [description, setDescription] = useState(blog.description);
    const [author, setAuthor] = useState(blog.author);
    const [error, setError] = useState('');
    const handleDelete = async () => {
        if (!user) {
            return
        }
        try {
            const response = await fetch('/deleteblog/' + blog._id, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const data = await response.json()

            if (response.ok) {
                dispatch({ type: 'DELETE_BLOG', payload: data })
            }

        } catch (err) {
            console.log(`Error while deleting blog`);
        }
    }

    const handleEditPopOver = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
        setError('')
    }
    const handleUpdate = () => {
        const updateBlog = async () => {
            const response = await fetch('/editblog/' + blog._id, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    "Content-type": "application/json",
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ title, description, author })
            })
            const data = await response.json()
            if (!response.ok) {
                setError(data.error);
            }
            if (response.ok) {
                toast.success("Blog Edited Successfully", {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
                dispatch({ type: 'DISPLAY_BLOG', payload: data })
                setError('');
                setOpen(false);
            }
        }
        if (user) {
            updateBlog()
            if (error) {
                setOpen(true);
            }
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
            <form method='POST' className='blog'>
                <div>
                    <h2 style={{ color: '#ff8200', textTransform: 'title' }}>{blog.title}</h2>
                </div>
                <div>
                    <p style={{ fontSize: '1.2rem', fontWeight: '500' }}>{blog.description.length > 450 ? blog.description.slice(0, 450) + '...' : blog.description}</p>
                </div>
                <div className='blog_post_info'>
                    <div className='upvote__n_date'>
                        <p>Upvotes:<span> {blog.upvoteCount}</span> </p>
                        <p>Date: <span>{format(new Date(blog.createdAt), 'd MMM yyyy')}</span></p>
                    </div>
                    <div className='blog_controls'>
                        <NavLink name='read__more__btn' to={`/blog/${blog._id}`} className='read__more__btn' style={{ ...BtnStyle, backgroundColor: "#2d2c39", fontSize: '.8rem', width: '95px', textDecoration: 'none', display: 'flex', alignItems: 'center' }} >READ MORE</NavLink>
                        <NavLink name='edit_btn' id='edit__btn' className='edit__btn' style={{ ...BtnStyle, backgroundColor: '#24a0ed', textDecoration: 'none' }} onClick={handleEditPopOver} >EDIT</NavLink>
                        <NavLink name='dlt_btn' id='dlt__btn' className='dlt__btn' style={{ ...BtnStyle, backgroundColor: 'rgb(247 46 63)' ,textDecoration:'none'}} onClick={handleDelete}>DELETE</NavLink>
                    </div>
                </div>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle style={{ fontFamily: 'Poppins', fontWeight: 'bold', color: 'rgb(69, 150, 182)' }} >Edit your blog</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Title"
                            type='text'
                            name='title'
                            fullWidth
                            variant="standard"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Write your blog"
                            type="text"
                            name='description'
                            fullWidth
                            variant="standard"
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Author Name"
                            type="text"
                            name='author'
                            fullWidth
                            variant="standard"
                            onChange={(e) => setAuthor(e.target.value)}
                            value={author}
                        />
                    </DialogContent>
                    {error && <DialogContentText className='error' style={{
                        width: '50%',
                        padding: '3px 7px',
                        background: '#fbe7e7',
                        border: '1px solid #f09191',
                        color: '#f60c0cab',
                        borderRadius: '4px',
                        margin: '20px auto',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                    }}><ErrorIcon fontSize='small' /> {error}</DialogContentText>}
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleUpdate}>Save</Button>
                        <ToastContainer/>
                    </DialogActions>
                </Dialog>
            </form>
        </>
    )
}

export default UserBlogCard