import api from "@/api";
import { defineStore } from "pinia";

export const useMoviesStore = defineStore('movies', {
    state: () => ({
        movies: []
    }),

    getters: {
        allMovies: (state) => state.movies
    },

    actions: {

        async loadMovies() {
            let response = await api.get('/movies/getMovies');
            this.movies = response.data.movies;
        },

        async getMovieById(id) {
            let response = await api.get(`/movies/getMovie/${id}`);
            return response.data;
        },

        async getMovieComments(id) {
            let response = await api.get(`/movies/getComments/${id}`)
            return response.data.comments;
        },

        async addMovie(newMovie) {
            let response = await api.post('/movies/addMovie', {
                title: newMovie.title,
                director: newMovie.director,
                year: newMovie.year,
                description: newMovie.description,
                genre: newMovie.genre
            })
            return 'Movie added successfully';
        }

    }
})