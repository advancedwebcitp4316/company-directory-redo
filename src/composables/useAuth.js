// Importing router from the '../router' file
import router from '../router'

// Importing necessary functions and objects from various libraries
import { firebaseApp } from './useFirebase'
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { useAuth as firebaseAuth } from '@vueuse/firebase/useAuth'

// Creating an authentication instance using getAuth function from Firebase Authentication
const auth = getAuth(firebaseApp)

// Destructuring properties from the result of the useAuth function
const { isAuthenticated, user } = firebaseAuth(auth)

// Exporting a custom useAuth function
export const useAuth = () => {
    // Defining a login function that takes a username and password
    const login = async (username, password) => {
        // Signing in with the provided username and password using signInWithEmailAndPassword
        await signInWithEmailAndPassword(auth, username, password)
        // Returning the value of isAuthenticated after the login operation
        return isAuthenticated.value
    }

    // Defining a logout function
    const logout = async () => {
        // Signing out using the signOut function
        await signOut(auth)
        // Navigating to the 'Home' route after logout
        router.push({ name: 'Home' })
    }

    // Returning an object with isAuthenticated, user, login, and logout
    return { isAuthenticated, user, login, logout }
}
