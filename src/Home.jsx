import React from "react";
import { useState } from "react";
import "./Home.css";
import Card from "./Card";

export default function Home() {

    const [aboutSection, setAboutSection] = useState(true);
    const [error, setError] = useState(false);
    const [search, setSearch] = useState("");
    const [breweryResults, setBreweryResults] = useState([]);

    var currentYear = new Date().getFullYear();

    const renderAbout = () => {
        setAboutSection(true);
        setError(false);
        setBreweryResults([]);
    }
    
    const breweryData = (input) => {
        fetch (`https://api.openbrewerydb.org/breweries?by_city=${input}`)
            .then(res => res.json())
            .then(data => renderData(data))
    };
    
    const handleKeyDown = (event) => {
        if (event.key === "Enter"){
            setAboutSection(false);
            breweryData(event.target.value);
            setSearch("");
            event.target.blur();
        };
    };

    const storeSearch = (event) => {
        setSearch(event.target.value);
    };

    const clearSearch = () => {
        setSearch("");
    };

    const renderData = (data) => {
        if (data.length === 0){
            setError(true);
        }else {
            setError(false)
            setBreweryResults(data.map(brewery => {
                return(<Card 
                    key = {brewery.id}
                    name = {brewery.name}
                    city = {brewery.city}
                    state = {brewery.state}
                    url = {brewery.website_url}
                    lat = {brewery.latitude}
                    lon = {brewery.longitude}
                />)
            }));
        };
    };

    return(
        <div className = "home">
            <nav id = "nav-bar">
                <div className = "nav-bar__box">
                    <p id = "nav-bar__title">Brewery Finder</p>
                </div>
                    <div id = "nav-bar__search-container">
                        <img id = "search__icon" src = "/images/iconmonstr-magnifier-2-16.png"
                        alt = "Search icon"></img>
                        <input type = "text" id = "nav-bar__search" 
                        placeholder = "Enter your city here"
                        aria-label = "Enter your city here"
                        onKeyDown = {handleKeyDown}
                        onChange = {storeSearch}
                        value = {search}>
                        </input>
                        <img id = {search != "" ? "clear__button" : "clear__button-inactive"} 
                        src = "/images/iconmonstr-x-mark-2-12.png"
                        alt = "Clear search text button"
                        onClick = {clearSearch}>
                        </img>
                    </div>
                <div className = "nav-bar__box">
                    <a id = "nav-bar__about" onClick = {renderAbout}>About</a>
                </div>
            </nav>
            <div className = "home__content-container">
                {aboutSection ?
                <div id = "home__content-about">
                    <h1>Welcome to Brewery Finder</h1>
                    <p>
                        The mission of Brewery Finder is to support the brewing 
                        industry by helping its users find breweries local to them.
                    </p>
                    <p>To use this application, please enter your location 
                        (city, town or village) into the search bar above and 
                        hit enter!!!
                    </p>
                    <div id = "home__button-container">
                        <p>Don't see your brewery listed?</p>
                        <a href = "https://github.com/MechEng-27/Brewery-Finder"
                        target = "_blank">
                        <button className = "home__button">
                            Contact Us
                            </button>
                        </a>
                    </div>
                    <a id = "home__hyperlink" href = "https://www.openbrewerydb.org/"
                    target = "_blank">
                        Powered by Open Brewery DB
                    </a>
                </div>: ""}
                {error ?
                <div id = "error__msg">
                    <p>Unable to find a matching result.</p>
                    <p>Please check your entry and try again.</p>
                </div>: <div className = "home__content-cards">
                    {[breweryResults]}
                </div>}
        </div>
        <footer id = "footer">
            <p>Brewery Finder {currentYear}</p>
        </footer>
    </div>
);
};