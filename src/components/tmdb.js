import axios from "axios";
const API_KEY = "c76bad2263fc16cba9d6e7783c91c00b";
const BASE_URL = "https://api.themoviedb.org/3";

export const APIi_KEY = "c76bad2263fc16cba9d6e7783c91c00b"
export const BASES_URL = "https://api.themoviedb.org/3"

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: {
        api_key: "c76bad2263fc16cba9d6e7783c91c00b",
        language: "pt-BR",
    }
})

export default api;

async function fetchFromApi(endpoint) {
    const res = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}&language=pt-BR`);
    if(!res.ok) throw new Error("Erro na API");
    return await res.json();
}

export async function searchAll(query) {
    const response = await fetch(`${BASE_URL}/search/multi?api_key=${API_KEY}&language=pt-BR&query=${encodeURIComponent(query)}`);
    const data = await response.json();
    return data;
}

export async function getGenres(type = "movie") {
    const response = await fetch(`${BASE_URL}/genre/${type}/list?api_key=${API_KEY}&language=pt-BR`);
    const data = await response.json();
    return data.genres || [];
}

export async function getMoviesByGenre(genreld) {
    const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreld}&language=pt-BR`);
    return await response.json();
}

export async function getSeriesByGenre(genreld) {
    const response = await fetch(`${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=${genreld}&language=pt-BR`);
    return await response.json();
}

/* Filmes */

export async function getPopularMovies(){
    return fetchFromApi("/movie/popular")
}

export async function getTopRatedMovies() {
    return fetchFromApi("/movie/top_rated")
}

export async function getNowPlayingMovies() {
    return fetchFromApi("/movie/now_playing")
}

export async function getMovieByld(id) {
    return fetchFromApi(`/movie/${id}`)
}

/* Series */

export async function getPopularSeries() {
    return fetchFromApi("/tv/popular")
}

export async function getTopRatedSeries() {
    return fetchFromApi("/tv/top_rated")
}

export async function getOnTheAirSeries() {
    return fetchFromApi("/tv/on_the_air")
}

export async function getSeriesByld(id) {
    return fetchFromApi(`/tv/${id}`)
}


export async function searchMovies(query) {
    const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=pt-BR&query=${encodeURIComponent(query)}`)
    return await res.json();
}

export async function searchSeries(query) {
    const res = await fetch(`${BASE_URL}/search/tv?api_key=${API_KEY}&language=pt-BR&query=${encodeURIComponent(query)}`)
    return await res.json();
}

export async function searchMulti(query) {
    const res = await fetch(`${BASE_URL}/search/multi?api_key=${API_KEY}&language=pt-BR&query=${encodeURIComponent(query)}`)
    return await res.json();
}

export async function getDetails(id, typpe) {
    const res = await fetch(`${BASE_URL}/${typpe}/${id}?api_key=${API_KEY}&language=pt-BR`);
    return res.json();
}


/*
export async function getPopularMovies() {
    const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR`);
    return res.json();
}

export async function getPopularSeries() {
    const res = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}&language=pt-BR`);
    return res.json();
}

*/


