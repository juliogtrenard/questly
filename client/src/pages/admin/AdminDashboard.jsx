import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { BentoCard } from "../../components/admin/BentoCard";

/**
 * Componente que muestra el Dashboard de administración.
 * Este componente se encarga de mostrar las métricas.
 *
 * @component
 * @returns {JSX.Element} Vista del Dashboard de administración
 */
export const AdminDashboard = () => {
    /**
     * Estado que guarda el número de clases disponibles en la base de datos.
     * @type {number}
     */
    const [classCount, setClassCount] = useState(0);

    /**
     * Estado que guarda el número de eventos disponibles en la base de datos.
     * @type {number}
     */
    const [eventCount, setEventCount] = useState(0);

    /**
     * Estado que guarda el número de usuarios disponibles en la base de datos.
     * @type {number}
     */
    const [userCount, setUserCount] = useState(0);

    /**
     * Obtiene el número total de clases, eventos y usuarios desde Firestore y actualiza sus estados.
     */
    const fetchData = async () => {
        const snapshotClasses = await getDocs(collection(db, "classes"));
        setClassCount(snapshotClasses.size);

        const snapshotEvents = await getDocs(collection(db, "events"));
        setEventCount(snapshotEvents.size);

        const snapshotUsers = await getDocs(collection(db, "users"));
        setUserCount(snapshotUsers.size);
    };

    /**
     * Se ejecuta una sola vez al cargar el componente.
     */
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <h1>Dashboard</h1>

            <div className="bento-grid">
                <BentoCard title="Clases disponibles" value={classCount} />
                <BentoCard title="Eventos creados" value={eventCount} />
                <BentoCard title="Usuarios" value={userCount} />
                <BentoCard title="Partidas" value="—" />
            </div>
        </>
    );
};
