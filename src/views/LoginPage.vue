<template>
    <form class="min-h-screen m-10" @submit.prevent>
        <div class="mb-5">
            <label for="username" class="block mb-2 font-bold">Username</label>
            <input id="username" v-model="username" type="text" placeholder="Username">
        </div>
        <div>
            <label for="password" class="block mb-2 font-bold">Password</label>
            <input id="password" v-model="password" type="password" placeholder="Password">
        </div>
        <button @click="logUserIn" class=" mt-4 bg-green-500 px-4 py-2 hover:bg-green-800 hover:text-white">Login</button>
    </form>
</template>

<script setup>
// Importing necessary functions and objects from the 'vue' and 'vue-router' libraries
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// Importing the useAuth function from a custom module
import { useAuth } from '../composables/useAuth'

// Using the useAuth function to get login and logout functions
const { login, logout } = useAuth()

// Creating instances of the router and route from vue-router
const router = useRouter()
const route = useRoute()

// Creating reactive variables for username and password
const username = ref('')
const password = ref('')

// Defining a function to log in the user
const logUserIn = async () => {
    // Checking if the login was successful
    if (await login(username.value, password.value)) {
        // If successful, checking if there is a redirect query parameter in the URL
        if (route.query.redirect) {
            // If redirect parameter exists, navigating to the specified route
            router.push(route.query.redirect)
        } else {
            // If no redirect parameter, navigating to the 'SettingsPage' route
            router.push({ name: 'SettingsPage' })
        }
    } else {
        // If login was not successful, calling the logout function
        logout()
    }
}
</script>