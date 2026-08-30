<script setup>
import { ref } from 'vue'

const formData = ref({
    email: '',
    password: '',
    firstname: '',
    lastname: ''
})

const submitForm = () => {
    validateEmail(true);
    validatePassword(true);

    if (!errors.value.email && !errors.value.password) {
        console.log(formData.value)
        clearForm();
    }
}

const clearForm = () => {
    formData.value = {
        email: '',
        password: '',
        firstname: '',
        lastname: '',
    }
}

const errors = ref ({
    email: null,
    password: null,
    firstname: null,
    lastname: null
});

const validateEmail = (blur) => {
    if (formData.value.email.length == 0) {
        if (blur) errors.value.email = "Email is required."
    }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)) {
        if (blur) errors.value.email = "Please enter a valid email address."
    }
    else {
        errors.value.email = null;
    }
};

const validatePassword = (blur) => {
  const password = formData.value.password;
  const minLength = 12;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (password.length == 0) {
    if (blur) errors.value.password = "Password is required.";
  } else if (password.length < minLength) {
    if (blur) errors.value.password = `Password must be at least ${minLength} characters long.`;
  } else if (!hasUppercase) {
    if (blur) errors.value.password = "Password must contain at least one uppercase letter.";
  } else if (!hasLowercase) {
    if (blur) errors.value.password = "Password must contain at least one lowercase letter.";
  } else if (!hasNumber) {
    if (blur) errors.value.password = "Password must contain at least one number.";
  } else if (!hasSpecialChar) {
    if (blur) errors.value.password = "Password must contain at least one special character.";
  } else {
    errors.value.password = null;
  }
};

</script>

<template>
    <div class="container signup">
        <div class="container mt-5">
            <div class="row">
                <div class="col-md-8 offset-md-2">
                    <h1 class="text-center">Sign Up</h1>
                    <form @submit.prevent="submitForm">

                        <div class="mb-3">
                            <label for="email" class="form-label">Email (required)</label>
                            <input type="text" class="form-control" id="email" 
                                @blur="() => validateEmail(true)" 
                                @input="() => validateEmail(false)"
                            v-model="formData.email">
                            <div v-if="errors.email" class="text-danger">{{ errors.email }}</div>
                        </div>

                        <div class="mb-3">
                            <label for="password" class="form-label">Password (required)</label>
                            <input type="password" class="form-control" id="password"
                                @blur="() => validatePassword(true)" 
                                @input="() => validatePassword(false)"
                            v-model="formData.password">
                            <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
                        </div>
                    
                        <div class="row mb-3">
                            <div class="col-md-6 mb-3 mb-md-0">
                                <label for="firstname" class="form-label">First Name</label>
                                <input type="text" class="form-control" id="firstname" v-model="formData.firstname">
                            </div>
                            <div class="col-md-6">
                                <label for="lastname" class="form-label">Last Name</label>
                                <input type="text" class="form-control" id="lastname" v-model="formData.lastname">
                            </div>
                        </div>

                        <div class="text-center">
                            <button type="submit" class="btn btn-primary me-2">Submit</button>
                            <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
                        </div>

                        <p class="text-center mt-3">
                            Already have an account? <RouterLink to="/login">Login</RouterLink>
                        </p>
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

    .btn-primary {
        background-color: #006989;
        border-color: #006989;
    }

    .btn-primary:hover {
        background-color: #00587a;
        border-color: #00587a;
    }

    a {
        color: #006989;
    }

    a:hover {
        color: #00587a;
    }


</style>

