import {
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    collection,
    getDocs,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export const useEvents = () => {
    const getEvents = async () => {
        const snapshot = await getDocs(collection(db, "events"));

        return snapshot.docs.map((doc) => ({
            docId: doc.id,
            ...doc.data(),
        }));
    };

    const createEvent = async (data) => {
        return await addDoc(collection(db, "events"), data);
    };

    const updateEvent = async (docId, data) => {
        return await updateDoc(doc(db, "events", docId), data);
    };

    const deleteEvent = async (docId) => {
        return await deleteDoc(doc(db, "events", docId));
    };

    return {
        getEvents,
        createEvent,
        updateEvent,
        deleteEvent,
    };
};
