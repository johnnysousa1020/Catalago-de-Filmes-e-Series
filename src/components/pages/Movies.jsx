import React, { useEffect, useState, useRef } from "react";
import { getPopularMovies, getTopRatedMovies, getNowPlayingMovies } from "../tmdb";
import SeriesMoviesCard from "../SeriesMoviesCard";
import "./Movies.css"

function Movies(){
    const [popular, setPopular] = useState([])
    const [topRated, setTopRated] = useState([])
    const [nowPlaying, setNowPlaying] = useState([])
    const popularRef = useRef(null)
    const topRatedRef = useRef(null)
    const nowPlayingRef = useRef(null)

    const scrollLeft = (ref) => {
        ref.current.scrollBy({ left: -400, behavior: "smooth"})
    }

    const scrollRight = (ref) => {
        ref.current.scrollBy({ left: 400, behavior: "smooth"})
    }

    useEffect(() => {
        async function fetchMovies() {
            const [popularData, topRatedData, nowPlayingData] = await Promise.all([
                getPopularMovies(),
                getTopRatedMovies(),
                getNowPlayingMovies(),
            ]);
            setPopular(popularData.results);
            setTopRated(topRatedData.results);
            setNowPlaying(nowPlayingData.results);
        }
        fetchMovies();
    }, []);

    return(
        <div className="movies-page">

            <h2>Filmes Populares</h2>
            <div className="row-container">
            <button className="arrow left" onClick={() => scrollLeft(popularRef)}>←</button>
            <div className="rowsn" ref={popularRef}>
                {popular.map((movie) => (
                    <SeriesMoviesCard key={movie.id} item={movie} type="movie"/>
                ))}
            </div>
            <button className="arrow right" onClick={() => scrollRight(popularRef)}>→</button>
            </div>

            <h2>Filmes Mais Bem Avaliados</h2>
            <div className="row-container">
            <button className="arrow left" onClick={() => scrollLeft(topRatedRef)}>←</button>
            <div className="rowsn" ref={topRatedRef}>
                {topRated.map((movie) => (
                    <SeriesMoviesCard key={movie.id} item={movie} type="movie"/>
                ))}
            </div>
            <button className="arrow right" onClick={() => scrollRight(topRatedRef)}>→</button>
            </div>

            <h2>Filmes em Cartaz</h2>
            <div className="row-container">
            <button className="arrow left" onClick={() => scrollLeft(nowPlayingRef)}>←</button>
            <div className="rowsn" ref={nowPlayingRef}>
                {nowPlaying.map((movie) => (
                    <SeriesMoviesCard key={movie.id} item={movie} type="movie"/>
                ))}
            </div>
            <button className="arrow right" onClick={() => scrollRight(nowPlayingRef)}>→</button>
            </div>
        </div>
    )
}

export default Movies;