<script setup>
    import { collection, getDocs } from 'firebase/firestore';
    import { ref, onMounted } from 'vue';
    import { db } from '@/firebase';

    const events = ref([])

    onMounted(async () => {
        const snapshot = await getDocs(collection(db, 'events'));
        events.value = snapshot.docs.map((doc) => ({ 
            id: doc.id, 
            ...doc.data() 
        }));
        console.log(events.value)
})
</script>

<template>
    <div class="events">
        <h1>Events</h1>
        <div class="row">
            <div class="col-md-6 mb-4" v-for="event in events" :key="event.id">
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">{{ event.name }}</h5>

                        <p class="card-text"><small class="text-muted">{{ event.date }} · {{ event.site }}</small></p>
                        <p class="card-text">{{ event.description }}</p>
                    </div>
                </div> 
            </div>
        </div>
    </div>
</template>

<style scoped>
    .events {
        padding: 100px 40px 40px;
    }

</style>