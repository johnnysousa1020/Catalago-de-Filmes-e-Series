import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getPopularMovies, getTopRatedMovies, getNowPlayingMovies, getPopularSeries, getTopRatedSeries, getOnTheAirSeries, 
} from "../tmdb";
import SeriesMoviesCard from "../SeriesMoviesCard";
import "./Home.css"


function Home(){
    const [moviesPopular, setMoviesPopular] = useState([])
    const [moviesTopRated, setMoviesTopRated] = useState([])
    const [moviesNowPlaying, setMoviesNowPlaying] = useState([])
    const [seriesPopular, setSeriesPopular] = useState([])
    const [seriesTopRated, setSeriesTopRated] = useState([])
    const [seriesOnAir, setSeriesOnAir] = useState([])
    const navigate = useNavigate();

    const rowsRef = useRef([])

    useEffect(() => {
        async function fetchData() {
            const [popularMovies, topRatedMovies, nowPlayingMovies, 
                popularSeries, topRatedSeries, onAirSeries
            ] =
            await Promise.all([
                getPopularMovies(),
                getTopRatedMovies(),
                getNowPlayingMovies(),
                getPopularSeries(),
                getTopRatedSeries(),
                getOnTheAirSeries(),
            ]);

            setMoviesPopular(popularMovies.results);
            setMoviesTopRated(topRatedMovies.results);
            setMoviesNowPlaying(nowPlayingMovies.results);
            setSeriesPopular(popularSeries.results);
            setSeriesTopRated(topRatedSeries.results);
            setSeriesOnAir(onAirSeries.results);
        }

        fetchData()
    }, [])

    const handleClick = (item, type) => {
        navigate(`/details/${type}/${item.id}`)
    };

    const scrollRow = (index, direction) => {
        const row = rowsRef.current[index]
        if(row){
            const scrollAmount = row.clientWidth * 0.8;

            row.scrollBy({
                left: direction === "right" ? scrollAmount : -scrollAmount, behavior: "smooth",
            })
        }
    }

    const sections = [
        { title: "Filmes Populares", items: moviesPopular, type: "movie"},
        { title: "Filmes Mais Bem Avaliados", items: moviesTopRated, type: "movie"},
        { title: "Filmes em Cartaz", items: moviesNowPlaying, type: "movie"},
        { title: "Séries Populares", items: seriesPopular, type: "tv"},
        { title: "Séries Mais Bem Avaliados", items: seriesTopRated, type: "tv"},
        { title: "Séries em Cartaz", items: seriesOnAir, type: "tv"},
    ];

    return(
        <div className="home">
            {sections.map((section, index) => (
                <div key={index} className="category">
                    <h2>{section.title}</h2>

                    <div className="carousel-container">
                        <button className="scroll-btn left" onClick={() => scrollRow(index, "left")}>
                            ←
                        </button>

                        <div className="row" ref={(el) => (rowsRef.current[index] = el)}>
                            {section.items.map((item) => (
                                <SeriesMoviesCard key={item.id} item={item} type={section.type}
                                onClick={() => handleClick(item, section.type)}/>
                            ))}
                        </div>

                        <button className="scroll-btn right" onClick={() => scrollRow(index, "right")}>
                            →
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Home;

/*

<h2>Filmes Populares</h2>
            <div className="row">
                {moviesPopular.map((movie) => (
                    <SeriesMoviesCard key={movie.id} item={movie} type="movie" onClick={() => handleClick(movie, "movie")}/>
                ))}
            </div>

            <h2>Filmes mais bem Avaliados</h2>
            <div className="row">
                {moviesTopRated.map((movie) => (
                    <SeriesMoviesCard key={movie.id} item={movie} type="movie" onClick={() => handleClick(movie, "movie")}/>
                ))}
            </div>

            <h2>Filmes em Cartaz</h2>
            <div className="row">
                {moviesNowPlaying.map((movie) => (
                    <SeriesMoviesCard key={movie.id} item={movie} type="movie" onClick={() => handleClick(movie, "movie")}/>
                ))}
            </div>

            <h2>Series Populares</h2>
            <div className="row">
                {seriesPopular.map((serie) => (
                    <SeriesMoviesCard key={serie.id} item={serie} type="tv" onClick={() => handleClick(seriesOnAir, "tv")}/>
                ))}
            </div>

            <h2>Series mais bem avaliados</h2>
            <div className="row">
                {seriesTopRated.map((serie) => (
                    <SeriesMoviesCard key={serie.id} item={serie} type="tv" onClick={() => handleClick(seriesOnAir, "tv")}/>
                ))}
            </div>

            <h2>Series em exibição</h2>
            <div className="row">
                {seriesOnAir.map((serie) => (
                    <SeriesMoviesCard key={serie.id} item={serie} type="tv" onClick={() => handleClick(seriesOnAir, "tv")}/>
                ))}
            </div>*/