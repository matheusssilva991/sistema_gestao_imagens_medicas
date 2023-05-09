const express = require('express');
const app = express();
const Router = require("./routes/router");
const cors = require("cors");
const dotenv = require("dotenv").config();
const connection = require("./config/Connection");

const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./documentation/swagger.json");

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use("/", Router);

app.listen(PORT, 'localhost', () => {
    console.log(`Servidor rodando na porta ${PORT}!`);
});
