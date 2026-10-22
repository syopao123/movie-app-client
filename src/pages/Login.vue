<script setup>
import { useUserStore } from '@/stores/user';
import { Notyf } from 'notyf';
import { onBeforeMount, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const notyf = new Notyf();

const userStore = useUserStore();
const router = useRouter();

const email = ref('');
const password = ref('');
const isLoading = ref(false);
const isEnabled = ref(false);

const handleLogin = async() => {

    try {

        isLoading.value = true;
        let result = await userStore.login(email.value, password.value);
        notyf.success(result);
        router.push({ name: 'Home' });

        await userStore.getUserDetails();

    } catch (e) {
        notyf.error(e.response.data.error || e.response.data.message);        
    } finally {
        isLoading.value = false;
    }

}

onBeforeMount(() => {
    if (userStore.token) {
        router.push({ name: 'Home' });
    }
})

watch([email, password], (val) => {
    if (val.every(input => input !== '')) {
        isEnabled.value = true;
    } else {
        isEnabled.value = false;
    }
})

</script>

<template>
    <div class="container">
        <div class="row min-vh-100 align-items-center justify-content-center">
            <div class="col-12 col-md-6">
                <div class="card shadow-sm rounded-5 border-light-subtle p-3">
                    <div class="card-body">
                        <form @submit.prevent="handleLogin()">
                            <h3 class="text-center">MoviesGo</h3>
                            <div class="row mb-3">
                                <div class="col">
                                    <label for="email" class="form-label">Email</label>
                                    <input v-model="email" type="email" class="form-control" placeholder="Enter your email..." required>
                                </div>
                            </div>
                            <div class="row mb-4">
                                <div class="col">
                                    <label for="email" class="form-label">Password</label>
                                    <input v-model="password" type="password" class="form-control" placeholder="Enter your password..." required>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <button :disabled="isLoading || !isEnabled" type="submit" class="btn btn-primary w-100">Login</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="card-footer bg-transparent border-0 text-center">
                        <p>No Account Yet? Register <router-link :to="{ name: 'Register' }">here</router-link></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>