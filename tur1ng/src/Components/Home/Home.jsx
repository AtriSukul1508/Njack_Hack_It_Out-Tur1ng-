import React, { useState } from 'react';
import '../../styles/home.css';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useLogout } from '../../hooks/useLogout';
import { ToastContainer, toast } from 'react-toastify';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Footer from '../Footer/Footer';
import { Container } from '@mui/system';
import SuggestionSlide from './SuggestionSlide';
import TopPick from './TopPick';

const Home = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const [open, setOpen] = useState(false);
  // const isTokenExpired = (token) => {
  //   const payloadBase64 = token.split('.')[1];
  //   const decodedJson = atob(payloadBase64)
  //   const decoded = JSON.parse(decodedJson)
  //   const exp = decoded.exp;
  //   const expired = (Date.now() >= exp * 1000)
  //   return expired
  // }

  // const handlePermission = () => {
  //   setOpen(false);
  //   logout();
  // }
  // if (isTokenExpired(user.token)) {
  //   setOpen(true);
  //   toast.error("Token expired", {
  //     position: toast.POSITION.BOTTOM_RIGHT

  //   });
  // }
  return (
    <div className='home'>
        {/* <HomeLeftComponent /> */}
        <SuggestionSlide />
        <TopPick />
        {/* <HomeRightComponent /> */}
        {/* <ToastContainer /> */}
      {/* <Dialog
          open={open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogTitle style={{color:'#000',fontWeight:'bold'}}>{"Whoops, Your session has expired"}</DialogTitle>
            <DialogContentText id="alert-dialog-description" style={{textAlign:'center', color: '#2d2c39', fontFamily: 'Poppins' }}>
              No Worry,simply login again
            </DialogContentText>
          </DialogContent>
          <DialogActions  style={{display:'flex',justifyContent:'center',marginBottom:'.8rem'}}>
            <Button onClick={handlePermission} style={{ color: '#fff',background:'#6d7993',borderRadius:'8px',padding:'4px 8px' }}>Login</Button>
          </DialogActions>
        </Dialog> */}
      {/* <Footer className="home-footer" /> */}
    </div>
  )
}

export default Home