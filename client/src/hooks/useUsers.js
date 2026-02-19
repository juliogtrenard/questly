import {
    setDoc,
    updateDoc,
    deleteDoc,
    doc,
    getDocs,
    collection,
} from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../firebase/firebaseConfig";
import { adminAuth } from "../firebase/adminAuth";

export const useUsers = () => {
    const getUsers = async () => {
        const snapshot = await getDocs(collection(db, "users"));

        return snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
    };

    const createUser = async ({ username, email, password, role }) => {
        const cred = await createUserWithEmailAndPassword(
            adminAuth,
            email,
            password,
        );

        await setDoc(doc(db, "users", cred.user.uid), {
            username,
            role,
        });

        return cred.user;
    };

    const updateUser = async (id, data) => {
        return await updateDoc(doc(db, "users", id), data);
    };

    const deleteUser = async (id) => {
        return await deleteDoc(doc(db, "users", id));
    };

    return {
        getUsers,
        createUser,
        updateUser,
        deleteUser,
    };
};
