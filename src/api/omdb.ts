// API https://www.omdbapi.com/?apikey=a71eb760&s=behzat

const API_BASE = "https://www.omdbapi.com/";
const API_KEY = "a71eb760";

export type OmdbSearchItem = {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
};

async function searchMovies(query: string) {
    try {
        const url = `${API_BASE}?apikey=${API_KEY}&s=${encodeURIComponent(query)}`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Failed to fetch movie");
        console.log(error);
    }

}

export default searchMovies;