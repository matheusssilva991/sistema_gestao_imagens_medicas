const express = require('express');
const app = express();
const Router = require("./routers/router");
const cors = require("cors");
const dotenv = require("dotenv").config();

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.use("/", Router);

app.listen(PORT, 'localhost', () => {
    console.log(`Servidor rodando na porta ${PORT}!`);
});
