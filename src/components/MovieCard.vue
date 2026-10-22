<script setup>

defineProps({
    movie: Object
})

</script>

<template>
    <div class="col">
        <div class="card h-100 rounded-3 border-light-subtle shadow-sm">
            <img :src="`https://picsum.photos/seed/${movie._id}/200/200`" :alt="movie.title" class="card-img rounded-3 rounded-bottom-0">
            <div class="card-title p-3">
                <h5>{{ movie.title }}</h5>
                <p class="fw-light">{{ movie.year }}</p>
            </div>
            <div class="card-body">
                <p class="text-truncate">{{ movie.description }}</p>
            </div>
            <div class="card-footer bg-transparent border-0 text-end pb-3">
                <router-link :to="{ name: 'MovieDetail', params: { id: movie._id }}" 
                    class="btn btn-sm btn-primary rounded-4 px-3">View Movie</router-link>
            </div>
        </div>
    </div>
</template>