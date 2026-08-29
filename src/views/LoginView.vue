<script setup>
import { ref } from 'vue'

const formData = ref({
    email: '',
    password: '',
})

const submitForm = () => {
    validateEmail(true);
    validatePassword(true);

    if (!errors.value.email && !errors.value.password) {
        console.log(formData.value)
        clearForm();
    }
    // TODO add 'username/password combination dont match any account' validation
    // when i get firebase
}

const clearForm = () => {
    formData.value = {
        email: '',
        password: '',
    }
}

const errors = ref ({
    email: null,
    password: null,
});

const validateEmail = (blur) => {
    if (formData.value.email.length == 0) {
        if (blur) errors.value.email = "Email is required."
    }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        if (blur) errors.value.email = "Please enter a valid email address."
    }
    else {
        errors.value.email = null;
    }
};

const validatePassword = (blur) => {
  const password = formData.value.password;

  if (password.length == 0) {
    if (blur) errors.value.password = "Password is required.";
  } else {
    errors.value.password = null;
  }
};

</script>

<template>
    <div class="container login">
        <div class="container mt-5">
            <div class="row">
                <div class="col-md-8 offset-md-2">
                    <h1 class="text-center">Login</h1>
                    <form @submit.prevent="submitForm">

                        <div class="mb-3">
                            <label for="email" class="form-label">Email</label>
                            <input type="text" class="form-control" id="email" 
                                @blur="() => validateEmail(true)" 
                                @input="() => validateEmail(false)"
                            v-model="formData.email">
                            <div v-if="errors.email" class="text-danger">{{ errors.email }}</div>
                        </div>

                        <div class="mb-3">
                            <label for="password" class="form-label">Password</label>
                            <input type="password" class="form-control" id="password"
                                @blur="() => validatePassword(true)" 
                                @input="() => validatePassword(false)"
                            v-model="formData.password">
                            <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
                        </div>
                    
                        <div class="text-center">
                            <button type="submit" class="btn btn-primary me-2">Submit</button>
                            <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
                        </div>

                        <p class="text-center mt-3">
                            Don't have an account? <RouterLink to="/signup">Sign Up</RouterLink>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .login {
        padding: 100px 40px 40px;
    }

</style>