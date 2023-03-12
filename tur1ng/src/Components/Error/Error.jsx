import React from "react";
import "../../styles/error.css";
import error from "../../Assets/turing-error.png";
import { NavLink } from "react-router-dom";

const Error = () => {
    return(
        <div className="erro">
            <div className="erro-content">
                <h5>Ooopsss Something Went Wrong !!!</h5>
                <h1>Error 404</h1>
                <h5>Hey Buddy, looks like you've a page that doesn't exist.</h5>
                <NavLink to="/"><button>Go Button</button></NavLink>
            </div>

            <div className="logo-set">
            <img className="erro-logo" src={error} alt="error-logo" />
            <div class="home__shadow"></div>
            </div>
        </div>
    );
};

export default Error;