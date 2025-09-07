const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

const alunoRoutes = require("./routes/alunoRoutes");
const cursoRoutes = require("./routes/cursoRoutes");
const professorRoutes = require("./routes/professorRoutes");
const trabalhoRoutes = require("./routes/trabalhoRoutes");
const avaliacaoBancaRoutes = require("./routes/avaliacaoBancaRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const bancaRoutes = require("./routes/bancaRoutes");
const errorHandler = require("./middlewares/errorHandler");

app.use(bodyParser.json());

// Servir arquivos estáticos da pasta frontend
app.use(express.static(path.join(__dirname, "../../frontend")));

// passa o router importado
app.use("/alunos", alunoRoutes);
app.use("/cursos", cursoRoutes);
app.use("/professores", professorRoutes);
app.use("/trabalhos", trabalhoRoutes);
app.use("/avaliacoes", avaliacaoBancaRoutes);

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", bancaRoutes);

app.get("/ping", (req, res) => res.json({ message: "pong 🏓" }));

// Rota para servir index.html na raiz
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/index.html"));
});

// sempre depois das rotas
app.use(errorHandler);

module.exports = app;