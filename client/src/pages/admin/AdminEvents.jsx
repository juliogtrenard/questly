import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { EventCard } from "../../components/admin/EventCard";
import { CreateEventModal } from "../../components/admin/CreateEventModal";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

/**
 * Componente AdminEvents
 *
 * Página de administración de eventos que permite:
 * - Listar eventos almacenados en Firestore
 * - Crear nuevos eventos
 * - Editar eventos existentes
 * - Eliminar eventos
 *
 * @component
 * @returns {JSX.Element} Vista de gestión de eventos
 */
export const AdminEvents = () => {
    /**
     * Controla la visibilidad del modal de creación/edición
     * @type {[boolean, Function]}
     */
    const [showModal, setShowModal] = useState(false);

    /**
     * Lista de eventos cargados desde Firestore
     * Cada evento incluye su docId real de Firestore
     * @type {[Array<Object>, Function]}
     */

    const [events, setEvents] = useState([]);

    /**
     * Evento que se está editando actualmente
     * Si es null, el modal estará en modo "crear"
     * @type {[Object|null, Function]}
     */
    const [editingEvent, setEditingEvent] = useState(null);

    /**
     * Obtiene todos los eventos desde Firestore
     * y los guarda en el estado.
     *
     * Añade la propiedad docId (ID real de Firestore)
     * a cada evento para poder editarlo o eliminarlo.
     *
     * @async
     * @returns {Promise<void>}
     */
    const fetchEvents = async () => {
        const snapshot = await getDocs(collection(db, "events"));
        const eventsData = snapshot.docs.map((docItem) => ({
            docId: docItem.id, // ID real del documento en Firestore
            ...docItem.data(),
        }));

        setEvents(eventsData);
    };

    /**
     * Activa el modo edición para un evento
     * y abre el modal con los datos precargados.
     *
     * @param {Object} event - Evento seleccionado para editar
     */
    const handleEdit = (event) => {
        setEditingEvent(event);
        setShowModal(true);
    };

    /**
     * Elimina un evento de Firestore tras confirmación del usuario
     * y recarga la lista de eventos.
     *
     * @async
     * @param {Object} event - Evento a eliminar
     * @param {string} event.docId - ID real del documento en Firestore
     * @returns {Promise<void>}
     */
    const handleDelete = async (event) => {
        if (confirm("¿Seguro que quieres eliminar este evento?")) {
            await deleteDoc(doc(db, "events", event.docId));
            fetchEvents();
        }
    };

    /**
     * Se ejecuta cuando un evento
     * se guarda correctamente desde el modal.
     *
     * - Recarga la lista de eventos
     * - Cierra el modal
     * - Limpia el estado de edición
     */
    const handleSaved = () => {
        fetchEvents();
        setEditingEvent(null);
        setShowModal(false);
    };

    /**
     * Carga inicial de eventos al montar el componente
     */
    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <>
            <div className="admin-page-header">
                <div>
                    <h1>Gestión de eventos</h1>
                    <p>Crea y administra los eventos de las historias</p>
                </div>
                <button
                    className="primary-btn"
                    onClick={() => setShowModal(true)}
                >
                    <Plus size={18} />
                    Agregar evento
                </button>
            </div>

            <div className="bento-grid">
                {events.map((ev) => (
                    <EventCard
                        key={ev.docId}
                        data={ev}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
            <AnimatePresence>
                {showModal && (
                    <CreateEventModal
                        onClose={() => {
                            setShowModal(false);
                            setEditingEvent(null);
                        }}
                        onSaved={handleSaved}
                        event={editingEvent}
                        existingEvents={events}
                    />
                )}
            </AnimatePresence>
        </>
    );
};
