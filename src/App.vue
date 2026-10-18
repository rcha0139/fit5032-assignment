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

<style>
    body {
        font-family: 'Inter', sans-serif;
    }

    h1, h2, h3, h4, h5, h6, .navbar-brand, .btn {
        font-family: 'Lora', serif;
    }
</style>