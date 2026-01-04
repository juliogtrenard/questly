import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { Plus } from "lucide-react";
import { ClassCard } from "../../components/admin/ClassCard";
import { CreateClassModal } from "../../components/admin/CreateClassModal";

/**
 * Componente para gestionar las clases en el panel de administración.
 * Permite visualizar, agregar, editar y eliminar clases.
 *
 * @component
 * @returns {JSX.Element} Vista de administración de clases
 */
export const AdminClasses = () => {
    /**
     * Estado que guarda las clases obtenidas de Firestore.
     * @type {Array<Object>}
     */
    const [classes, setClasses] = useState([]);

    /**
     * Estado que indica si los datos de las clases están cargando.
     * @type {boolean}
     */
    const [loading, setLoading] = useState(true);

    /**
     * Estado que controla si el modal de creación/edición está visible.
     * @type {boolean}
     */

    const [showModal, setShowModal] = useState(false);

    /**
     * Estado que guarda los datos de la clase seleccionada para edición o crea una clase nueva si es null.
     * @type {Object|null}
     */
    const [selectedClass, setSelectedClass] = useState(null); // null = crear, objeto = editar

    /**
     * Obtiene las clases desde Firestore.
     * Se actualiza el estado 'classes' con los datos obtenidos.
     */
    const fetchClasses = async () => {
        const snapshot = await getDocs(collection(db, "classes"));
        const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setClasses(data);
        setLoading(false);
    };

    /**
     * Abre la modal como creación de clase.
     * Reinicia la clase seleccionada y muestra el modal.
     */

    const handleAddClass = () => {
        setSelectedClass(null);
        setShowModal(true);
    };

    /**
     * Función para abrir el modal en modo de edición de clase.
     * Recibe una clase y establece los datos de la clase en el estado 'selectedClass'.
     * @param {Object} c - Clase seleccionada para editar
     */
    const handleEdit = (c) => {
        setSelectedClass(c);
        setShowModal(true);
    };

    /**
     * Función para eliminar una clase de Firestore con una confirmación previa.
     * @param {Object} c - Clase a eliminar
     */
    const handleDelete = async (c) => {
        const confirm = window.confirm(`¿Eliminar la clase "${c.name}"?`);
        if (!confirm) return;

        await deleteDoc(doc(db, "classes", c.id));
        fetchClasses();
    };

    /**
     * Efecto que se ejecuta una sola vez al cargar el componente.
     * Llama a 'fetchClasses' para cargar las clases desde Firestore.
     */
    useEffect(() => {
        fetchClasses();
    }, []);

    return (
        <>
            <div className="admin-page-header">
                <div>
                    <h1>Gestión de clases</h1>
                    <p>Administra las clases disponibles</p>
                </div>

                <button
                    className="primary-btn"
                    onClick={handleAddClass} // Abrir en modo crear
                >
                    <Plus size={18} />
                    Agregar clase
                </button>
            </div>

            {loading ? (
                <p>Cargando...</p>
            ) : (
                <div className="bento-grid">
                    {classes.map((c) => (
                        <ClassCard
                            key={c.id}
                            data={c}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}

            <CreateClassModal
                open={showModal}
                classData={selectedClass} // null = crear, objeto = editar
                onClose={() => {
                    setShowModal(false);
                    setSelectedClass(null);
                    fetchClasses(); // recargar después de crear/editar
                }}
            />
        </>
    );
};
