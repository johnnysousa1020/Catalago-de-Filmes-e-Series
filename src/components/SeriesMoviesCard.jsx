import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TrailerModal from "./TrailerModal";

const IMG_URL = "https://image.tmdb.org/t/p/w200"

function SeriesMoviesCard({ item, type }){
    const navigate = useNavigate();
    const [inList, setlnList] = useState(false)
    const [trailerKey, setTrailerKey] = useState(null)

    useEffect(() => {
        const savedList = JSON.parse(localStorage.getItem("myList")) || [];
        setlnList(savedList.some((saved) => saved.id === 
    item.id && saved.type === type));
    }, [item, type]);

    const handleAddToList = () => {
        let savedList = JSON.parse(localStorage.getItem("myList")) || [];

        if(inList){
            savedList = savedList.filter(
                (saved) => !(saved.id === item.id && saved.type === type)
            );
            setlnList(false)
        } else {
            savedList.push({ ...item, type });
            setlnList(true)
        }

        localStorage.setItem("myList", JSON.stringify(savedList));
    }

    const handleShowTrailer = async () => {
        try{
            const response = await fetch(
                `https://api.themoviedb.org/3/${type}/${item.id}/videos?api_key=c76bad2263fc16cba9d6e7783c91c00b&language=pt-BR`
            )
            const data = await response.json()

            const trailerFound = data.results.find(
                (vid) => vid.type === "Trailer" && vid.site === "YouTube"
            )

            if(trailerFound){
                setTrailerKey(trailerFound.key)
            }else{
                alert("Trailer não encontrado")
            }
        }catch (error) {
            console.error("Erro ao buscar  trailer:", error)
        }
    };

    return(
        <div className="series-cards">
            <img src={`${IMG_URL}${item.poster_path}`} alt={item.title || item.name} />
            <p>{item.title || item.name}</p>
            <div className="card-buttons">
                <button onClick={() => navigate(`/details/${type}/${item.id}`)}>info</button>  
                <button onClick={handleShowTrailer}>Trailer</button>
                </div>
                <div className="card-buttons-dois">
                <button onClick={handleAddToList}>{inList ? "X Remover da Lista" : "+ Minha Lista"}</button>
                </div>
                {trailerKey && (
                    <TrailerModal 
                    trailerKey={trailerKey}
                    onClose={() => setTrailerKey(null)}/>
                )}
        </div>
    )
}

export default SeriesMoviesCard;