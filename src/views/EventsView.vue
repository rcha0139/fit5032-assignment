<script setup>
    import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
    import { ref, onMounted } from 'vue';
    import { db } from '@/firebase';
    import { currentUser } from '@/composables/useAuth';

    const events = ref([])
    const ratings = ref([])

    const averageFor = (eventId) => {
        const forThisEvent = ratings.value.filter((r) => r.eventId === eventId);
        if (forThisEvent.length === 0) return null;
        const total = forThisEvent.reduce((sum, r) => sum + r.score, 0);

        return total / forThisEvent.length;
    }

    const loadRatings = async () => {
        const snap = await getDocs(collection(db, 'ratings'));
        ratings.value = snap.docs.map((d) => d.data());
    }

    const rate = async (eventId, score) => {
        const docId = `${eventId}_${currentUser.value.uid}`
        await setDoc(doc(db, 'ratings', docId), { eventId, uid: currentUser.value.uid, score })
        await loadRatings()
    }

    onMounted(async () => {
        const eventsSnapshot = await getDocs(collection(db, 'events'));

        events.value = eventsSnapshot.docs.map((doc) => ({ 
            id: doc.id, 
            ...doc.data() 
        }));

        await loadRatings()
})

const countFor = (eventId) => {
    return ratings.value.filter((r) => r.eventId === eventId).length;
}

const myRatingFor = (eventId) => {
    const mine = ratings.value.find((r) => r.eventId === eventId && r.uid === currentUser.value?.uid);
    return mine ? mine.score : 0;
}

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
                            {{ averageFor(event.id).toFixed(1) }} out of 5 from {{ countFor(event.id) }} {{ countFor(event.id) === 1 ? 'rating' : 'ratings' }}
                        </p>
                        
                        <div v-if="currentUser">
                            <small class="text-muted d-block">Your rating</small>
                            
                            <span class="star" v-for="n in 5" :key="n" @click="rate(event.id, n)">
                                <i :class="n <= myRatingFor(event.id) ? 'bi bi-star-fill' : 'bi bi-star'"></i>
                            </span>
                        </div>
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

    .star {
        cursor: pointer;
    }

</style>