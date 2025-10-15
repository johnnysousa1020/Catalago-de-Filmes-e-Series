import React, { useEffect, useState, useRef } from "react";
import { getPopularSeries, getTopRatedSeries, getOnTheAirSeries } from "../tmdb";
import SeriesMoviesCard from "../SeriesMoviesCard";
import "./Series.css"

function Series(){
    const [popular, setPopular] = useState([])
    const [topRated, setTopRated] = useState([])
    const [onAir, setOnAir] = useState([])
    const populaRef = useRef(null)
    const topRateddRef = useRef(null)
    const onAirRef = useRef(null)

    const scrollLeftt = (ref) => {
        ref.current.scrollBy({ left: -400, behavior: "smooth"})
    }

    const scrollRightt = (ref) => {
        ref.current.scrollBy({ left: 400, behavior: "smooth"})
    }
    
        useEffect(() => {
            async function fetchSeries() {
                const [popularData, topRatedData, onAirData] = await Promise.all([
                    getPopularSeries(),
                    getTopRatedSeries(),
                    getOnTheAirSeries(),
                ]);
                setPopular(popularData.results);
                setTopRated(topRatedData.results);
                setOnAir(onAirData.results);
            }
            fetchSeries();
        }, []);

        return(
             <div className="series-page">
            <h2>Séries Populares</h2>
            <div className="row-containerss">
            <button className="arons left" onClick={() => scrollLeftt(populaRef)}>←</button>
            <div className="rowe" ref={populaRef}>
                {popular.map((serie) => (
                    <SeriesMoviesCard key={serie.id} item={serie} type="serie"/>
                ))}
            </div>
            <button className="arons right" onClick={() => scrollRightt(populaRef)}>→</button>
            </div>

            <h2>Séries Mais Bem Avaliados</h2>
            <div className="row-containerss">
            <button className="arons left" onClick={() => scrollLeftt(topRateddRef)}>←</button>
            <div className="rowe" ref={topRateddRef}>
                {topRated.map((serie) => (
                    <SeriesMoviesCard key={serie.id} item={serie} type="serie"/>
                ))}
            </div>
            <button className="arons right" onClick={() => scrollRightt(topRateddRef)}>→</button>
            </div>

            <h2>Séries em Cartaz</h2>
            <div className="row-containerss">
            <button className="arons left" onClick={() => scrollLeftt(onAirRef)}>←</button>
            <div className="rowe" ref={onAirRef}>
                {onAir.map((serie) => (
                    <SeriesMoviesCard key={serie.id} item={serie} type="serie"/>
                ))}
            </div>
            <button className="arons right" onClick={() => scrollRightt(onAirRef)}>→</button>
            </div>
        </div>
        )
}

export default Series