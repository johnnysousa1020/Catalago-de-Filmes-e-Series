import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Details.css"

const IMG_URL = "https://image.tmdb.org/t/p/w500";
const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "c76bad2263fc16cba9d6e7783c91c00b";

function Details(){
    const { type, id } = useParams();
    const navigate = useNavigate();
    const [item, setltem] = useState(null)
    const [inList, setlnList] = useState(false) 
    const [providers, setProviders] = useState([])

    useEffect(() => {
        const fetchProviders = async () => {
            try{
                const res = await fetch(
                    `https://api.themoviedb.org/3/${type}/${id}/watch/providers?api_key=${API_KEY}&language=pt-BR`
                );
                const data = await res.json()
                const brProviders = data.results?.BR?.flatrate || []
                setProviders(brProviders)
            }catch (error) {
                console.error("Erro ao buscar provedores:", error)
            }
        }

        fetchProviders();
    }, [type, id])

    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`${BASE_URL}/${type}/${id}?api_key=${API_KEY}&language=pt-BR`)
            const data = await res.json();
            setltem(data)

            const savedList = JSON.parse(localStorage.getItem("myList")) || [];
            setlnList(savedList.some((saved) => saved.id === data.id && saved.type === type));
        }
        fetchData()
    }, [type, id])

    const handleAddToList = () => {
        let savedList = JSON.parse(localStorage.getItem("myList")) || [];

        if(inList){
            savedList = savedList.filter(
                (saved) => !(saved.id === item.id && saved.type === type)
            );
            setlnList(false)
        }else{
            savedList.push({ ...item, type })
            setlnList(true)
        }

        localStorage.setItem("myList", JSON.stringify(savedList))
    }

    if(!item) return <p>Carregando...</p>

    return(
        <div className="details">
            <div className="details-banner"
            style={{backgroundImage: `url(${IMG_URL}${item.backdrop_path || item.poster_path})`,}}
            >
                <div className="overlay"/>
                <div className="content">
                    <div className="buttons">
                        <button onClick={() => navigate(-1)}>Voltar</button>
                        <button onClick={handleAddToList}>{inList ? "X Remover da Lista" : "+ Minha Lista"}</button>
                        <button onClick={() => navigate("/my-list")}>Ver Minha Lista</button>
                    </div>

                    <h1>{item.title || item.name}</h1>
                    <p>{item.overview || "Sem descrição disponivel"}</p>

                    <p>
                        <strong>Data de Lançamento:</strong>{""}
                        {item.release_date || item.first_air_date}
                    </p>
                    <p>
                        <strong>Nota:</strong>{item.vote_average}/10
                    </p>
                    
                <div className="providers">
                    <strong>Disponivel em:</strong>
                    {providers.length > 0 ? (
                        <ul>
                            {providers.map((prov) => (
                                <li key={prov.provider_id} 
                                className={`provider ${prov.provider_name.toLowerCase().replace(/\s+/g,'-')}`}>
                                {prov.provider_name}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>Não disponivel em streaming no momento.</p>
                    )}
                </div>
                </div>
            </div>
        </div>
    )
}

export default Details;