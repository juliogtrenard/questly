import {
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    collection,
    getDocs,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export const useClasses = () => {
    const getClasses = async () => {
        const snapshot = await getDocs(collection(db, "classes"));
        return snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
    };

    const createClass = async (data) => {
        return await addDoc(collection(db, "classes"), data);
    };

    const updateClass = async (id, data) => {
        return await updateDoc(doc(db, "classes", id), data);
    };

    const deleteClass = async (id) => {
        return await deleteDoc(doc(db, "classes", id));
    };

    return {
        getClasses,
        createClass,
        updateClass,
        deleteClass,
    };
};
