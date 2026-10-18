import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import ProjectsView from '@/views/ProjectsView.vue'
import EventsView from '@/views/EventsView.vue'
import ProfileView from '@/views/ProfileView.vue'
import SignupView from '@/views/SignupView.vue'
import AdminView from '@/views/AdminView.vue'
import ReefSitesView from '@/views/ReefSitesView.vue'

import { getCurrentUser } from '@/composables/useAuth.js'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/firebase.js'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeView
    },
    {
        path: '/about',
        name: 'About',
        component: AboutView
    },
    {
        path: '/projects',
        name: 'Projects',
        component: ProjectsView
    },
        {
        path: '/events',
        name: 'Events',
        component: EventsView
    },
    {
        path: '/profile',
        name: 'Profile',
        component: ProfileView,
        meta: { requiresAuth: true }
    },
    {
        path: '/signup',
        name: 'Signup',
        component: SignupView
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginView
    },
    {
        path: '/admin',
        name: 'Admin',
        component: AdminView,
        meta: { requiresAdmin: true }
    },
    {
        path: '/reefsites',
        name: 'ReefSites',
        component: ReefSitesView,
    }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from) => {
    if (!to.meta.requiresAuth && !to.meta.requiresAdmin) {
        return
    }

    const user = await getCurrentUser()

    if (!user) {
        return '/login'
    }

    if (to.meta.requiresAdmin) {
        const snap = await getDoc(doc(db, 'users', user.uid))
        const role = snap.data()?.role
        console.log(role)

        if (role !== 'admin') {
            return '/'
        }
    }

    return true
});

export default router