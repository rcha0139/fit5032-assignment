<script setup>
import { ref, onMounted } from 'vue';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';

const events = ref([]);

onMounted(async () => {
    const snap = await getDocs(collection(db, 'events'));
    events.value = snap.docs.map((d) => ({ id: d.id, ...d.data() })).slice(0, 3);
});
</script>

<template>
    <div class="home">

        <section class="hero text-white text-center">
            <div class="container">
                <h1 class="display-4 mb-3">Restore the Reef</h1>
                <p class="lead mb-4 mx-auto hero-text">
                    The Great Barrier Reef has lost half its coral cover in three decades.
                    We grow heat-resilient coral, restore water quality and bring volunteers
                    into the water to help it recover.
                </p>
                <RouterLink to="/projects" class="btn btn-light btn-lg me-2">Our projects</RouterLink>
                <RouterLink to="/signup" class="btn btn-outline-light btn-lg">Join us</RouterLink>
            </div>
        </section>

        <div class="container py-5">

            <div class="row align-items-center g-5 mb-5">
                <div class="col-md-6">
                    <img class="feature-img" src="/images/bleached-coral.jpg" alt="Bleached coral on a reef flat">
                </div>
                <div class="col-md-6 px-md-4">
                    <h2 class="h4">The problem</h2>
                    <p>
                        Five mass bleaching events in eight years have pushed the reef to its
                        limits. Warming water, sediment runoff and nutrient pollution are all
                        working against recovery.
                    </p>
                </div>
            </div>

            <div class="row align-items-center g-5 mb-5 flex-md-row-reverse">
                <div class="col-md-6">
                    <img class="feature-img" src="/images/coral-nursery.jpg" alt="Coral fragments growing on a nursery frame">
                </div>
                <div class="col-md-6 px-md-4">
                    <h2 class="h4">What we do</h2>
                    <p>
                        We run offshore coral nurseries, work with landholders to cut runoff,
                        and train divers to monitor reef health across the marine park.
                    </p>
                </div>
            </div>

            <div class="row align-items-center g-5 mb-5">
                <div class="col-md-6">
                    <img class="feature-img" src="/images/reef-monitoring.jpg" alt="A diver recording coral condition on a survey slate">
                </div>
                <div class="col-md-6 px-md-4">
                    <h2 class="h4">How you can help</h2>
                    <p>
                        Join a beach clean-up, train as a reef health surveyor, or dive with
                        our restoration team. No experience needed for most of what we do.
                    </p>
                </div>
            </div>

            <h2 class="h4 mb-3">Upcoming events</h2>
            <div class="row g-4 mb-4">
                <div class="col-md-4" v-for="event in events" :key="event.id">
                    <div class="card h-100">
                        <div class="card-body">
                            <h3 class="h6 card-title">{{ event.name }}</h3>
                            <p class="card-text">
                                <small class="text-muted">{{ event.date }} · {{ event.site }}</small>
                            </p>
                            <p class="card-text">{{ event.description }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <RouterLink to="/events" class="btn btn-primary">See all events</RouterLink>

        </div>
    </div>
</template>

<style scoped>
    .hero {
        background-image: linear-gradient(rgba(0, 54, 71, 0.5), rgba(0, 54, 71, 0.5)),
                        url('/images/hero-reef.jpg');
        background-size: cover;
        background-position: center 35%;
        padding: 180px 20px 120px;
    }

    .hero h1 {
        font-weight: 700;
        text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
    }

    .hero .lead {
        font-weight: 500;
        text-shadow: 0 1px 6px rgba(0, 0, 0, 0.4);
    }

    .hero-text {
        max-width: 640px;
    }

    .btn-primary {
        background-color: #006989;
        border-color: #006989;
    }

    .btn-primary:hover {
        background-color: #00587a;
        border-color: #00587a;
    }

    .feature-img {
        width: 100%;
        height: 280px;
        object-fit: cover;
        border-radius: 8px;
    }
</style>