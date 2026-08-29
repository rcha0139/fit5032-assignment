<template>
    <div class="projects">
        <h1>Projects</h1>
        <p>Our work takes place across the length of the Great Barrier Reef, 
            from coral nurseries offshore to catchment restoration on the mainland. 
            Each project below tackles a different pressure on the reef, and each 
            one depends on volunteers, donors and community partners to keep running. 
            Have a look through and find the work you want to be part of.</p>

        <div class="row">
            <div class="col-md-6 mb-4" v-for="project in projects" :key="project.id">
                <div class="card h-100">
                    <img class="card-img-top" :src="project.image" :alt="project.alt">
                    <div class="card-body">
                        <h5 class="card-title">{{ project.name }}</h5>
                        <p class="card-text">{{ project.description }}</p>
                        <small>{{ project.location }}</small>
                    </div>
                </div>
            </div>
        </div>

        
    </div>
</template>

<script setup>
    import projects from '/src/data/projects.json'
</script>

<style scoped>
    .projects {
        padding: 100px 40px 40px;
    }
    
    .card-img-top {
        height: 200px;
        object-fit: cover;
        width: 100%;
    }
</style>