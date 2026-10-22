<script setup>
import { useMoviesStore } from '@/stores/movies';

const moviesStore = useMoviesStore();

</script>

<template>

    <div class="mb-3 text-end">
        <router-link :to="{ name: 'AddMovie' }" class="btn btn-success">Add Movie</router-link>
    </div>

    <div class="table-responsive">
        <table class="table table-bordered table-hover">
            <thead>
                <tr>
                    <th colspan="4" class="text-center">List of Movies</th>
                </tr>
                <tr>
                    <th>Title</th>
                    <th>Director</th>
                    <th>Description</th>
                    <th>Genre</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="movie in moviesStore.allMovies">
                    <td>{{ movie.title }}</td>
                    <td>{{ movie.director }}</td>
                    <td style="max-width: 40rem;">{{ movie.description }}</td>
                    <td>{{ movie.genre }}</td>
                </tr>
            </tbody>
        </table>
    </div>

</template>