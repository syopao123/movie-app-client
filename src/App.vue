<script setup>
import { onMounted, ref } from 'vue';
import Navbar from './components/Navbar.vue';
import { useUserStore } from './stores/user.js';
import { Notyf } from 'notyf';

const userStore = useUserStore();

const notyf = new Notyf();

const isLoading = ref(false);

onMounted(async () => {

  try {

    isLoading.value = true;
    await userStore.getUserDetails();

  } catch (e) {
    notyf.error(e.response.data.error);
  } finally {
    isLoading.value = false;
  }

})

</script>

<template>
  <Navbar />
  <router-view />
</template>

<style scoped></style>
