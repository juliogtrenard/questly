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
     * Se ejecuta una sola vez al cargar el componente.
     * Obtiene el número total de clases desde Firestore y actualiza el estado 'classCount'.
     */
    useEffect(() => {
        const fetchData = async () => {
            const snapshot = await getDocs(collection(db, "classes"));
            setClassCount(snapshot.size);
        };

        fetchData();
    }, []);

    return (
        <>
            <h1>Dashboard</h1>

            <div className="bento-grid">
                <BentoCard title="Clases disponibles" value={classCount} />
                <BentoCard title="Eventos creados" value="—" />
                <BentoCard title="Usuarios" value="—" />
                <BentoCard title="Partidas" value="—" />
            </div>
        </>
    );
};
