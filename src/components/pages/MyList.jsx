import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyList.css"

const IMG_URL = "https://image.tmdb.org/t/p/w500"


function MyList(){
    const [list, setList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const savedList = JSON.parse(localStorage.getItem("myList")) || [];
        setList(savedList);
    }, [])

    const handleRemove = (id, type) => {
        const updatedList = list.filter(item => !(item.id === id && item.type === type));
        setList(updatedList);
        localStorage.setItem("myList", JSON.stringify(updatedList))
    };

    return(
        <div className="my-list">
            <h1>Minha Lista</h1>
            <button className="backst-button" onClick={() => navigate("/")}>Voltar ao inicio</button>
            {list.length === 0 ? (
                <p>Você ainda não adicionou filmes ou séries á sua lista.</p>
            ) : (
                <div className="list-grids">
                    {list.map((item) => (
                        <div key={`${item.type}-${item.id}`} className="cardsss">
                            <img src={IMG_URL + item.poster_path} alt={item.title || item.name} 
                            onClick={() => navigate(`/details/${item.type}/${item.id}`)}/>
                            <h3>{item.title || item.name}</h3>
                            <p>{item.type === "movie" ? "Filme" : "Série"}</p>
                            <button onClick={() => handleRemove(item.id, item.type)}>X Remover</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default MyList;