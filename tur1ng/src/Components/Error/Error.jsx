import React from 'react'
import { NavLink } from 'react-router-dom'

const Error = () => {
  return (
    <>
      <div className='error-page' style={{width:'100%',height:"100vh",display:"flex",justifyContent:'center',alignItems:'center'}}>
        <div className='error-div' style={{display:"flex",flexDirection:"column",alignItems:'center',gap:'.9rerm'}}>
          <h1 style={{fontSize:"3.5rem",fontWeight:"bold",fontStyle:"italic",color:"#5f75a6"}}>404 !!</h1>
          <p style={{fontFamily:"cursive"}}>The page you're looking for does not exist !!In case you feel lost, click the button below</p>
          <NavLink className='home-page-btn' to='/' style={{color:'white',backgroundColor:"#2d2c39",padding:"10px",borderRadius:"8px",border:"none",outline:"none",textDecoration:"none"}}>Get Back to Home</NavLink>
        </div>
      </div>
    </>
  )
}

export default Error