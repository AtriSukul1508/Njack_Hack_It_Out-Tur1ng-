import React, { useCallback, useState, useEffect } from 'react'
import { Lock, Person, Email, Call } from '@mui/icons-material';
import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/signup.css'
import '../styles/login.css'
import { useSignup } from '../hooks/useSignup';
import ErrorIcon from '@mui/icons-material/Error';

const SignUp = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    const { signup, error, isLoading } = useSignup();

    const verifyAndPostData = async (event) => {
        event.preventDefault();
        console.log(name, email, phone, password, cpassword)
        await signup(name, email, phone, password, cpassword);
    }

    return (
        <>
            <div className='info__container'>
                <div className='signup__container'>
                    <div className='heading_line' style={{ textAlign: 'center' }}>
                        <h1 className='heading_title'>Tur<span>1</span>ng<span>_</span></h1>
                        <h2 style={{ fontFamily: 'Poppins', margin: '.8rem 0' }} >Create Your Account</h2>
                    </div>
                    <form method='POST' className='user_acc_info'>
                        <div className='acc__credentials'>
                            <div className='user_name_field info_field'>
                                <Person className='info_icon' />
                                <input type='text' autoComplete='off' placeholder='Enter your name' name='name' onChange={(e) => setName(e.target.value)} value={name} />
                            </div>
                            <div className='user_email_field info_field'>
                                <Email className='info_icon' />
                                <input type='email' autoComplete='off' placeholder='Enter your mail ID' name='email' onChange={(e) => setEmail(e.target.value)} value={email} />
                            </div>
                            <div className='user_number_field info_field'>
                                <Call className='info_icon' />
                                <input type='number' autoComplete='off' placeholder='Enter your Phone number' name='phone' onChange={(e) => setPhone(e.target.value)} value={phone} />
                            </div>
                            <div className='user_password_field info_field'>
                                <Lock className='info_icon' />
                                <input type='password' autoComplete='off' placeholder='Enter your password' name='password' onChange={(e) => setPassword(e.target.value)} value={password} />
                            </div>
                            <div className='user_cpassword_field info_field'>
                                <Lock className='info_icon' />
                                <input type='password' autoComplete='off' placeholder='Re-enter your password' name='cpassword' onChange={(e) => setCPassword(e.target.value)} value={cpassword} />
                            </div>
                        </div>
                        {error && <div className="error"><ErrorIcon fontSize='small'/> {error}</div>}
                        <div className='btns_submit'>
                            <input type='submit' name='signup__btn' className='signup__btn' id='signup__btn' onClick={verifyAndPostData} value='Sign Up' />
                            <p className='mt-3' style={{ color: '#000' }}>Already have an account? <NavLink style={{ textDecoration: 'none', color: '#465370', fontWeight: 'bold' }} to='/login'>Log In</NavLink></p>
                        </div>
                    </form>

                </div>
            </div>
        </>
    )
}

export default SignUp