<script setup>
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';

const formData = ref({
    email: '',
    password: '',
    firstname: '',
    lastname: ''
})

const submitForm = () => {
    validateEmail(true);
    validatePassword(true);
    validateFirstName(true);
    validateLastName(true);

    if (!errors.value.email && !errors.value.password && !errors.value.firstname && !errors.value.lastname) {
        console.log(formData.value)
        register();
    }    
}

const clearForm = () => {
    formData.value = {
        email: '',
        password: '',
        firstname: '',
        lastname: '',
    }
    errors.value = {
        email: null,
        password: null,
        firstname: null,
        lastname: null,
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
  } else {
    
    const problems = [];
    if (password.length < minLength) problems.push(`Must be at least ${minLength} characters long.`);
    if (!hasUppercase)   problems.push("Must contain at least one uppercase letter.");
    if (!hasLowercase)   problems.push("Must contain at least one lowercase letter.");
    if (!hasNumber)      problems.push("Must contain at least one number.");
    if (!hasSpecialChar) problems.push("Must contain at least one special character.");

    errors.value.password = problems.length && blur ? problems : null;
  }
};

const validateFirstName = (blur) => {
    if (formData.value.firstname.length == 0) {
        if (blur) errors.value.firstname = "First name is required."
    }
    else {
        errors.value.firstname = null;
    }
}

const validateLastName = (blur) => {
    if (formData.value.lastname.length == 0) {
        if (blur) errors.value.lastname = "Last name is required."
    }
    else {
        errors.value.lastname = null;
    }
}

const auth = getAuth()
const router = useRouter()

const register = () => {
    createUserWithEmailAndPassword(auth, formData.value.email, formData.value.password)
    .then((data) => {
        console.log("Firebase Registration Successful!")
        router.push("/")
        clearForm();
    }).catch((error) => {
        console.log(error.code);
    })
};
</script>

<template>
    <div class="container signup mt-5">
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
                        <ul v-if="Array.isArray(errors.password)" class="error text-danger">
                            <li v-for="(msg, i) in errors.password" :key="i">{{ msg }}</li>
                        </ul>
                        <div v-else-if="errors.password" class="text-danger">{{ errors.password }}</div>
                    </div>
                
                    <div class="row mb-3">
                        <div class="col-md-6 mb-3 mb-md-0">
                            <label for="firstname" class="form-label">First Name</label>
                            <input type="text" class="form-control" id="firstname"
                                @blur="() => validateFirstName(true)" 
                                @input="() => validateFirstName(false)"
                            v-model="formData.firstname">
                            <div v-if="errors.firstname" class="text-danger">{{ errors.firstname }}</div>
                        </div>

                        <div class="col-md-6">
                            <label for="lastname" class="form-label">Last Name</label>
                            <input type="text" class="form-control" id="lastname" 
                                @blur="() => validateLastName(true)" 
                                @input="() => validateLastName(false)"
                            v-model="formData.lastname">
                            <div v-if="errors.lastname" class="text-danger">{{ errors.lastname }}</div>
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
</template>

<style scoped>
    .signup {
        padding: 100px 40px 40px;
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

    .signup {
        max-width: 720px;
    }

</style>

