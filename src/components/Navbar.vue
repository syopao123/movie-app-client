<script setup>
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();

</script>

<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary py-4 px-1 px-md-5 border-bottom shadow-sm sticky-top">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">MoviesGo</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                <ul class="navbar-nav gap-1 text-center">
                    <li class="nav-item">
                        <router-link :to="{ name: 'Home' }" class="nav-link">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link v-if="!userStore.isUserLoggedIn" :to="{ name: 'Login' }" class="nav-link">Login</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link v-if="!userStore.isUserLoggedIn" :to="{ name: 'Register' }" class="nav-link">Register</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link v-if="userStore.isUserLoggedIn" :to="{ name: 'Logout' }" class="nav-link">Logout</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<style scoped>
.router-link-active {
    font-weight: bold;
}
</style>