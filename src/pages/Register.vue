<script setup>
import { useUserStore } from '@/stores/user';
import { Notyf } from 'notyf';
import { onBeforeMount, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const notyf = new Notyf();

const router = useRouter();

const userStore = useUserStore();

const email = ref('');
const password = ref('');
const isLoading = ref(false);
const isEnabled = ref(false);

const handleRegister = async() => {

    try {

        isLoading.value = true;
        let result = await userStore.register(email.value, password.value);
        notyf.success(result);

    } catch (e) {
        notyf.error(e.response.data.error);
    } finally {
        isLoading.value = false;
    }

}

onBeforeMount(async() => {
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
                        <form @submit.prevent="handleRegister()">
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
                                    <button :disabled="isLoading || !isEnabled" type="submit" class="btn btn-primary w-100">Register</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="card-footer bg-transparent border-0 text-center">
                        <p>Already have an account? Login <router-link :to="{ name: 'Login' }">here</router-link></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>