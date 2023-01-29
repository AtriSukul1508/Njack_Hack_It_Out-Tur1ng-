import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { Done } from '@mui/icons-material';
import '../styles/writeblog.css'
import { useBlogsContext } from '../hooks/useBlogsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import ErrorIcon from '@mui/icons-material/Error';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ContentState, convertToRaw, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


const WriteBlog = () => {
    const { user } = useAuthContext();
    const [title, setTitle] = useState('');
    const _contentState = ContentState.createFromText('');
    const raw = convertToRaw(_contentState);  // RawDraftContentState JSON
    const [contentState, setContentState] = useState(raw); // ContentState JSON
    const [description, setDescription] = useState('');
    const [author, setAuthor] = useState('')

    const { dispatch } = useBlogsContext();
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    console.log(contentState);
    const handleBlog = (event) => {
        setDescription(contentState.blocks[0].text);
    }
    const PostBlogData = async (event) => {
        event.preventDefault();
        // const { title, description, author } = blog;
        try {
            const resp = await fetch('/blogapi/addblog', {
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
                setTitle('');
                setAuthor('');
                console.log('data-', data);
                dispatch({ type: 'CREATE_BLOG', payload: data })
                toast.success('Blog created Successfully', {
                    position: toast.POSITION.BOTTOM_RIGHT

                });
            }
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
                        <input type='text' placeholder='Give a Title' name='title' onChange={(e) => setTitle(e.target.value)} value={title} />
                    </div>
                    <div className='blog__content' >
                        <p>Description:</p>
                        <Editor
                            defaultContentState={contentState}
                            onContentStateChange={setContentState}
                            wrapperClassName="wrapper-class"
                            editorClassName="editor-class"
                            toolbarClassName="toolbar-class"
                            placeholder='Write your blog'
                            onChange={handleBlog}
                        />
                    </div>
                    <div className='author__container'>
                        <p>Author:</p>
                        <input type='text' placeholder='Author name ' name='author' onChange={(e) => setAuthor(e.target.value)} value={author} />
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