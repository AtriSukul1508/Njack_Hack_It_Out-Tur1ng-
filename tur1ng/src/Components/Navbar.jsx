import React from 'react'
import { Feed, AddBox, FilterNone, Search, Logout } from '@mui/icons-material'
import { NavLink } from 'react-router-dom';
import '../styles/navbar.css'
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';
const Navbar = () => {
    const { user } = useAuthContext();
    const { logout } = useLogout();
    const handleLogout = () => {
        logout();
    }
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
                        <p>{user ? user.user.name : ''}</p>
                        <button onClick={handleLogout} className='logout__btn' ><Logout fontSize='small' /> LogOut</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar