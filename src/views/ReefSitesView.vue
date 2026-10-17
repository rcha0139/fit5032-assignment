<script setup>
    import { ref, onMounted } from 'vue';
    import { collection, getDocs } from 'firebase/firestore';
    import { db } from '@/firebase';
    import mapboxgl from 'mapbox-gl';
    import 'mapbox-gl/dist/mapbox-gl.css';

    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

    const sites = ref([]);
    const wharfs = ref([]);
    const mapContainer = ref(null);
    const selectedSite = ref('');
    const routeInfo = ref(null);
    let map = null;

    const flyToSite = () => {
        const site = sites.value.find((s) => s.id === selectedSite.value);
        if (!site) return;
        map.flyTo({ center: [site.long, site.lat], zoom: 13, duration: 2000 });
    }

    const getDirections = () => {
        const site = sites.value.find((s) => s.id === selectedSite.value);
        if (!site) return;

        const wharf = wharfs.value.find((w) => w.name === site.wharf);
        if (!wharf) return;

        navigator.geolocation.getCurrentPosition(async (position) => {
            const from = `${position.coords.longitude},${position.coords.latitude}`;
            const to = `${wharf.long},${wharf.lat}`;

            const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${from};${to}?geometries=geojson&access_token=${mapboxgl.accessToken}`;
            const response = await fetch(url);
            const data = await response.json();
            const route = data.routes[0];

            routeInfo.value = {
                wharf: wharf.name,
                distance: (route.distance / 1000).toFixed(1),
                duration: Math.round(route.duration / 60)
            };

            if (map.getSource('route')) {
                map.getSource('route').setData({ type: 'Feature', geometry: route.geometry });
            } else {
                map.addSource('route', { type: 'geojson', data: { type: 'Feature', geometry: route.geometry } });
                map.addLayer({
                    id: 'route',
                    type: 'line',
                    source: 'route',
                    paint: { 'line-color': '#006989', 'line-width': 4 }
                });
            }

            map.fitBounds([
                [position.coords.longitude, position.coords.latitude],
                [wharf.long, wharf.lat]
            ], { padding: 60 });
        }, (err) => {
            console.error('geolocation failed', err);
        });
    }

    onMounted(async () => {
        const snap = await getDocs(collection(db, 'reefsites'));
        sites.value = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

        const wharfSnap = await getDocs(collection(db, 'wharfs'));
        wharfs.value = wharfSnap.docs.map((d) => ({ id: d.id, ...d.data() }));

        map = new mapboxgl.Map({
            container: mapContainer.value,
            style: 'mapbox://styles/mapbox/outdoors-v12',
            center: [145.99, -16.85],
            zoom: 9
        });

        sites.value.forEach((site) => {
            new mapboxgl.Marker()
                .setLngLat([site.long, site.lat])
                .setPopup(new mapboxgl.Popup().setHTML(`<strong>${site.name}</strong><br>${site.status}`))
                .addTo(map);
        });
    });
</script>

<template>
    <div class="reefsites">
        <h1 class="mb-4">Reef Monitoring Sites</h1>

        <select class="form-select mb-3" style="max-width: 300px" v-model="selectedSite" @change="flyToSite">
            <option value="">Select a reef site...</option>
            <option v-for="site in sites" :key="site.id" :value="site.id">{{ site.name }}</option>
        </select>

        <button class="btn btn-sm btn-outline-secondary mb-3" @click="getDirections" :disabled="!selectedSite">
            Directions to departure wharf
        </button>

        <p v-if="routeInfo" class="mb-3">
            {{ routeInfo.distance }} km to {{ routeInfo.wharf }}, about {{ routeInfo.duration }} minutes drive.
        </p>

        <div ref="mapContainer" style="height: 500px"></div>
    </div>
</template>

<style scoped>
    .reefsites { padding: 100px 40px 40px }
</style>