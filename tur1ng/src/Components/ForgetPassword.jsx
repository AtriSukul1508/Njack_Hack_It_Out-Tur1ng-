import React, { useState } from 'react'
import PersonIcon from '@mui/icons-material/Person';
import { Lock } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import '../styles/login.css'
import ErrorIcon from '@mui/icons-material/Error';
const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const verifyAndPostEmail = async (event) => {
        event.preventDefault();
    }

    return (
        <>
            <div className='credentials__container'>
                <div className='container_reset__pass'>
                    <div className='heading_line' style={{ textAlign: 'center' }}>
                        <h1 className='heading_title'>Tur<span>1</span>ng<span>_</span></h1>
                        <h2 style={{ fontFamily: 'Poppins', margin: '.8rem 0' }} >Reset Password</h2>
                    </div>
                    <form method='POST' className='reset__pass__info'>
                        <p style={{ fontFamily: 'cursive', marginBottom: '1rem', color: '#2d2c39' }}>Enter the email associated with your account</p>
                        <div className='reset__pass_credentials'>
                            <div className='user_email_field info_field'>
                                <PersonIcon className='info_icon' />
                                <input type='email' name='email' autoComplete='off' placeholder='Confirm your mail ID' onChange={(e) => setEmail(e.target.value)} id='reset__pass_user_mail' style={{ border: '1px solid #6d7993', borderRadius: '8px', paddingBottom: '10px' }} value={email} />
                            </div>
                        </div>

                        {error && <div className="error"><ErrorIcon fontSize='small' /> {error}</div>}
                        <div className='btns_submit'>
                            <input type='submit' name='confirm_email' className='confirm_email__btn' id='confirm_email__btn' onClick={verifyAndPostEmail} value='Confirm Email' disabled />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ForgetPassword