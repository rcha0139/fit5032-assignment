<script setup>
import { ref } from 'vue'

const formData = ref({
    username: '',
    password: '',
    isAustralian: false,
    gender: '',
    reason: ''
})

const submitForm = () => {
    console.log('Submitted:', formData.value)
}

const clearForm = () => {
    formData.value = {
        username: '',
        password: '',
        isAustralian: false,
        gender: '',
        reason: ''
    }
}
</script>

<template>
    <div class="container signup">
        <div class="container mt-5">
            <div class="row">
                <div class="col-md-8 offset-md-2">
                    <h1 class="text-center">Sign Up</h1>
                    <form @submit.prevent="submitForm">
                        <div class="mb-3">
                            <label for="username" class="form-label">Username</label>
                            <input type="text" class="form-control" id="username" v-model="formData.username">
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">Password</label>
                            <input type="password" class="form-control" id="password" v-model="formData.password">
                        </div>
                    
                        <div class="row mb-3">
                            <div class="col-md-6">
                                <label for="firstname" class="form-label">First Name</label>
                                <input type="text" class="form-control" id="firstname" v-model="formData.firstname">
                            </div>
                            <div class="col-md-6">
                                <label for="lastname" class="form-label">Last Name</label>
                                <input type="lastname" class="form-control" id="lastname" v-model="formData.lastname">
                            </div>
                        </div>

                        <div class="text-center">
                            <button type="submit" class="btn btn-primary me-2">Submit</button>
                            <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .signup {
    padding-top: 70px;
    }
</style>

