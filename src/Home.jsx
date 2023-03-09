import React from "react";
import { useState } from "react";
import "./Home.css";
import Card from "./Card";

export default function Home() {

    const [error, setError] = useState(false);
    const [breweryResults, setBreweryResults] = useState([]);
    
    const breweryData = (input) => {
        fetch (`https://api.openbrewerydb.org/breweries?by_city=${input}`)
            .then(res => res.json())
            // .then(data => console.log(data))
            .then(data => renderData(data))
    };
    
    const handleKeyDown = (event) => {
        if (event.key === "Enter"){
            breweryData(event.target.value)
        };
    };
    
    const renderData = (data) => {
        const dataArray = [];
        if (data.length === 0){
            setError(true)
        }else {
            setError(false)
            setBreweryResults(data.map(brewery => {
                return(<Card 
                    key = {brewery.id}
                    name = {brewery.name}
                    street = {brewery.street}
                    city = {brewery.city}
                    state = {brewery.state}
                />)
            }));
        };
    };

    return(
        <div className = "home">
            <nav className = "nav-bar">
                <input type = "text" id = "nav-bar__search" 
                placeholder = "Enter your city here"
                onKeyDown={handleKeyDown}>
                </input>
            </nav>
            <div className = "home__content-container">
                <div className = "home__content-cards">
                {error ? <p>there is an error</p> : [breweryResults] }
                </div>
            </div>
            <footer id = "footer"></footer>
        </div>
    );
};

