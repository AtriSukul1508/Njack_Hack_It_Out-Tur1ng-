import React, { useCallback, useState, useEffect } from 'react'
import { Lock, Person, Email, Call, Image, CloudUpload } from '@mui/icons-material';
import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/signup.css'
import '../styles/login.css'
import { useSignup } from '../hooks/useSignup';
import ErrorIcon from '@mui/icons-material/Error';
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

const SignUp = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [image, setImg] = useState();
    const [imgName, setImgName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    const { signup, error, isLoading } = useSignup();

    const verifyAndPostData = async (event) => {
        event.preventDefault();
        await signup(name,image, email, phone, password, cpassword);
    }
    function readFileDataAsBase64(e) {
        const file = e.target.files[0];
        setImgName(e.target.files[0].name)
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
        setImg(data);
        console.log(data);
    }
    const labelStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid #6d7993',
        padding: '10px',
        color: '#ccc',
        borderRadius: '8px',
        width: '25vw'
    }

    function showHidePW() {
        const pw = document.getElementById("user_password");
        const pwIcon = document.getElementById("pw_icon");
        if (pw.type === "password") {
          pw.type = "text";
          pwIcon.style.color = "#000";
        } else {
          pw.type = "password";
          pwIcon.style.color = "#ccc";
        }
    }

    function showHideCPW() {
        const cpw = document.getElementById("user_cpassword");
        const cpwIcon = document.getElementById("cpw_icon");
        if (cpw.type === "password") {
          cpw.type = "text";
          cpwIcon.style.color = "#000";
        } else {
          cpw.type = "password";
          cpwIcon.style.color = "#ccc";
        }
    }

    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);

    return (
        <>
            <div className='info__container'>
                <div className='signup__container'>
                    <div className='heading_line' style={{ textAlign: 'center' }}>
                        <h1 className='heading_title'>Tur<span>1</span>ng<span>_</span></h1>
                        <h2 style={{ fontFamily: "'Trebuchet MS", margin: '.8rem 0' }} >Create Your Account</h2>
                    </div>
                    <form method='POST' className='user_acc_info' aria-label="Sign up form">
                        <div className='acc__credentials'>
                            <div className='user_name_field info_field'>
                                <Person className='info_icon' />
                                <input type='text' autoComplete='off' placeholder='Enter your name' name='name' onChange={(e) => setName(e.target.value)} value={name} required aria-required="true" aria-label="Enter your name"/>
                            </div>
                            <div className='user_image_field info_field' style={{ display: 'flex', flexDirection: 'column' }}>
                                <input type="file" id="img" className='profile__img__upload' accept="application/jpg" style={{ display: 'none' }} onChange={handleImg} />
                                <label for='img' style={labelStyle}><CloudUpload className='info__icon' style={{ color: '#6d7993' }} />Upload your profile picture</label>
                                {image && <p style={{textAlign:'left',border:'1px solid #ccc',borderRadius:'6px',padding:'5px',marginTop:'5px',width:'25vw',backgroundColor:'#6d799342'}}>{imgName}</p>}
                            </div>
                            <div className='user_email_field info_field'>
                                <Email className='info_icon' />
                                <input type='email' autoComplete='off' placeholder='Enter your mail ID' name='email' onChange={(e) => setEmail(e.target.value)} value={email} required aria-required="true" aria-label="Enter your email"/>
                            </div>
                            <div className='user_number_field info_field'>
                                <Call className='info_icon' />
                                <input type='number' autoComplete='off' placeholder='Enter your Phone number' name='phone' onChange={(e) => setPhone(e.target.value)} value={phone} required aria-required="true" aria-label="Enter your phone number"/>
                            </div>
                            <div className='user_password_field info_field'>
                                <Lock className='info_icon' />
                                <input type='password' autoComplete='off' placeholder='Enter your password' name='password' id='user_password' onChange={(e) => setPassword(e.target.value)} value={password} required aria-required="true" aria-label="Enter your password"/>
                                {showPassword ? (
                                    <AiFillEye
                                        size={20}
                                        onClick={() => {
                                        setShowPassword(!showPassword);
                                        showHidePW();
                                        }}
                                        id="pw_icon"
                                        aria-label={showPassword ? "Hide Password" : "Show Password"}
                                    />
                                ) :  (
                                    <AiFillEyeInvisible
                                        size={20}
                                        onClick={() => {
                                        setShowPassword(!showPassword);
                                        showHidePW();
                                        }}
                                        id="pw_icon"
                                        aria-label={!showPassword ? "Hide Password" : "Show Password"}
                                    />
                                ) }
                            </div>
                            <div className='user_cpassword_field info_field'>
                                <Lock className='info_icon' />
                                <input type='password' autoComplete='off' placeholder='Re-enter your password' name='cpassword' id='user_cpassword' onChange={(e) => setCPassword(e.target.value)} value={cpassword}  required aria-required="true" aria-label="Re-enter your password"/>
                                {showCPassword ? (
                                    <AiFillEye
                                        size={20}
                                        onClick={() => {
                                        setShowCPassword(!showCPassword);
                                        showHideCPW();
                                        }}
                                        id="cpw_icon"
                                        aria-label={showPassword ? "Hide Password" : "Show Password"}
                                    />
                                ):(
                                    <AiFillEyeInvisible
                                        size={20}
                                        onClick={() => {
                                        setShowCPassword(!showCPassword);
                                        showHideCPW();
                                        }}
                                        id="cpw_icon"
                                        aria-label={!showPassword ? "Hide Password" : "Show Password"}
                                    />
                                )}
                            </div>
                            {/* <div className='user_cpassword_field info_field'>
                                <Lock className='info_icon' />
                                <input type='password' autoComplete='off' placeholder='Re-enter your password' name='cpassword'id='user_cpassword' onChange={(e) => setCPassword(e.target.value)} value={cpassword} />
                                {showCPassword ? (
                                    <AiFillEyeInvisible
                                        size={20}
                                        onClick={() => {
                                        setShowCPassword(!showCPassword);
                                        showHideCPW();
                                        }}
                                        id="cpw_icon"
                                    />
                                    ) : (
                                    <AiFillEye
                                        size={20}
                                        onClick={() => {
                                        setShowCPassword(!showCPassword);
                                        showHideCPW();
                                        }}
                                        id="cpw_icon"
                                    />
                                )}
                            </div> */}
                        </div>
                        {error && <div className="error" role="alert"><ErrorIcon fontSize='small' /> {error}</div>}
                        <div className='btns_submit'>
                            <input type='submit' name='signup__btn' className='signup__btn' id='signup__btn' onClick={verifyAndPostData} value='Sign Up' role='button'/>
                            <p className='mt-3' style={{ color: '#000' }}>Already have an account? <NavLink style={{ textDecoration: 'none', color: '#465370', fontWeight: 'bold' }} to='/login'>Log In</NavLink></p>
                        </div>
                    </form>

                </div>
            </div>
        </>
    )
}

export default SignUp