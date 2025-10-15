import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const IMG_URL = "https://image.tmdb.org/t/p/w500";

function Row({ title, fetchData, type }){
    const [items, setltems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function load() {
            const data = await fetchData();
            setltems(data.results || []);
        }
        load()
    }, [fetchData])

    return(
        <div className="row-div">
            <h3>{title}</h3>
            <div className="row-cards">
                {items.map((item) => (
                    <div key={item.id} className="cardes" onClick={() => navigate(`/details/${type}/${item.id}`)}>
                        <img src={IMG_URL + item.poster_path} alt={item.title || item.name} />
                        <p>{item.title || item.name}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Row;