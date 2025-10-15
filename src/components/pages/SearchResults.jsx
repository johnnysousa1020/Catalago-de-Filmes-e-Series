import React, {useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import SeriesMoviesCard from "../SeriesMoviesCard";
import { BASES_URL, APIi_KEY } from "../tmdb";
import "./SearchResults.css"

function SearchResults(){
    const location = useLocation()
    const { query } = location.state || []
    const [results, setResults] = useState([]);

    useEffect(() => {
        if(query){
            const fetchSearch = async () => {
                try{
                    const movieRes = await fetch(`${BASES_URL}/search/movie?api_key=${APIi_KEY}&language=pt-BR&query=${query}`);
                    const seriesRes = await fetch(`${BASES_URL}/search/tv?api_key=${APIi_KEY}&language=pt-BR&query=${query}`)

                    const movieData = await movieRes.json()
                    const seriesData = await seriesRes.json()

                    const combined = [
                        ...(movieData.results || []).map((item) => ({
                            ...item,
                            media_type: "movie",
                        })),
                        ...(seriesData.results || []).map((item) => ({
                            ...item,
                            media_type: "tv",
                        })),
                    ];

                    setResults(combined);
                }catch(error){
                    console.error("Erro ao buscar:", error)
                }
            };
            fetchSearch();
        }
    }, [query])

    return(
        <div className="search-results">
            <h2>Resultados para: <span>{query}</span></h2>
            {results.length === 0 ? (
                <p>Nenhum resultado encontrado.</p>
            ) : (
                <div className="rown">
                    {results.map((item) => (
                        <SeriesMoviesCard key={`${item.media_type}-${item.id}`} item={item} type={item.media_type}/>
                    ))}
                </div>
            )}

            <Link to="/" className="back-button">Voltar</Link>
        </div>
    )
}

export default SearchResults;