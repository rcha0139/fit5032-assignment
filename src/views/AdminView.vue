<script setup>

    import { ref, onMounted, computed } from 'vue';
    import { collection, getDocs } from 'firebase/firestore';
    import { db } from '@/firebase';
    import { Doughnut } from 'vue-chartjs'
    import { Chart, registerables } from 'chart.js'
    import { httpsCallable } from 'firebase/functions';
    import { functions } from '@/firebase';

    Chart.register(...registerables)

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

    const roleChartData = computed(() => ({
        labels: ['Volunteers', 'Admins'],
        datasets: [{
            data: [volunteerCount(), adminCount()],
            backgroundColor: ['#006989', '#A3BAC3']
        }]
    }))

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

    const userPage = ref(1)

    const pagedUsers = computed(() => {
        const start = (userPage.value - 1) * rowsPerPage;
        return filteredUsers.value.slice(start, start + rowsPerPage);
    })

    const userTotalPages = computed(() => Math.ceil(filteredUsers.value.length / rowsPerPage));

    const exportCsv = (rows, filename) => {
        // bail if there's nothing
        if (rows.length === 0) return;

        // get column names from first object's keys
        const headers = Object.keys(rows[0]);

        // gives headers and structure for the csv file
        const lines = [
            headers.join(','),
            ...rows.map((row) => headers.map((h) => `"${row[h]}"`).join(','))
        ];
        const csv = lines.join('\n');

        const blob = new Blob([csv], { type: 'text/csv' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
        URL.revokeObjectURL(link.href);

    }

    const emailCsv = async () => {
        const headers = Object.keys(filteredUsers.value[0]);
        const lines = [
            headers.join(','),
            ...filteredUsers.value.map((row) => headers.map((h) => `"${row[h]}"`).join(','))
        ];
        const csv = lines.join('\n');

        const sendEmail = httpsCallable(functions, 'sendEmail');
        try {
            await sendEmail({
                to: 'rcha0139@student.monash.edu',
                subject: 'Registered users report',
                body: 'Please find the current user list attached.',
                attachment: btoa(csv),
                filename: 'users.csv'
            });
        } catch (e) {
            console.error('failed', e);
        }
    }

    const newsletter = ref({ subject: '', body: '' });

    const selectedUsers = ref([]);
    const newsletterSending = ref(false);
    const newsletterResult = ref(null);

    const sendNewsletter = async () => {
        if (selectedUsers.value.length === 0) return;
        newsletterSending.value = true;
        newsletterResult.value = null;

        const sendEmail = httpsCallable(functions, 'sendEmail');
        try {
            await sendEmail({
                to: selectedUsers.value,
                subject: newsletter.value.subject,
                body: newsletter.value.body,
                attachment: btoa(newsletter.value.body),
                filename: 'newsletter.txt'
            });
            newsletterResult.value = `Sent to ${selectedUsers.value.length} recipients.`;
        } catch (e) {
            newsletterResult.value = 'Failed to send.';
        }
        newsletterSending.value = false;
    }

</script>

<template>
    <div class="admin">
        <h1 class="mb-4">Admin Dashboard</h1>

    <div class="row g-3 mb-4">
        <div class="col-md-7">
            <div class="row g-3 h-100">
                <div class="col-6">
                    <div class="card h-100">
                        <div class="card-body text-center">
                            <h2>{{ users.length }}</h2>
                            <p class="mb-0 text-muted">Registered users</p>
                        </div>
                    </div>
                </div>
                <div class="col-6">
                    <div class="card h-100">
                        <div class="card-body text-center">
                            <h2>{{ volunteerCount() }}</h2>
                            <p class="mb-0 text-muted">Volunteers</p>
                        </div>
                    </div>
                </div>
                <div class="col-6">
                    <div class="card h-100">
                        <div class="card-body text-center">
                            <h2>{{ adminCount() }}</h2>
                            <p class="mb-0 text-muted">Admins</p>
                        </div>
                    </div>
                </div>
                <div class="col-6">
                    <div class="card h-100">
                        <div class="card-body text-center">
                            <h2>{{ events.length }}</h2>
                            <p class="mb-0 text-muted">Upcoming Events</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-5">
            <h5 class="mb-3">Users by role</h5>
            <div style="height: 220px">
                <Doughnut :data="roleChartData" :options="{ maintainAspectRatio: false }" />
            </div>
        </div>
    </div>
        <h5 class="mb-3">Upcoming events</h5>
        <button class="btn btn-sm btn-outline-secondary mb-2" @click="exportCsv(filteredEvents, 'events.csv')">Export CSV</button>
        <table class="table">
            <thead>
                <tr>
                    <th @click="sortBy('name')" class="sortable" tabindex="0" @keydown.enter="sortBy('name')">Name</th>
                    <th @click="sortBy('date')" class="sortable" tabindex="0" @keydown.enter="sortBy('date')">Date</th>
                    <th @click="sortBy('site')" class="sortable" tabindex="0" @keydown.enter="sortBy('site')">Site</th>
                </tr>
                <tr>
                    <th><input class="form-control form-control-sm" placeholder="Search name" aria-label="Search events by name" v-model="eventSearch.name"></th>
                    <th><input class="form-control form-control-sm" placeholder="Search date" aria-label="Search events by date" v-model="eventSearch.date"></th>
                    <th><input class="form-control form-control-sm" placeholder="Search site" aria-label="Search events by site" v-model="eventSearch.site"></th>
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

    <div class="row g-3 mb-3" style="max-width: 600px">
        <div class="col-12">
            <label for="newsletter-subject" class="form-label">Newsletter subject</label>
            <input id="newsletter-subject" class="form-control" v-model="newsletter.subject">
        </div>
        <div class="col-12">
            <label for="newsletter-body" class="form-label">Message</label>
            <textarea id="newsletter-body" class="form-control" rows="4" v-model="newsletter.body"></textarea>
        </div>
    </div>

    <button class="btn btn-sm btn-outline-secondary mb-2" @click="exportCsv(filteredUsers, 'users.csv')">Export CSV</button>
    <button class="btn btn-sm btn-outline-secondary mb-2 ms-2" @click="emailCsv">Email CSV</button>
    <button class="btn btn-sm btn-outline-secondary mb-2 ms-2" @click="sendNewsletter" :disabled="selectedUsers.length === 0 || newsletterSending">
        Send newsletter ({{ selectedUsers.length }})
    </button>
    <span v-if="newsletterResult" class="ms-3 text-success">{{ newsletterResult }}</span>
        <table class="table">
            <thead>
                <tr>
                    <th><span class="visually-hidden">Select recipient</span></th>
                    <th @click="sortUsersBy('firstname')" class="sortable" tabindex="0" @keydown.enter="sortUsersBy('firstname')">First Name</th>
                    <th @click="sortUsersBy('lastname')" class="sortable" tabindex="0" @keydown.enter="sortUsersBy('lastname')">Last Name</th>
                    <th @click="sortUsersBy('email')" class="sortable" tabindex="0" @keydown.enter="sortUsersBy('email')">Email</th>
                    <th @click="sortUsersBy('role')" class="sortable" tabindex="0" @keydown.enter="sortUsersBy('role')">Role</th>
                </tr>
                <tr>
                    <th></th>
                    <th><input class="form-control form-control-sm" placeholder="Search first name" aria-label="Search users by first name" v-model="userSearch.firstname"></th>
                    <th><input class="form-control form-control-sm" placeholder="Search last name" aria-label="Search users by last name" v-model="userSearch.lastname"></th>
                    <th><input class="form-control form-control-sm" placeholder="Search email" aria-label="Search users by email" v-model="userSearch.email"></th>
                    <th><input class="form-control form-control-sm" placeholder="Search role" aria-label="Search users by role" v-model="userSearch.role"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in pagedUsers" :key="user.id">
                    <td><input type="checkbox" :value="user.email" v-model="selectedUsers" :aria-label="`Select ${user.firstname} ${user.lastname} as newsletter recipient`"></td>
                    <td>{{ user.firstname }}</td>
                    <td>{{ user.lastname }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.role }}</td>
                </tr>
            </tbody>
        </table>
        <div class="d-flex align-items-center gap-3">
            <button class="btn btn-sm btn-outline-secondary" :disabled="userPage === 1" @click="userPage--">Previous</button>
            <span>Page {{ userPage }} of {{ userTotalPages }}</span>
            <button class="btn btn-sm btn-outline-secondary" :disabled="userPage >= userTotalPages" @click="userPage++">Next</button>
        </div>
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

    .sortable:focus-visible {
        outline: 2px solid #006989;
        outline-offset: -2px;
    }
</style>