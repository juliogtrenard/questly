const { connect } = require("mongoose");

/**
 * @description Conectar a la base de datos MongoDB
 */
const conectarDB = async () => {
    try {
        await connect(process.env.MONGODB_URI);

        console.log("Conexión correcta");
    } catch (error) {
        console.error("Error al conectar:", error);
        process.exit(1);
    }
};

module.exports = conectarDB;
