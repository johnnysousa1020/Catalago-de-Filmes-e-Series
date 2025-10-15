import React from "react"
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import Home from "./components/pages/Home"
import Details from "./components/pages/Details"
import MyList from "./components/pages/MyList"
import Header from "./components/pages/Header"
import Movies from "./components/pages/Movies"
import Series from "./components/pages/Series"
import Categorias from "./components/pages/Categorias"
import SearchResults from "./components/pages/SearchResults"
import Banner from "./components/Banner"
import Trending from "./components/pages/Trending"
import "./App.css"

function AppContent() {
  const location = useLocation();
  const hideHeader = location.pathname.startsWith("/details") || location.pathname.startsWith("/search-results") || location.pathname.startsWith("/my-list") 
  const hiderBanner = location.pathname.startsWith("/categorias") || location.pathname.startsWith("/search-results") || location.pathname.startsWith("/details")

  return (
      <div className="app">
        {!hideHeader && <Header />}
        {location.pathname === "/" && !hiderBanner && <Banner />}
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/details/:type/:id" element={<Details />}/>
          <Route path="/my-list" element={<MyList />}/>
          <Route path="/movies" element={<Movies />}/>
          <Route path="/series" element={<Series />}/>
          <Route path="/categorias" element={<Categorias />}/>
          <Route path="/tendencias" element={<Trending />}/>
          <Route path="/search-results" element={<SearchResults />}/>
        </Routes>
      </div>
  )
}

export default function App(){
  return(
    <Router>
      <AppContent />
    </Router>
  )
}


