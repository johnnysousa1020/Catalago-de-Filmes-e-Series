import React, { useEffect, useState } from "react";
import { getGenres, getMoviesByGenre, getSeriesByGenre } from "../tmdb";
import SeriesMoviesCard from "../SeriesMoviesCard";
import "./Categorias.css"

function Categorias(){
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectGenre] = useState("")
    const [selectedType, setSelectedType] = useState("movie")
    const [items, setltems] = useState([])

    useEffect(() => {
        async function fetchGenres() {
            const genresData = await getGenres(selectedType);
            setGenres(genresData)
        }
        fetchGenres();
    }, [selectedType]);;

    const handleGenreChange = async (e) => {
        const genreld = e.target.value;
        setSelectGenre(genreld)

        if(genreld){
            const data = selectedType === "movie"
            ? await getMoviesByGenre(genreld)
            : await getSeriesByGenre(genreld)

            setltems(data.results);
        }
    };

    return(
        <div className="categories-page">
            <h2>Categorias</h2>
            <div className="filters">
                <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                    <option value="movie">Filmes</option>
                    <option value="tv">Séries</option>
                </select>

                <select value={selectedGenre} onChange={handleGenreChange}>
                    <option value="">Selecione um genero</option>
                    {genres.map((genre) => (
                        <option key={genre.id} value={genre.id}>{genre.name}</option>
                    ))}
                </select>
            </div>

            <div className="rowss">
                {items.map((item) => (
                    <SeriesMoviesCard key={item.id} item={item} type={selectedType}/>
                ))}
            </div>
        </div>
    )
}

export default Categorias;