import { createRouter, createWebHistory } from 'vue-router'

import { useAuth } from './composables/useAuth'
const { isAuthenticated } = useAuth()

import HomePage from '@/views/HomePage.vue'
import CardDetails from './views/CardDetails.vue'
import LoginPage from './views/LoginPage.vue'
import SettingsPage from './views/SettingsPage.vue'

const routes = [
  { path: '/company-directory-redo/', name: 'Home', component: HomePage },
  { path: '/company-directory-redo/other', name: 'Other', component: () => import('@/views/OtherPage.vue') },
  { path: '/company-directory-redo/employees/:id', name: 'CardDetails', component: CardDetails },
  { path: '/company-directory-redo/login', name: 'LoginPage', component: LoginPage },
  { path: '/company-directory-redo/settings', name: 'SettingsPage', component: SettingsPage, meta: {requiresAuth: true} },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})


//registering a navigation guard that will be executed before each route navigation.

router.beforeEach((to, _, next) => {
  // Check if the destination route requires authentication
  // and if the user is not authenticated
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    // Redirect to the 'Login' route with a query parameter
    // indicating the original route's full path
    next({ name: 'LoginPage', query: { redirect: to.fullPath } })
  } else {
    // Continue with the navigation if no authentication is required
    // or if the user is authenticated
    next()
  }
})

export default router
