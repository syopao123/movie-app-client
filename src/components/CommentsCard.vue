<script setup>
import { useMoviesStore } from '@/stores/movies';
import { useUserStore } from '@/stores/user';
import { onBeforeMount, ref } from 'vue';

const userStore = useUserStore();
const moviesStore = useMoviesStore();

const comments = ref([]);

const props = defineProps({
    movieId: String
})

onBeforeMount(async() => {

    if (userStore.isUserLoggedIn) {
        comments.value = await moviesStore.getMovieComments(props.movieId);
    }

})
</script>

<template>
    <div class="card shadow-sm p-4 py-5 rounded-5 border-light-subtle">
        <div class="card-title text-center">
            <h4>Comments</h4>
        </div>
        <div v-if="userStore.isUserLoggedIn" class="card-body">
            <div class="d-flex flex-column">
                <p v-for="comment in comments" class="bg-light p-4 rounded-4 border">{{ comment.comment }}</p>
            </div>
        </div>

        <div v-else class="card-body text-center">
            <span class="fw-light">Please <router-link :to="{ name: 'Login' }">login</router-link> to see comments</span>
        </div>
    </div>
</template>