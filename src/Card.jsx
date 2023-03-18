import React from "react";
import "./Card.css";

export default function Card(props){
    const mapCriteria = `${props.name}/@${props.lat},${props.lon},12z`
    const mapUrl = `https://www.google.com/maps/search/${mapCriteria}`
    return(
        <div className = "card">
            <p className = "card__name">{props.name}</p>
            <p className = "card__loc">{props.city}, {props.state}</p>
            <div className = "card__icon-container">
                {props.url? <a className = "card__web" href = {props.url} 
                target = "_blank"><img src = "/images/iconmonstr-link-1-32.png"
                alt = "Brewery website link"></img></a> : "" }
                <a className = "card__map" href = {mapUrl} target = "_blank">
                    <img src = "/images/iconmonstr-map-8-32.png"
                    alt = "Google Maps link"></img>
                </a>
            </div>
        </div>
    );
};