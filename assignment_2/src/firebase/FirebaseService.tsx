import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, setPersistence, browserLocalPersistence } from 'firebase/auth'
import { collection, getDocs, addDoc } from 'firebase/firestore'
import { firebaseAuth, firebaseDb } from './BaseConfig'
import { LoginFormValues, UserFormValues } from '../interfaces/interface'

// keep user logged in after user exits the browser or closes tab
setPersistence(firebaseAuth, browserLocalPersistence)

//Sign in functionality
export const firebaseSignIn = async ({ email, password }: LoginFormValues) => {
    await signInWithEmailAndPassword(firebaseAuth, email, password)
};

// save an user 
const firebaseSaveUser = async (name: string, email: string) => {
    try {
        const docRef = await addDoc(collection(firebaseDb, "users"), {
            userName: name,
            userEmail: email
        })
        console.log("Document written with ID: ", docRef.id)
    } catch (e) {
        console.error("Error adding document: ", e)
    }
}

//Sign up functionality
export const firebaseSignUp = async ({ email, password, displayName }: UserFormValues) => {
    const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password)
    const user = userCredential.user

    // save to users db for reading later
    await firebaseSaveUser(displayName, email)

    // Update the display name
    await updateProfile(user, {
      displayName: displayName,
    })
}

//Sign out functionality
export const firebaseSignOut = async () => {
    await signOut(firebaseAuth)
}

// get all users
export const firebaseGetAllUsers = async() : Promise<string[]> => {
    let allUsers :string[] = []
    const querySnapshot = await getDocs(collection(firebaseDb, "users"));
    querySnapshot.forEach((doc) => {
        allUsers.push( "user " + doc.data().userName + ": " + doc.data().userEmail )
    })

    return allUsers
}