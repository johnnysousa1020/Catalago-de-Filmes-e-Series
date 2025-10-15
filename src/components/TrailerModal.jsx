import React from "react";
import "./TrailerModal.css"

const TrailerModal = ({ trailerKey, onClose }) => {
    if(!trailerKey) return null;

    return(
        <div className="trailer-overlay" onClick={onClose}>
            <div className="trailer-container" onClick={(e) => e.stopPropagation()}>
                <iframe 
                src={`https://www.youtube.com/embed/${trailerKey}`} 
                title="Trailer"
                allowFullScreen
                ></iframe>
                <button className="close-btnns" onClick={onClose}>X</button>
            </div>
        </div>
    )
}

export default TrailerModal;