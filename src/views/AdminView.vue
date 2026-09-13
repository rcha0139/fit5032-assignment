<script setup>
    import { ref, onMounted } from 'vue';
    import { collection, getDocs } from 'firebase/firestore';
    import { db } from '@/firebase';

    const users = ref([])
    const events = ref([])

    onMounted(async () => {
        const usersSnap = await getDocs(collection(db, 'users'));
        users.value = usersSnap.docs.map((d) => ({ id: d.id, ...d.data() }));

        const eventsSnap = await getDocs(collection(db, 'events'));
        events.value = eventsSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
    })

    const volunteerCount = () => users.value.filter((u) => u.role === 'volunteer').length;
    const adminCount = () => users.value.filter((u) => u.role === 'admin').length;

</script>

<template>
    <div class="admin">
        <h1 class="mb-4">Admin Dashboard</h1>

        <div class="row g-3 mb-4">
            <div class="col-md-3">
                <div class="card">
                    <div class="card-body text-center">
                        <h2>{{ users.length }}</h2>
                        <p class="mb-0 text-muted">Registered users</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card">
                    <div class="card-body text-center">
                        <h2>{{ volunteerCount() }}</h2>
                        <p class="mb-0 text-muted">Volunteers</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card">
                    <div class="card-body text-center">
                        <h2>{{ adminCount() }}</h2>
                        <p class="mb-0 text-muted">Admins</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card">
                    <div class="card-body text-center">
                        <h2>{{ events.length }}</h2>
                        <p class="mb-0 text-muted">Upcoming Events</p>
                    </div>
                </div>
            </div>
        </div>

        <h5 class="mb-3">Upcoming events</h5>
        <table class="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Site</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="event in events" :key="event.id">
                    <td>{{ event.name }}</td>
                    <td>{{ event.date }}</td>
                    <td>{{ event.site }}</td>
                </tr>
            </tbody>
        </table>

    </div>
</template>
<style scoped>
    .admin {
        padding: 100px 40px 40px
    }
</style>