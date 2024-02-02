<template>
    <div class="flex justify-center gap-4 p-8">
        <button @click="prevPage" :disabled="activePage === 1"
            class="rounded-md bg-slate-100 p-2 font-medium text-slate-700 shadow-md">PREV</button>

        <button v-for="page in pages" :key="page" class="rounded-md bg-slate-100 p-2 font-medium text-slate-700 shadow-md"
            :class="page === activePage ? 'bg-yellow-700 text-slate-100 hover:bg-yellow-600' : 'rounded-md bg-slate-100 p-2 font-medium text-slate-700 shadow-md'">
            {{ page }}
        </button>

        <button @click="nextPage" :disabled="activePage === pages"
            class="rounded-md bg-slate-100 p-2 font-medium text-slate-700 shadow-md">NEXT</button>
    </div>
</template>

<script setup>
// Import the 'ref' function from Vue to create reactive variables
import { ref } from 'vue'

// Define reactive variables for the total number of pages and the currently active page
const pages = ref(10)
const activePage = ref(2)

// Function to navigate to the previous page
const prevPage = () => {
    // Check if the active page is greater than 1 to avoid going below the first page
    if (activePage.value > 1) {
        // Decrement the active page value
        activePage.value--
    }
}

// Function to navigate to the next page
const nextPage = () => {
    // Check if the active page is less than the total number of pages to avoid going beyond the last page
    if (activePage.value < pages.value) {
        // Increment the active page value
        activePage.value++
    }
}
</script>
