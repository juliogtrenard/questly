import {
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    collection,
    getDocs,
    query,
    where,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export const useCharacters = () => {
    const getCharactersByUser = async (userId) => {
        const q = query(
            collection(db, "characters"),
            where("userId", "==", userId),
        );

        const snapshot = await getDocs(q);

        return snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
    };

    const createCharacter = async (data) => {
        return await addDoc(collection(db, "characters"), data);
    };

    const updateCharacter = async (id, data) => {
        return await updateDoc(doc(db, "characters", id), data);
    };

    const deleteCharacter = async (id) => {
        return await deleteDoc(doc(db, "characters", id));
    };

    return {
        getCharactersByUser,
        createCharacter,
        updateCharacter,
        deleteCharacter,
    };
};
