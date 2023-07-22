import React, { useState } from 'react'
// import { NavLink, useNavigate } from 'react-router-dom';
import { CloudUpload, Done } from '@mui/icons-material';
import '../../styles/writeblog.css'
import { useBlogsContext } from '../../hooks/useBlogsContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import ErrorIcon from '@mui/icons-material/Error';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ContentState, convertToRaw, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import apiConfig from '../../api.config';


const WriteBlog = () => {
    const { user } = useAuthContext();
    const [title, setTitle] = useState('');
    const _contentState = ContentState.createFromText('');
    const raw = convertToRaw(_contentState);  // RawDraftContentState JSON
    const [contentState, setContentState] = useState(raw); // ContentState JSON
    const [description, setDescription] = useState('');
    const [eventImage, setEventImage] = useState();
    const [author, setAuthor] = useState('');
    const { dispatch } = useBlogsContext();
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    console.log(contentState);
    const handleBlog = (event) => {
        setDescription(contentState.blocks[0].text);
    }
    function readFileDataAsBase64(e) {
        const file = e.target.files[0];
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (event) => {
                resolve(event.target.result);
            };

            reader.onerror = (err) => {
                reject(err);
            };

            reader.readAsDataURL(file);
        });
    }
    const handleImg = async (e) => {
        const data = await readFileDataAsBase64(e);
        setEventImage(data);
        console.log(data);
    }
    const PostBlogData = async (event) => {
        event.preventDefault();
        // const { title, description, author } = blog;
        try {
            const resp = await fetch(apiConfig.URL + '/blogapi/addblog', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ title, description,eventImage, author })
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
                setEventImage('');
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
    const labelStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid #ccc',
        padding: '20px',
        color: '#ccc',
        borderRadius: '8px',
        width: '80vw'
    }

    return (
        <>
            <div className='content__container'>
                <h1 style={{ color: '#6d7993', fontFamily: 'Poppins' }}>Create Your Blog</h1>
                <form method='POST' className='field__container' aria-label='Create Blog form'>
                    <div className='title_container'>
                        <p>Title:</p>
                        <input type='text' placeholder='Give a Title' name='title' onChange={(e) => setTitle(e.target.value)} value={title} required aria-required="true" aria-label="Give a title"/>
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
                            ariaLabel='Write blog description'
                        />
                    </div>
                    <div className='blog__image__container'>
                        <p>Blog Image:</p>
                        <div className='image__container' style={eventImage ? { display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '1px auto', height: '525px' } : { display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '1px auto' }}>
                            <input type="file" id="img" className='blog__img__upload' accept="application/jpg" style={{ display: 'none' }} onChange={handleImg} />
                            <label for='img' style={labelStyle}><CloudUpload className='info__icon' />Upload a descriptive image</label>
                            {/* {eventImage && <p style={{ textAlign: 'left', border: '1px solid #ccc', borderRadius: '6px', padding: '5px', marginTop: '5px', width: '25vw', backgroundColor: '#6d799342' }}>{imgName}</p>} */}
                            {eventImage && <img src={eventImage} alt="img" width='80%' height='70%' style={{ borderRadius: "20px", margin: "20px auto" }} />}

                        </div>

                    </div>
                    <div className='author__container'>
                        <p>Author:</p>
                        <input type='text' placeholder='Author name ' name='author' onChange={(e) => setAuthor(e.target.value)} value={author}  required aria-required="true" aria-label="Enter Author's name"/>
                    </div>
                    {error && <div className="error" role="alert"><ErrorIcon fontSize='small' /> {error}</div>}
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