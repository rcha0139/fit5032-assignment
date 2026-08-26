<template>
    <nav class="navbar navbar-expand-sm bg-body-tertiary">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">
            <img :src="logo" />
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mx-auto mb-2 mb-sm-0">
            <li class="nav-item">
            <a class="nav-link" href="#">About Us</a>
            </li>

            <!-- will have a mini dropdown later -->
            <li class="nav-item">
            <a class="nav-link" href="#">Learn</a>
            </li>

            <li class="nav-item">
            <a class="nav-link" href="#">Projects</a>
            </li>
            
            <!-- will have a mini dropdown later -->
            <li class="nav-item">
            <a class="nav-link" href="#">Events</a>
            </li>

        </ul>
        </div>
    </div>
    </nav>
</template>

<script setup>
    import logo from '@/assets/navbar-logo.png'
</script>

<style scoped>
    .navbar {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 1000; /*makes this float above other content*/
        
        background-color: #008496;
        color: #fff;
    }

    .navbar-brand img {
        height: 40px;
        width: auto;
    }

</style>