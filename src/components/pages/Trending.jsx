import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import SeriesMoviesCard from "../SeriesMoviesCard";
import "./Trending.css"

function Trending(){
    const [trendingMovies, setTrendingMovies] = useState([])
    const [trendingSeries, setTrendingSeries] = useState([])
    const moviesRowRef = useRef(null)
    const seriesRowRef = useRef(null)

    useEffect(() => {
        const fetchTrending = async () => {
            try{
                const [moviesResponse, seriesResponse] = await Promise.all([
                    axios.get(
                `https://api.themoviedb.org/3/trending/movie/week?api_key=c76bad2263fc16cba9d6e7783c91c00b&language=pt-BR`
                    ),
                    axios.get(
                `https://api.themoviedb.org/3/trending/tv/week?api_key=c76bad2263fc16cba9d6e7783c91c00b&language=pt-BR`
                    ),
                ])

                setTrendingMovies(moviesResponse.data.results)
                setTrendingSeries(seriesResponse.data.results)
            }catch (error){
                console.error("Erro ao buscar tendencias:", error)
            }
        };
        fetchTrending()
    }, [])

    const scrollRow = (ref, direction) => {
        if(ref.current){
            const scrollAmount = ref.current.clientWidth * 0.8;
            ref.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth",
            })
        }
    }

    return(
        <div className="trending-page">
            <h1>Tendencias da Semana</h1>
            <div className="trending-section">

                <h2>Filmes em Alta</h2>
            <div className="carousel-trending">
            <button className="scroll-btntrending left" onClick={() => scrollRow(moviesRowRef, "left")}>←</button>

            <div className="trending-grid" ref={moviesRowRef}>
                {trendingMovies.map((movie) => (
                    <SeriesMoviesCard 
                    key={movie.id}
                    item={movie}
                    type={movie.media_type}/>
                ))}
            </div>

            <button className="scroll-btntrending right" onClick={() => scrollRow(moviesRowRef, "right")}>→</button>
            </div>
            </div>

            <div className="trending-section">

                <h2>Series em Alta</h2>
            <div className="carousel-trending">
            <button className="scroll-btntrending left" onClick={() => scrollRow(seriesRowRef, "left")}>←</button>

            <div className="trending-grid" ref={seriesRowRef}>
                {trendingSeries.map((serie) => (
                    <SeriesMoviesCard 
                    key={serie.id}
                    item={serie}
                    type={serie.media_type}/>
                ))}
            </div>

            <button className="scroll-btntrending right" onClick={() => scrollRow(seriesRowRef, "right")}>→</button>
            </div>
            </div>
        </div>
    )
}

export default Trending;