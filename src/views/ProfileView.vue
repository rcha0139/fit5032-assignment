<script setup>
    import { ref, watch } from 'vue'
    import { userProfile, currentUser } from '@/composables/useAuth';
    import { doc, updateDoc } from 'firebase/firestore';
    import { db } from '@/firebase';

    const formData = ref({ firstname: '', lastname: '' })

    watch(userProfile, (profile) => {

        if (profile) {
            formData.value.firstname = profile.firstname;
            formData.value.lastname = profile.lastname;
        }
    }, { immediate: true });

    const saveProfile = async () => {
        saveMessage.value = null

        validateFirstName(true)
        validateLastName(true)

        if (!errors.value.firstname && !errors.value.lastname) {
            await updateDoc(doc(db, 'users', currentUser.value.uid), {
                firstname: formData.value.firstname,
                lastname: formData.value.lastname
            });

            userProfile.value.firstname = formData.value.firstname;
            userProfile.value.lastname = formData.value.lastname;

            saveMessage.value = "Changes saved."
        }
    }

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

    const errors = ref ({
        firstname: null,
        lastname: null
    });

    const saveMessage = ref(null)

</script>

<template>
    <div class="profile">
        <h1 class="mb-4">Profile</h1>
        <div class="row">
            <div class="col-md-6">
                <p class="mb-3"><strong>Email:</strong> {{ userProfile?.email }}</p>
                <p class="role mb-3"><strong>Role:</strong> {{ userProfile?.role }}</p>

                <hr class="my-4">

                <div class="row mb-3 g-3">
                    <div class="col-md-6">
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
                
                <div class="d-flex align-items-center gap-3 mt-4">
                    <button class="btn btn-primary" @click="saveProfile">Save changes</button>
                    <span v-if="saveMessage" class="text-success">
                        <i class="bi bi-check-circle"></i> {{ saveMessage }}
                    </span>
                </div>
                
            </div>
        </div>
    </div>
</template>

<style scoped>
    .profile {
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

    .role {
        text-transform: capitalize;
    }

</style>