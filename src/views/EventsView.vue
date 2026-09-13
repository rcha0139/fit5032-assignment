<script setup>
    import { collection, getDocs } from 'firebase/firestore';
    import { ref, onMounted } from 'vue';
    import { db } from '@/firebase';

    const events = ref([])
    const ratings = ref([])

    const averageFor = (eventId) => {
        const forThisEvent = ratings.value.filter((r) => r.eventId === eventId);
        if (forThisEvent.length === 0) return null;
        const total = forThisEvent.reduce((sum, r) => sum + r.score, 0);

        return total / forThisEvent.length;
    }

    onMounted(async () => {
        const eventsSnapshot = await getDocs(collection(db, 'events'));
        const ratingsSnapshot = await getDocs(collection(db, 'ratings'));

        events.value = eventsSnapshot.docs.map((doc) => ({ 
            id: doc.id, 
            ...doc.data() 
        }));

        ratings.value = ratingsSnapshot.docs.map((doc) => doc.data())
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

                        <p class="card-text" v-if="averageFor(event.id)">
                            {{ averageFor(event.id).toFixed(1) }} out of 5
                        </p>
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