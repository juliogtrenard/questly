import { motion } from "framer-motion";
import { X } from "lucide-react";

export const BaseModal = ({ title, onClose, children }) => {
    return (
        <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="modal-content"
                initial={{ scale: 0.9, opacity: 0, y: 60 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 60 }}
                transition={{ duration: 0.3 }}
            >
                <button className="modal-close" onClick={onClose}>
                    <X size={20} />
                </button>

                <h2>{title}</h2>

                {children}
            </motion.div>
        </motion.div>
    );
};
