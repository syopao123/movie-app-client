<script setup>
import { useUserStore } from '@/stores/user';
import { onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

onBeforeMount(() => {
    userStore.logout();
    router.push({ name: 'Home' });
})
</script>

<template></template>