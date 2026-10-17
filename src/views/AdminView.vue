<script setup>
    import { ref, onMounted, computed } from 'vue';
    import { collection, getDocs } from 'firebase/firestore';
    import { db } from '@/firebase';

    const users = ref([])
    const events = ref([])
    const eventSearch = ref({ name: '', date: '', site: '' })
    
    const eventSort = ref({ column: 'name', direction: 'asc' })

    const sortBy = (column) => {
        if (eventSort.value.column === column) {
            eventSort.value.direction = eventSort.value.direction === 'asc' ? 'desc' : 'asc';
        } else {
            eventSort.value.column = column;
            eventSort.value.direction = 'asc';
        }
    }

    const filteredEvents = computed(() => {
        const filtered = events.value.filter((e) =>
            e.name.toLowerCase().includes(eventSearch.value.name.toLowerCase()) &&
            e.date.toLowerCase().includes(eventSearch.value.date.toLowerCase()) &&
            e.site.toLowerCase().includes(eventSearch.value.site.toLowerCase())
        );

        return [...filtered].sort((a, b) => {
            const col = eventSort.value.column;
            const result = String(a[col]).localeCompare(String(b[col]));
            return eventSort.value.direction === 'asc' ? result : -result;
        });
    })

    const eventPage = ref(1)
    const rowsPerPage = 10

    const pagedEvents = computed(() => {
        const start = (eventPage.value - 1) * rowsPerPage;
        return filteredEvents.value.slice(start, start + rowsPerPage);
    })

    const totalPages = computed(() => Math.ceil(filteredEvents.value.length / rowsPerPage));

    onMounted(async () => {
        const usersSnap = await getDocs(collection(db, 'users'));
        users.value = usersSnap.docs.map((d) => ({ id: d.id, ...d.data() }));

        const eventsSnap = await getDocs(collection(db, 'events'));
        events.value = eventsSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
    })

    const volunteerCount = () => users.value.filter((u) => u.role === 'volunteer').length;
    const adminCount = () => users.value.filter((u) => u.role === 'admin').length;

    const userSearch = ref({ firstname: '', lastname: '', email: '', role: '' })
    const userSort = ref({ column: 'firstname', direction: 'asc' })

    const sortUsersBy = (column) => {
        if (userSort.value.column === column) {
            userSort.value.direction = userSort.value.direction === 'asc' ? 'desc' : 'asc';
        } else {
            userSort.value.column = column;
            userSort.value.direction = 'asc';
        }
    }

    const filteredUsers = computed(() => {
        const filtered = users.value.filter((u) =>
            u.firstname.toLowerCase().includes(userSearch.value.firstname.toLowerCase()) &&
            u.lastname.toLowerCase().includes(userSearch.value.lastname.toLowerCase()) &&
            u.email.toLowerCase().includes(userSearch.value.email.toLowerCase()) &&
            u.role.toLowerCase().includes(userSearch.value.role.toLowerCase())
        );

        return [...filtered].sort((a, b) => {
            const col = userSort.value.column;
            const result = String(a[col]).localeCompare(String(b[col]));
            return userSort.value.direction === 'asc' ? result : -result;
        });
    })

</script>

<template>
    <div class="admin">
        <h1 class="mb-4">Admin Dashboard</h1>

        <div class="row g-3 mb-5">
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
                    <th @click="sortBy('name')" class="sortable">Name</th>
                    <th @click="sortBy('date')" class="sortable">Date</th>
                    <th @click="sortBy('site')" class="sortable">Site</th>
                </tr>
                <tr>
                    <th><input class="form-control form-control-sm" placeholder="Search name" v-model="eventSearch.name"></th>
                    <th><input class="form-control form-control-sm" placeholder="Search date" v-model="eventSearch.date"></th>
                    <th><input class="form-control form-control-sm" placeholder="Search site" v-model="eventSearch.site"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="event in pagedEvents" :key="event.id">
                    <td>{{ event.name }}</td>
                    <td>{{ event.date }}</td>
                    <td>{{ event.site }}</td>
                </tr>
            </tbody>
        </table>
        <div class="d-flex align-items-center gap-3">
            <button class="btn btn-sm btn-outline-secondary" :disabled="eventPage === 1" @click="eventPage--">Previous</button>
            <span>Page {{ eventPage }} of {{ totalPages }}</span>
            <button class="btn btn-sm btn-outline-secondary" :disabled="eventPage >= totalPages" @click="eventPage++">Next</button>
        </div>

        <h5 class="mb-3 mt-5">Registered users</h5>
        <table class="table">
            <thead>
                <tr>
                    <th @click="sortUsersBy('firstname')" class="sortable">First Name</th>
                    <th @click="sortUsersBy('lastname')" class="sortable">Last Name</th>
                    <th @click="sortUsersBy('email')" class="sortable">Email</th>
                    <th @click="sortUsersBy('role')" class="sortable">Role</th>
                </tr>
                <tr>
                    <th><input class="form-control form-control-sm" placeholder="Search first name" v-model="userSearch.firstname"></th>
                    <th><input class="form-control form-control-sm" placeholder="Search last name" v-model="userSearch.lastname"></th>
                    <th><input class="form-control form-control-sm" placeholder="Search email" v-model="userSearch.email"></th>
                    <th><input class="form-control form-control-sm" placeholder="Search role" v-model="userSearch.role"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in filteredUsers" :key="user.id">
                    <td>{{ user.firstname }}</td>
                    <td>{{ user.lastname }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.role }}</td>
                </tr>
            </tbody>
        </table>

    </div>
</template>
<style scoped>
    .admin {
        padding: 100px 40px 40px
    }

    .sortable 
    { 
        cursor: pointer; 
    }
</style>