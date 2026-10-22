<script setup>
import { useMoviesStore } from '@/stores/movies';
import { useUserStore } from '@/stores/user';
import { Notyf } from 'notyf';
import { onBeforeMount, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const notyf = new Notyf();

const userStore = useUserStore();
const moviesStore = useMoviesStore();

const router = useRouter();

const title = ref('');
const director = ref('');
const year = ref(0);
const description = ref('');
const genre = ref('');

const isLoading = ref(false);
const isEnabled = ref(false);

const handleAddMovie = async () => {
    
    try {

        isLoading.value = true;

        let newMovie = {
            title: title.value,
            director: director.value,
            year: year.value,
            description: description.value,
            genre: genre.value
        }

        let result = await moviesStore.addMovie(newMovie);
        notyf.success(result);

        router.push({ name: 'Home' });

    } catch (e) {
        notyf.error(e.response.data.error);
    } finally {
        isLoading.value = false;
    }
}

onBeforeMount(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (!userStore.isAdmin) {
        router.push({ name: 'Home' });
    }
})

watch([title, director, year, description, genre], (val) => {
    if (val.every(input => input !== '')) {
        isEnabled.value = true;
    } else {
        isEnabled.value = false;
    }
})
</script>

<template>
    <div class="container-fluid">
        <div class="container">

            <div class="row min-vh-100 align-items-center justify-content-center">

                <div class="col-12 col-md-6">

                    <div class="card p-4">

                        <div class="card-body">
                            <form @submit.prevent="handleAddMovie()">

                                <h4 class="mb-4 text-center">Add Movie</h4>

                                <div class="row mb-3">
                                    <div class="col">
                                        <label for="title" class="form-label">Title</label>
                                        <input v-model="title" type="text" class="form-control" required placeholder="Enter movie title...">
                                    </div>
                                </div>

                                <div class="row mb-3">
                                    <div class="col">
                                        <label for="title" class="form-label">Director</label>
                                        <input v-model="director" type="text" class="form-control" required placeholder="Enter movie director...">
                                    </div>
                                </div>

                                <div class="row mb-3">
                                    <div class="col">
                                        <label for="title" class="form-label">Year</label>
                                        <input v-model="year" type="number" class="form-control" required placeholder="Enter movie year...">
                                    </div>
                                </div>

                                <div class="row mb-3">
                                    <div class="col">
                                        <label for="title" class="form-label">Description</label>
                                        <textarea v-model="description" cols="7" class="form-control" placeholder="Enter movie description..."></textarea>
                                    </div>
                                </div>

                                <div class="row mb-5">
                                    <div class="col">
                                        <label for="title" class="form-label">Genre</label>
                                        <input v-model="genre" type="text" class="form-control" required placeholder="Enter movie genre...">
                                    </div>
                                </div>

                                <div class="row mb-3">
                                    <div class="col text-end">
                                        <button :disabled="isLoading || !isEnabled" type="submit" class="btn btn-success">Add Movie</button>
                                    </div>
                                </div>

                            </form>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    </div>
</template>