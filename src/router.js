import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from './composables/useAuth'
const {isAuthenticated} = useAuth()
import HomePage from '@/views/HomePage.vue'
import CardDetails from './views/CardDetails.vue'
import LoginPage from './views/LoginPage.vue'
import SettingsPage from './views/SettingsPage.vue'

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/other', name: 'Other', component: () => import('@/views/OtherPage.vue') },
  { path: '/employees/:id', name: 'CardDetails', component: CardDetails },
  { path: '/login', name: 'LoginPage', component: LoginPage },
  { path: '/settings', name: 'SettingsPage', component: SettingsPage, meta: {requiresAuth: true} },
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
    next({ name: 'Login', query: { redirect: to.fullPath } })
  } else {
    // Continue with the navigation if no authentication is required
    // or if the user is authenticated
    next()
  }
})

export default router
