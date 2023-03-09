import React from "react";
import "./Card.css";

export default function Card(props){
    return(
        <div className = "card">
            <p>{props.name}</p>
            <p>{props.street}</p>
            <p>{props.city}, {props.state}</p>
        </div>
    );
};