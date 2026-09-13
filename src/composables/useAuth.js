import { ref } from 'vue';
import '@/firebase';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase';

export const currentUser = ref(null);
export const logout = () => {signOut(getAuth())};

export const userProfile = ref(null);

onAuthStateChanged(getAuth(), async (user) => {
    currentUser.value = user
    if (user) { 
        const snap = await getDoc(doc(db, 'users', user.uid));
        userProfile.value = snap.data();
    } else { 
        userProfile.value = null;
    }
});