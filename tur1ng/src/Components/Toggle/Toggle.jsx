import React from "react";
import { ReactComponent as Sun } from "../../Assets/Sun.svg";
import { ReactComponent as Moon } from "../../Assets/Moon.svg";
import "../../styles/toggle.css";

const Toggle = () => {
    const setDarkTheme = () => {
        document.querySelector("body").setAttribute("data-theme", "dark");
        localStorage.setItem("mode", "dark")
    };

    const setLightTheme = () => {
        document.querySelector("body").setAttribute("data-theme", "light");
        localStorage.setItem("mode", "light")
    };

    const mode= localStorage.getItem("mode");

    if(mode === "dark"){
        setDarkTheme();
    }

    const toggleTheme = (e) => {
        if (e.target.checked) setDarkTheme();
        else setLightTheme();
    };
    return (
        <div className='dark_mode'>
            <input
                className='dark_mode_input'
                type='checkbox'
                id='darkmode-toggle'
                onChange={toggleTheme}
                defaultChecked={mode === "dark"}
            />
            <label className='dark_mode_label' for='darkmode-toggle'>
                {/* <Sun />
                <Moon /> */}
            </label>
        </div>
    );
};

export default Toggle;