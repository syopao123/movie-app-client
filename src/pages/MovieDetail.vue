<script setup>
import CommentsCard from '@/components/CommentsCard.vue';
import { useMoviesStore } from '@/stores/movies';
import { Notyf } from 'notyf';
import { onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const notyf = new Notyf();

const moviesStore = useMoviesStore();

const movie = ref({});
const comments = ref([]);
const isLoading = ref(false);

onBeforeMount(async () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const movieId = route.params.id;

    if (!movieId) {
        router.push({ name: 'Home' });
    }

    try {

        isLoading.value = true;
        movie.value = await moviesStore.getMovieById(route.params.id);

    } catch (e) {
        notyf.error(e.response.data.error);
        router.push({ name: 'Home' });
    } finally {
        isLoading.value = false;
    }
})

</script>

<template>

    <div class="container-fluid">
        <div class="container py-5">

            <div class="row mb-5">
                <div class="col-auto">
                    <router-link :to="{ name: 'Home' }"
                        class="d-flex align-items-center gap-2 border px-3 py-1 rounded-4 text-decoration-none text-black shadow-sm
                                " style="cursor: pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                        </svg>
                        <span class="fw-light">Go Back</span>
                    </router-link>
                </div>
            </div>

            <div v-if="isLoading" class="text-center">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>

            <div v-else class="row row-cols-1 row-cols-md-2 min-vh-100 gy-5">

                <!-- Movie Image -->
                <div class="col">

                    <img :src="`https://picsum.photos/seed/${movie._id}/200/200`" :alt="movie.title"
                        class="rounded-4 w-100">

                </div>

                <!-- Movie Description -->
                <div class="col">
                    <h3 class="text-center text-md-start">{{ movie.title }}</h3>
                    <p class="text-center text-md-start">Director: {{ movie.director }}</p>
                    <p class="text-center text-md-start fw-light text-secondary-emphasis mb-0">{{ movie.year }}</p>
                    <p class="text-center text-md-start fw-light text-secondary-emphasis">{{ movie.genre }}</p>
                    <p>{{ movie.description }}</p>
                </div>

                <!-- Comments -->
                <div class="col col-md-12">
                    <comments-card :movie-id="movie._id" />
                </div>

            </div>



        </div>
    </div>

</template>