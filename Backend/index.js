const express = require('express');
const app = express();
const Router = require("./routers/router");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.use("/", Router);

app.listen(8080, 'localhost', () => {
    console.log('Servidor rodando na porta 8080!');
});
