import React,{ useEffect} from "react";
import loading from '../Assets/preloader.gif';
import '../styles/preloader.css'

const Spinner=()=>{
    return(
        <img id="preloader" src={loading} alt="" />
    )
}

export default Spinner