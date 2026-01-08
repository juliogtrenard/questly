import { motion } from "framer-motion";

/**
 * Modal para confirmar la eliminación de cualquier entidad.
 *
 * @param {Object} props
 * @param {string} props.type - El tipo de entidad a eliminar (evento, clase, personaje etc.)
 * @param {Object} props.item - El objeto a eliminar
 * @param {Function} props.onClose - Función para cerrar la modal
 * @param {Function} props.onConfirm - Función para confirmar la eliminación
 */
export const DeleteModal = ({ item, onClose, onConfirm }) => {
    return (
        <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="modal-content"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                onClick={(e) => e.stopPropagation()}
            >
                <h2>¿Estás seguro de que quieres eliminar este elemento?</h2>
                <div className="modal-actions">
                    <button
                        className="confirm-btn"
                        onClick={() => {
                            onConfirm(item);
                            onClose();
                        }}
                    >
                        Confirmar
                    </button>

                    <button className="cancel-btn" onClick={onClose}>
                        Cancelar
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};
