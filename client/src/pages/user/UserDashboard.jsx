import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { BentoCard } from "../../components/ui/BentoCard";
import { useAuth } from "../../context/AuthContext";

/**
 * Componente que muestra el Dashboard de usuario.
 * Este componente se encarga de mostrar las métricas.
 *
 * @component
 * @returns {JSX.Element} Vista del Dashboard de usuario
 */
export const UserDashboard = () => {
    const { user } = useAuth();

    /**
     * Estado que guarda el número de personajes disponibles en la base de datos.
     * @type {number}
     */
    const [characterCount, setCharacterCount] = useState(0);

    /**
     * Obtiene el número total de personajes desde Firestore y actualiza sus estados.
     */
    const fetchData = async () => {
        const queryCharacters = query(
            collection(db, "characters"),
            where("userId", "==", user.uid)
        );

        const snapshotCharacters = await getDocs(queryCharacters);
        setCharacterCount(snapshotCharacters.size);
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
                <BentoCard title="Personajes jugables" value={characterCount} />
            </div>
        </>
    );
};
