<script setup>
import NavBar from './components/NavBar.vue';
</script>

<template>
    <header>
        <NavBar />
    </header>
    
    <main class="main-box">
        <router-view></router-view>
    </main>
</template>

<style scoped>
</style>