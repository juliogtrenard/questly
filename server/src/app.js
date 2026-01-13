require("dotenv").config();
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");
const conectarDB = require("./config/db.js");

const racesRoutes = require("./routes/races.routes.js");
const classesRoutes = require("./routes/classes.routes.js");
const zonesRoutes = require("./routes/zones.routes.js");
const worldsRoutes = require("./routes/worlds.routes.js");

const app = express();

/**
 * Conexón a la BBDD
 */
conectarDB();

/**
 * Middlewares globales
 */
app.use(cors());
app.use(express.json());

app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * Rutas de la API
 */
app.use("/api/v1/races", racesRoutes);
app.use("/api/v1/classes", classesRoutes);
app.use("/api/v1/zones", zonesRoutes);
app.use("/api/v1/worlds", worldsRoutes);

/**
 * Ruta base
 */
app.get("/", (req, res) => {
    res.json({
        name: "Questly Lore API",
        version: "1.0.0",
    });
});

/**
 * Puerto del servidor
 */
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Questly Lore API running on http://localhost:${PORT}`);
});
