import React, { useState, useEffect, useRef, act } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SeriesMoviesCard from "../SeriesMoviesCard";
import "./Details.css"

const IMG_URL = "https://image.tmdb.org/t/p/w1280";
const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function Details(){
    const { type, id } = useParams();
    const navigate = useNavigate();
    const [item, setltem] = useState(null)
    const [inList, setlnList] = useState(false) 
    const [providers, setProviders] = useState([])
    const [cast, setCast] = useState([])
    const [trailer, setTrailer] = useState(null)
    const [similiar, setSimiliar] = useState([])
    const similiarRef = useRef(null)

    useEffect(() => {
        async function fetchCast() {
            try{
                const res = await fetch(
                    `${BASE_URL}/${type}/${id}/credits?api_key=${API_KEY}&language=pt-BR`
                )

                const data = await res.json()
                setCast(data.cast.slice(0, 10))
            }catch(error){
                console.error("Erro ao buscar elenco:", error)
            }
        }
        
        fetchCast()
    }, [type, id])

    useEffect(() => {
        async function fetchTrailer() {
            try{
                const res = await fetch(
                    `${BASE_URL}/${type}/${id}/videos?api_key=${API_KEY}&language=pt-BR`
                )

                const data = await res.json()

                const officialTrailer = data.results.find(
                    (video) => 
                        video.site === "YouTube" && 
                        video.type === "Trailer"
                )
                setTrailer(officialTrailer)
                console.log(officialTrailer)
            }catch(error){
                console.error("Erro ao buscar trailer:", error)
            }
        }
        fetchTrailer()
    }, [type, id])

    useEffect(() => {
        async function fetchSimilar() {
            try{
                const res = await fetch(
                    `${BASE_URL}/${type}/${id}/recommendations?api_key=${API_KEY}&language=pt-BR`
                )

                const data = await res.json()

                setSimiliar(data.results.slice(0, 10))
                console.log(data.results)
            }catch(error){
                console.error("Erro ao buscar semelhantes:", error)
            }
        }

        fetchSimilar()
    }, [type, id])

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

    const scrollLeft = () => {
        similiarRef.current.scrollBy({
            left: -400,
            behavior: "smooth",
        })
    }

    const scrollRight = () => {
        similiarRef.current.scrollBy({
            left: 400,
            behavior: "smooth",
        })
    }

    if(!item) return <p>Carregando...</p>

    return(
        <div className="details">
            <div className="details-banner"
            style={{backgroundImage: `url(${IMG_URL}${item.backdrop_path || item.poster_path})`,}}
            >
                <div className="overlay"/>

                <div className="content">

                    <div className="buttonsss">
                        <button onClick={() => navigate(-1)}>Voltar</button>
                        <button onClick={handleAddToList}>{inList ? "X Remover" : "+ Minha Lista"}</button>
                        <button onClick={() => navigate("/my-list")}>Ver Minha Lista</button>
                    </div>

                    <div className="details-indp">
                        <img src={`${IMG_URL}${item.poster_path}`} alt={item.title || item.name} className="poster-img"/>

                        <div className="infos-poster-deatalis">

                            <h1>{item.title || item.name}</h1>
                    <p>{item.overview || "Sem descrição disponivel"}</p>

                    <p>
                        <strong>Data de Lançamento: </strong>{""}
                        {item.release_date || item.first_air_date}
                    </p>
                    <p>
                        <strong>Nota: </strong>{item.vote_average}/10
                    </p>

                    {type === "movie" && item.runtime ? (
                        <p>
                            <strong>🕒 Duração: </strong>
                            {Math.floor(item.runtime / 60)}h {item.runtime % 60}min
                        </p>
                    ) : (
                        <>
                         <p>
                            <strong>📺 Temporadas: </strong>
                            {item.number_of_seasons}
                         </p>
                         <p>
                            <strong>🎬 Episódios: </strong>
                            {item.number_of_episodes}
                         </p>
                        </>
                    )}

                    <div className="genres-detailsa">
                        {item.genres?.map((genre) => (
                            <span key={genre.id} className="genrein">
                                {genre.name}
                            </span>
                        ))}
                    </div>

                        </div>
                    </div>
                    
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

                <div className="cast-section">
                    <h2>Elenco Principal</h2>

                    <div className="cast-list-actor">
                        {cast.map((actor) => (
                            <div key={actor.cast_id || actor.id} className="cast-card-actor">
                                <img src={actor.profile_path?`${IMG_URL}${actor.profile_path}`:"https://via.placeholder.com/185x278?text=Sem+Foto"} alt={actor.name} />

                                <h3>{actor.name}</h3>
                                <p>{actor.character}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {trailer && (
                    <div className="trailer-section-details">
                        <h2>Trailer Oficial</h2>

                        <div className="trailer-container-details">
                            <iframe 
                            src={`https://www.youtube.com/embed/${trailer.key}`} 
                            title={trailer.name}
                            allowFullScreen></iframe>
                        </div>
                    </div>
                )}

                {similiar.length > 0 && (
                    <div className="similiar-section-details">
                        <h2>
                            {type === "movie"
                            ? "Filmes Semelhantes"
                            : "Séries Semelhantes"}
                        </h2>

                        <div className="row-conatiner-details">
                            <button className="arrow left" onClick={scrollLeft}>
                                ⇦
                            </button>

                            <div className="rowsna" ref={similiarRef}>
                                {similiar.map((movie) => (
                                    <SeriesMoviesCard 
                                    key={movie.id}
                                    item={movie}
                                    type={type}
                                    showButtons={false}
                                    />
                                ))}
                            </div>

                            <button className="arrow right" onClick={scrollRight}>
                                ⇨
                            </button>
                        </div>
                    </div>
                )}
                </div>
            </div>
        </div>
    )
}

export default Details;