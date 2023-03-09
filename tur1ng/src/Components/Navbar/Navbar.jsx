import React, { useState } from 'react'
import { Feed, AddBox, FilterNone, Search, Logout } from '@mui/icons-material'
import { NavLink, useNavigate } from 'react-router-dom';
import '../../styles/navbar.css';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useLogout } from '../../hooks/useLogout';
import { Avatar } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Profile from '../UserProfile/Profile';
const Navbar = () => {
    const { user } = useAuthContext();
    const { logout } = useLogout();
    const [open, setOpen] = useState(false);
    const handleLogout = () => {
        setOpen(true);
    }
    const handlePermission = () => {
        setOpen(false);
        logout();
    }
    const handleClose = () => {
        setOpen(false);
    }
    const [showProfilePage, setShowProfilePage] = useState(false);
    const navigate = useNavigate();

    // console.log("user id: ",user.id);
    const handleProfileClick = () => {
        setShowProfilePage(!showProfilePage);
        const url = '/profile';
        console.log('Generated URL:', url);
        navigate(url);
    };
    // console.log(user.user.image)
    return (
        <>
            <div className='navbar'>
                <div style={{ display: 'flex', alignItems: 'center', gap: '.8rem' }}>
                    <h1 className='heading_title'><NavLink style={{ textDecoration: 'none' }} to='/'>Tur<span>1</span>ng<span>_</span></NavLink></h1>
                    <NavLink title='Blog Feed' classname={({ isActive }) => isActive ? 'active' : "non_active_class home_btn"} style={({ isActive }) => isActive ? { color: '#6d7993' } : { color: '#000' }} to='/' end><Feed className='wrk-btn' /></NavLink>
                    <NavLink title='Post Your Blog' className={({ isActive }) => isActive ? 'active' : 'non_active_class write_btn'} to='/addblog'><AddBox className='wrk-btn' /></NavLink>
                    <NavLink title='Your Blogs' className={({ isActive }) => isActive ? 'active' : 'non_active_class user_blogs'} to='/userallblog'><FilterNone className='wrk-btn' /></NavLink>
                </div>
                <div className='navbar_btns'>
                    <div className='search_bar_container'>
                        <Search className='search_icon' />
                        <input type='search' placeholder='Search...' name='search_bar' />
                    </div>

                    {/* <div className='profile_name'>
                        {user ? <NavLink to={`/profile/${user.user._id}`} ><Avatar src={user.user.image} alt={user.user.name} /></NavLink> : <><Avatar alt="No_image" /></>}
                        <p>{user ? user.user.name : 'Hello'}</p>
                        <button onClick={handleLogout} className='logout__btn' ><Logout fontSize='small' /> LogOut</button>
                    </div> */}
                    <div className="profile_section">
                        <div className='profile_name' style={{cursor:'pointer'}} onClick={handleProfileClick}>
                            {user ? (
                                <div>
                                    <Avatar src={user.image} alt={user.name} />
                                </div>
                            ) : (
                                <Avatar alt="No_image" />
                            )}
                            {/* <p style={{marginTop:'15px'}}>{user ? user.name : ''}</p> */}
                            <button onClick={handleLogout} className='logout__btn'>
                                <Logout fontSize='small' /> LogOut
                            </button>
                        </div>
                    </div>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description" style={{ color: '#2d2c39', fontFamily: 'Poppins' }}>
                                Are you sure, you want to log out?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} autoFocus>Cancel</Button>
                            <Button onClick={handlePermission} style={{ color: '#e04e4e' }}>Logout</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        </>
    )
}

export default Navbar