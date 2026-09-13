<script setup>
    import logo from '@/assets/navbar-logo.png'
    import { currentUser, logout, userProfile } from '@/composables/useAuth'
    import { useRouter } from 'vue-router'

    const router = useRouter()

    const handleLogout = () => { 
        logout()
        router.push('/')
     }
</script>

<template>
    <nav class="navbar navbar-expand-sm navbar-dark">
    <div class="container-fluid">
        <router-link class="navbar-brand" to="/">
            <img :src="logo" />
        </router-link>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mb-2 mb-sm-0">
            <router-link to="/about" class="nav-link" active-class="active" aria-current="page"
                >About Us</router-link
            >

            <!-- will have a mini dropdown later -->
            <router-link to="/learn" class="nav-link" active-class="active" aria-current="page"
                >Learn</router-link
            >

            <router-link to="/projects" class="nav-link" active-class="active" aria-current="page"
                >Projects</router-link
            >
            
            <!-- will have a mini dropdown later -->
            <router-link to="/events" class="nav-link" active-class="active" aria-current="page"
                >Events</router-link
            >

        </ul>

        <div class="dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {{ userProfile?.firstname }}
                <i class="bi bi-person-circle ms-2"></i>
            </a>

            <ul class="dropdown-menu dropdown-menu-end">
                
                <template v-if="currentUser">
                    <li>
                        <router-link to="/profile" class="dropdown-item" active-class="active" aria-current="page"
                            >Profile</router-link
                        >

                        <button class="dropdown-item" @click="handleLogout">Logout</button>
                    </li>
                </template>

                <template v-else>
                    <li>
                        <router-link to="/login" class="dropdown-item" active-class="active" aria-current="page"
                            >Login</router-link
                        >
                        <router-link to="/signup" class="dropdown-item" active-class="active" aria-current="page"
                            >Sign Up</router-link
                        >
                    </li>
                </template>
            </ul>
        </div>
        </div>
        
    </div>
    </nav>
</template>

<style scoped>
    .navbar {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 1000; /*makes this float above other content*/
        
        background-color: #006989;
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