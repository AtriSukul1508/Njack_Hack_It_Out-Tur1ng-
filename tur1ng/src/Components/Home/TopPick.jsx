import React from "react";
import "../../styles/toppick.css";
import { pickData } from "./pickData";

const TopPick = () => {
    return(
        <div className="pick-container">
            <h1>Top picks of the day</h1>

            {pickData.map((data) =>(
                            <div className="pick-card">
                            <div><img src={data.banner} alt= "logo"/></div>
                            <div className="written-context">
                            <h2>{data.title}</h2>
                            <p>{data.content}</p>
                            <div className="buttons"><button className="name-button">{data.name}</button><button className="like-button">Like 0</button></div>
                            </div>
                            <h6>{data.time}</h6>
                        </div>
            ))}


        </div>
    )
}

export default TopPick;
