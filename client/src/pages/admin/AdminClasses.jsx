import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { Plus } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClassCard } from "../../components/admin/ClassCard";
import { CreateClassModal } from "../../components/admin/CreateClassModal";
import { Loader } from "../../components/ui/Loader";
import { DeleteModal } from "../../components/ui/DeleteModal";

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
     * Estado que controla la visibilidad de la modal de eliminación.
     * @type {boolean}
     */
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    /**
     * Estado que almacena la clase seleccionada para ser eliminada.
     * Inicialmente es null, lo que significa que no hay una clase seleccionada.
     * @type {Object|null}
     */
    const [classToDelete, setClassToDelete] = useState(null);

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
     * Función que se ejecuta cuando el usuario intenta eliminar una clase.
     * Esta función guarda la clase seleccionada en el estado
     * y muestra la modal de confirmación de eliminación.
     *
     * @param {Object} c - La clase seleccionada para eliminar.
     */
    const handleDelete = (c) => {
        setClassToDelete(c);
        setShowDeleteModal(true);
    };

    /**
     * Función que se ejecuta cuando el usuario confirma la eliminación de una clase.
     * Elimina la clase de la base de datos y luego actualiza la lista de clases.
     *
     * @param {Object} classData - Los datos de la clase que será eliminada de la base de datos.
     * @returns {Promise<void>} - Una promesa.
     */
    const confirmDelete = async (classData) => {
        await deleteDoc(doc(db, "classes", classData.id));
        toast.success("Clase eliminada correctamente", { theme: "dark" });
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
                    <p>Crea y administra las clases disponibles</p>
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
                <Loader />
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
            <AnimatePresence>
                {showModal && (
                    <CreateClassModal
                        classData={selectedClass}
                        onClose={() => {
                            setShowModal(false);
                            setSelectedClass(null);
                            fetchClasses();
                        }}
                    />
                )}

                {showDeleteModal && classToDelete && (
                    <DeleteModal
                        item={classToDelete}
                        onClose={() => setShowDeleteModal(false)}
                        onConfirm={confirmDelete}
                    />
                )}
            </AnimatePresence>

            <ToastContainer position="top-right" autoClose={3000} />
        </>
    );
};
