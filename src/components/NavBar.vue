<template>
    <nav class="navbar navbar-expand-sm navbar-dark">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">
            <img :src="logo" />
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mb-2 mb-sm-0">
            <router-link to="/" class="nav-link" active-class="active" aria-current="page"
                >About Us</router-link
            >

            <!-- will have a mini dropdown later -->
            <router-link to="/" class="nav-link" active-class="active" aria-current="page"
                >Learn</router-link
            >

            <router-link to="/" class="nav-link" active-class="active" aria-current="page"
                >Projects</router-link
            >
            
            <!-- will have a mini dropdown later -->
            <router-link to="/" class="nav-link" active-class="active" aria-current="page"
                >Events</router-link
            >

        </ul>
        </div>
        
        <div class="dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bi bi-person-circle"></i>
            </a>

            <ul class="dropdown-menu dropdown-menu-end">
                <li>
                    <a class="dropdown-item" href="#">Profile</a>
                </li>
                <li>
                    <a class="dropdown-item" href="#">Login</a>
                </li>
                <li>
                    <a class="dropdown-item" href="#">Sign Up</a>
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

    .navbar-brand {
        flex: 1;
    }

    .dropdown {
        display: flex;
        flex: 1;
        justify-content: flex-end
    }

    .navbar-collapse {
        justify-content: center
    }

</style>