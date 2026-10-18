import { ref } from 'vue';
import '@/firebase';
import { getAuth, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase';

export const currentUser = ref(null);
export const userProfile = ref(null);

export const logout = () => { signOut(getAuth()) };

export const getCurrentUser = () => {
    return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
            unsubscribe();
            resolve(user);
        })
    })
};

export const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(getAuth(), provider);
    const user = result.user;

    // first-time Google users have no Firestore profile yet, so create one
    const userRef = doc(db, 'users', user.uid);
    const snap = await getDoc(userRef);

    if (!snap.exists()) {
        const parts = (user.displayName || '').split(' ');
        const profile = {
            firstname: parts[0] || '',
            lastname: parts.slice(1).join(' ') || '',
            email: user.email,
            role: 'volunteer'
        };
        await setDoc(userRef, profile);
        userProfile.value = profile;
    } else {
        userProfile.value = snap.data();
    }

    return user;
};

onAuthStateChanged(getAuth(), async (user) => {
    currentUser.value = user
    if (user) { 
        const snap = await getDoc(doc(db, 'users', user.uid));
        userProfile.value = snap.data();
    } else { 
        userProfile.value = null;
    }
});