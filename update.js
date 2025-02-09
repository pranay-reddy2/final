import { getFirestore, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAaMUo-McxUjpZxiMx62nB9H_6CC3qvTIo",
    authDomain: "first-67735.firebaseapp.com",
    projectId: "first-67735",
    storageBucket: "first-67735.appspot.com",
    messagingSenderId: "319644668093",
    appId: "1:319644668093:web:01af25786b6dee2243e7d4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export const updateUserPoints = async (points) => {
    const userId = localStorage.getItem("loggedInUserId");
    if (!userId) return;

    try {
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
            const currentPoints = userSnap.data().points || 0;
            await updateDoc(userRef, { points: currentPoints + points });
            console.log(`Updated Points: ${currentPoints + points}`);
        }
    } catch (error) {
        console.error("Error updating points:", error);
    }
};
