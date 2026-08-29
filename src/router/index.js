import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LearnView from '@/views/LearnView.vue'
import LoginView from '../views/AboutView.vue'
import ProjectsView from '@/views/ProjectsView.vue'
import EventsView from '@/views/EventsView.vue'
import ProfileView from '@/views/ProfileView.vue'
import SignupView from '@/views/SignupView.vue'

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
        path: '/learn',
        name: 'Learn',
        component: LearnView
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
        component: ProfileView
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
    }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router