<template>
    <main>
        <!-- Page header -->
        <section class="about-banner text-white">
            <div class="container">
                <h1 class="fw-bold">About Restore the Reef</h1>
                <p class="lead mb-0" style="max-width: 700px;">
                    We are a volunteer-led not-for-profit working with traditional owners,
                    dive operators and marine scientists to restore coral on the Great
                    Barrier Reef.
                </p>
            </div>
        </section>

        <!-- Mission -->
        <section class="container py-5">
            <div class="row justify-content-center">
                <div class="col-lg-8">
                    <h2 class="h4 fw-bold mb-3">Our mission</h2>
                    <p>
                        The reef has lost significant coral cover to bleaching, cyclones and
                        declining water quality. Restoring it at scale is slow work that needs
                        many hands, so we exist to turn public goodwill into measured,
                        repeatable restoration activity in the waters off far north Queensland.
                    </p>
                    <p class="mb-0">
                        Every dive, planting day and survey we run feeds data back to our
                        partners, so the time volunteers give is recorded as evidence of what
                        is working and what is not.
                    </p>
                </div>
            </div>
        </section>

        <!-- What we do -->
        <section class="bg-light py-5">
            <div class="container">
                <h2 class="h4 fw-bold text-center mb-5">What we do</h2>
                <div class="row g-4">
                    <div class="col-md-4">
                        <div class="card h-100 border-0 shadow-sm">
                            <div class="card-body">
                                <i class="bi bi-flower1 fs-2 mb-3 d-block" style="color: #003647;" aria-hidden="true"></i>
                                <h3 class="h6 fw-bold">Coral nurseries</h3>
                                <p class="card-text mb-0">
                                    We grow coral fragments on underwater frames and transplant
                                    them onto damaged sections of reef once they are strong
                                    enough to survive on their own.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card h-100 border-0 shadow-sm">
                            <div class="card-body">
                                <i class="bi bi-clipboard-data fs-2 mb-3 d-block" style="color: #003647;" aria-hidden="true"></i>
                                <h3 class="h6 fw-bold">Reef monitoring</h3>
                                <p class="card-text mb-0">
                                    Trained volunteers record coral cover, fish counts and
                                    bleaching signs on regular surveys, building a long record
                                    of how each site is tracking.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card h-100 border-0 shadow-sm">
                            <div class="card-body">
                                <i class="bi bi-people fs-2 mb-3 d-block" style="color: #003647;" aria-hidden="true"></i>
                                <h3 class="h6 fw-bold">Community programs</h3>
                                <p class="card-text mb-0">
                                    Beach clean-ups, mangrove planting and information nights
                                    give people a way to help from shore, and keep local
                                    support behind the work offshore.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Impact -->
        <section class="container py-5">
            <h2 class="h4 fw-bold text-center mb-5">Our impact so far</h2>
            <div class="row text-center g-4">
                <div class="col-6 col-md-3">
                    <p class="h2 fw-bold mb-1" style="color: #003647;">14,200</p>
                    <p class="text-muted mb-0">Coral fragments planted</p>
                </div>
                <div class="col-6 col-md-3">
                    <p class="h2 fw-bold mb-1" style="color: #003647;">9</p>
                    <p class="text-muted mb-0">Restoration sites</p>
                </div>
                <div class="col-6 col-md-3">
                    <p class="h2 fw-bold mb-1" style="color: #003647;">1,860</p>
                    <p class="text-muted mb-0">Registered volunteers</p>
                </div>
                <div class="col-6 col-md-3">
                    <p class="h2 fw-bold mb-1" style="color: #003647;">6</p>
                    <p class="text-muted mb-0">Research partners</p>
                </div>
            </div>
        </section>

        <!-- Call to action -->
        <section class="bg-light py-5">
            <div class="container text-center">
                <h2 class="h4 fw-bold mb-3">Get involved</h2>
                <p class="mb-4 mx-auto" style="max-width: 600px;">
                    Most of our work happens on weekends and no experience is needed to
                    start. Create an account to book onto an event, or browse the sites
                    we are working on.
                </p>
                <RouterLink to="/events" class="btn btn-lg me-2" style="background-color: #003647; color: white;">
                    See upcoming events
                </RouterLink>
                <RouterLink to="/reefsites" class="btn btn-lg btn-outline-dark">
                    Explore reef sites
                </RouterLink>
            </div>
        </section>
    </main>
</template>

<script setup>
    import { RouterLink } from 'vue-router';
</script>

<style scoped>
    .about-banner {
        background-image: linear-gradient(rgba(0, 54, 71, 0.55), rgba(0, 54, 71, 0.55)),
                        url('/images/about-banner.jpg');
        background-size: cover;
        background-position: center 40%;
        padding: 140px 0 90px;
    }
</style>