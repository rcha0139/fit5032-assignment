import { ref } from 'vue';
import '@/firebase';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

export const currentUser = ref(null);
export const logout = () => {signOut(getAuth())};

onAuthStateChanged(getAuth(), (user) => { currentUser.value = user });