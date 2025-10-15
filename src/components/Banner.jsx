import React, { useEffect, useState } from "react";
import api from "./tmdb";
import "./Banner.css"

export default function Banner(){
    const [movie, setMovie] = useState(null)

    useEffect(() => {
        async function loadBannerMovie() {
            const response = await api.get("/trending/movie/week")
            const results = response.data.results;
            const randomMovie = results[Math.floor(Math.random() * results.length)]
            setMovie(randomMovie)
        }
        loadBannerMovie()
    }, [])

    if(!movie) return null

    return(
        <header className="banner" 
        style={{ backgroundSize: "cover", 
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        backgroundPosition: "center center",}}>
            <div className="banner-content">
                <h1 className="banner-title">{movie.title || movie.name}</h1>
                <p className="banner-description">{movie.overview}</p>
                <div className="banner-buttons">
                    <button className="banner-button">Assistir</button>
                    <button className="banner-button">Minha lista</button>
                </div>
            </div>
            <div className="banner-fade"></div>
        </header>
    )
}