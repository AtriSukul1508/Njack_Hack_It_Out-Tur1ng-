import React, { useState } from 'react'
import { Feed, AddBox, FilterNone, Search, Logout } from '@mui/icons-material'
import { NavLink } from 'react-router-dom';
import '../../styles/navbar.css'
import { useAuthContext } from '../../hooks/useAuthContext';
import { useLogout } from '../../hooks/useLogout';
import { Avatar } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
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
    // console.log(user.user.image)
    return (
        <>
            <div className='navbar'>
                <div style={{ display: 'flex', alignItems: 'center', gap: '.8rem' }}>
                    <h1 className='heading_title'><NavLink style={{ textDecoration: 'none' }} to='/'>Tur<span>1</span>ng<span>_</span></NavLink></h1>
                    <NavLink title='Blog Feed' classname={({ isActive }) => isActive ? 'active' : "non_active_class home_btn"} style={({ isActive }) => isActive ? { color: '#6d7993' } : { color: '#000' }} to='/' end><Feed style={{ fontSize: '28px' }} /></NavLink>
                    <NavLink title='Post Your Blog' className={({ isActive }) => isActive ? 'active' : 'non_active_class write_btn'} to='/addblog'><AddBox style={{ fontSize: '28px' }} /></NavLink>
                    <NavLink title='Your Blogs' className={({ isActive }) => isActive ? 'active' : 'non_active_class user_blogs'} to='/userallblog'><FilterNone style={{ fontSize: '28px' }} /></NavLink>
                </div>
                <div className='navbar_btns'>
                    <div className='search_bar_container'>
                        <Search className='search_icon' />
                        <input type='search' placeholder='Search...' name='search_bar' />
                    </div>

                    <div className='profile_name'>
                        {user ? <NavLink to={`/profile/${user.user._id}`} ><Avatar src={user.user.image} alt={user.user.name} /></NavLink> : <></>}
                        <p>{user ? user.user.name : ''}</p>
                        <button onClick={handleLogout} className='logout__btn' ><Logout fontSize='small' /> LogOut</button>
                    </div>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description" style={{ color: '#2d2c39', fontFamily: 'Poppins' }}>
                                Are you sure, You want to log out?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} autoFocus>CANCEL</Button>
                            <Button onClick={handlePermission} style={{ color: '#e04e4e' }}>LOGOUT</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        </>
    )
}

export default Navbar
