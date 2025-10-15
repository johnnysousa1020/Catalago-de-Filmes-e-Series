import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css"

function Header(){
    const [showSearch, setShowSearch] = useState(false);
    const [search, setSearch] = useState("");
    const [isScrolled, setlsScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            setlsScrolled(currentScrollY > 50);

            if(currentScrollY > lastScrollY && currentScrollY > 80){
                setHidden(true)
            } else if (currentScrollY < lastScrollY - 20){
                setHidden(false)
            }

            lastScrollY = currentScrollY;
        }

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const handleSearch = (e) => {
        e.preventDefault();
        if(search.trim()){
            navigate("/search-results", { state: { query: search }})
            setSearch("")
            setShowSearch(false)
        }
    };

    return(
        <header className={`header${isScrolled ? "scrolled" : ""} ${hidden ? "hidden" : ""}`}>
            <div className="header-left">
                <h1 className="logo" onClick={() => navigate("/")}>CineStream</h1>
                <nav>
                    <button onClick={() => navigate("/")}>Inicio</button>
                    <button onClick={() => navigate("/movies")}>Filmes</button>
                    <button onClick={() => navigate("/series")}>Séries</button>
                    <button onClick={() => navigate("/categorias")}>Categorias</button>
                    <button onClick={() => navigate("/tendencias")}>Tendencias</button>
                </nav>
            </div>

            <div className="header-right">
                {showSearch ? (
                    <form onSubmit={handleSearch} className="search-form">
                        <input 
                        type="text" 
                        placeholder="Buscar..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        autoFocus
                        />
                        <button type="submit">🔍</button>
                    </form>
                ) : (
                    <button className="search-icon" onClick={() => setShowSearch(true)}>🔍</button>
                )}
            </div>
        </header>
    )
}

export default Header