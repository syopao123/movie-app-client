<script setup>
import MovieCard from '@/components/MovieCard.vue';
import MoviesTable from '@/components/MoviesTable.vue';
import { useMoviesStore } from '@/stores/movies';
import { useUserStore } from '@/stores/user';
import { Notyf } from 'notyf';
import { onBeforeMount, ref } from 'vue';

const notyf = new Notyf();

const userStore = useUserStore();
const moviesStore = useMoviesStore();
const isLoading = ref(false);

onBeforeMount(async () => {
    window.scrollTo({ top: 0, behavior: 'smooth'});
    try {
        isLoading.value = true;
        await moviesStore.loadMovies();
    } catch (e) {
        notyf.error(e.response.data.error);
    } finally {
        isLoading.value = false;
    }
})
</script>

<template>

    <div class="container-fluid">

        <div class="container">

            <div class="row min-vh-100 py-5">

                <div v-if="!userStore.isAdmin" class="col">

                    <h3 class="mb-4">All Movies</h3>

                    <!-- Movie Cards -->
                    <div v-if="!isLoading" class="row row-cols-1 row-cols-md-3 row-cols-lg-4 gy-4">
                        <MovieCard v-for="movie in moviesStore.allMovies" :key="movie._id" :movie="movie" />
                    </div>

                    <!-- Loading State -->
                    <div v-else class="text-center">
                        <div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>

                </div>

                <div v-else>

                    <MoviesTable />

                </div>

            </div>

        </div>

    </div>

</template>