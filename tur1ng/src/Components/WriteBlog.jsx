import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { Done } from '@mui/icons-material';
import '../styles/writeblog.css'
import { useBlogsContext } from '../hooks/useBlogsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import ErrorIcon from '@mui/icons-material/Error';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WriteBlog = () => {
  const { user } = useAuthContext();
  const [blog, setBlog] = useState({
    title: "",
    description: "",
    author: ""
  })
  const { dispatch } = useBlogsContext();
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])
  const handleBlog = (event) => {
    const { name, value } = event.target;
    setBlog((prevVal) => { return { ...prevVal, [name]: value } });
    console.log(blog);
  }

  const PostBlogData = async (event) => {
    event.preventDefault();
    const { title, description, author } = blog;
    try {
      const resp = await fetch('/addblog', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title, description, author })
      })
      const data = await resp.json();
      if (!resp.ok) {
        toast.error(data.error, {
          position: toast.POSITION.BOTTOM_RIGHT

        });
        setEmptyFields(data.emptyFields)
      }
      if (resp.ok) {
        setEmptyFields([])
        setError(null)
        setBlog((prevVal) => {
          return {
            title: "",
            description: "",
            author: ""

          }
        });
        console.log('data-', data);
        dispatch({ type: 'CREATE_BLOG', payload: data })
        toast.success('Blog created Successfully', {
          position: toast.POSITION.BOTTOM_RIGHT

        });
      }
      // if (resp.status === 422 || resp.status === 401 || resp.status === 400 || !data) {
      //   console.log(resp.status);
      //   console.log(data);
      //   console.log('Blog addition unsuccessfull');
      //   navigate('/allblog');

      // }
      // else {
      //   console.log("Blog added successfully");
      //   navigate('/allblog');
      // }
    } catch (err) {
      console.log(`Error while saving blog data - ${err}`);
    }
  }

  return (
    <>
      <div className='content__container'>
        <h1 style={{ color: '#6d7993', fontFamily: 'Poppins' }}>Create Your Blog</h1>
        <form method='POST' className='field__container'>
          <div className='title_container'>
            <p>Title:</p>
            <input type='text' placeholder='Give a Title' name='title' onChange={handleBlog} value={blog.title} />
          </div>
          <div className='blog__content'>
            <p>Description:</p>
            <textarea placeholder='Write your blog' name='description' className='blog_description' rows='20' column='10' onChange={handleBlog} value={blog.description}></textarea>
          </div>
          <div className='author__container'>
            <p>Author:</p>
            <input type='text' placeholder='Author name ' name='author' onChange={handleBlog} value={blog.author} />
          </div>
          {error && <div className="error"><ErrorIcon fontSize='small' /> {error}</div>}
          <div className='btns'>
            <input type='submit' name='save__btn' className='save__btn' value='Save' onClick={PostBlogData} />
            <ToastContainer />
          </div>
        </form>

      </div>
    </>
  )
}

export default WriteBlog