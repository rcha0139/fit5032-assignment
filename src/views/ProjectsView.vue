<template>
    <div class="projects">
        <h1>Projects</h1>
        <p>Our work takes place across the length of the Great Barrier Reef, 
            from coral nurseries offshore to catchment restoration on the mainland. 
            Each project below tackles a different pressure on the reef, and each 
            one depends on volunteers, donors and community partners to keep running. 
            Have a look through and find the work you want to be part of.</p>

        <div class="row">
            <div class="col-md-6 col-lg-4" v-for="project in projects" :key="project.id">
                {{ project.name }} ({{ project.description }})
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
    .projects {
        padding: 100px 40px 40px;
    }

</style>