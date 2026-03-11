import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./tmdb";
import "./Banner.css"

export default function Banner(){
    const [movie, setMovie] = useState(null)
    const navigate = useNavigate()
    const [inList, setInList] = useState(false)

    useEffect(() => {
        if(!movie) return

        const saved = JSON.parse(localStorage.getItem("myList")) || []
        const exist = saved.find(item => item.id === movie.id)

        if(exist){
            setInList(true)
        }else{
            setInList(false)
        }
    }, [movie])

    const toggleMylist = () => {
        const saved = JSON.parse(localStorage.getItem("myList")) || []

        if(inList){
            const updated = saved.filter(item => item.id !== movie.id)
            localStorage.setItem("myList", JSON.stringify(updated))
            setInList(false)
        }else{
            const updated = [...saved, movie]
            localStorage.setItem("myList", JSON.stringify(updated))
            setInList(true)
        }
    }

    useEffect(() => {
        async function loadBannerMovie() {
            const response = await api.get("/trending/movie/week")
            const results = response.data.results;
            const randomMovie = results[Math.floor(Math.random() * results.length)]
            setMovie(randomMovie)
        }

        loadBannerMovie()

        const interval = setInterval(() => {
            loadBannerMovie()
        }, 10000)

        return () => clearInterval(interval)
    }, [])

    if(!movie) return null

    return(
        <header className="banner" 
        style={{ backgroundSize: "cover", 
        backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
        backgroundPosition: "center center",}}>
            <div className="banner-content">
                <h1 className="banner-title">{movie.title || movie.name}</h1>
                <p className="banner-description">{movie.overview}</p>
                <div className="banner-buttons">
                    <button className="banner-button" onClick={() => navigate(`/details/${movie.media_type === "tv" ? "tv" : "movie"}/${movie.id}`)}>Assistir</button>
                    <button className="banner-button" onClick={toggleMylist}>{inList ? "Remover" : "Minha lista"}</button>     
                </div>
            </div>
            <div className="banner-fade"></div>
        </header>
    )
}

/*
useEffect(() => {
        async function loadBannerMovie() {
            const response = await api.get("/trending/movie/week")
            const results = response.data.results;
            const randomMovie = results[Math.floor(Math.random() * results.length)]
            setMovie(randomMovie)
        }
        loadBannerMovie()
    }, [])

    backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
*/