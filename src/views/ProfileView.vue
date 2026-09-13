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
    await updateDoc(doc(db, 'users', currentUser.value.uid), {
        firstname: formData.value.firstname,
        lastname: formData.value.lastname
    });
    }
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
                        <input type="text" class="form-control" id="firstname" v-model="formData.firstname">
                    </div>
                    <div class="col-md-6">
                        <label for="lastname" class="form-label">Last Name</label>
                        <input type="text" class="form-control" id="lastname" v-model="formData.lastname">
                    </div>
                </div>
                
                <button class="btn btn-primary mt-3" @click="saveProfile">Save changes</button>
                
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