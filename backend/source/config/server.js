require("dotenv").config();
console.log("DB_USER:", process.env.DB_USER);
const app = require("../app");
const conn = require("../database/connection");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

// API para testar banco e buscar nomes dos usuários
app.get('/api/testar-banco', async (req, res) => {
    try {
        console.log('Testando conexão com o banco...');
        
        // Função helper para promisificar queries
        const query = (sql) => {
            return new Promise((resolve, reject) => {
                conn.query(sql, (err, results) => {
                    if (err) reject(err);
                    else resolve(results);
                });
            });
        };
        
        // Buscar apenas os nomes dos usuários (campo 'nome' conforme a estrutura da tabela)
        const rows = await query('SELECT nome FROM USUARIOS');
        
        console.log(`Encontrados ${rows.length} usuários na tabela`);
        
        // Extrair apenas os nomes
        const nomes = rows.map(row => row.nome);
        
        res.json({
            success: true,
            message: `Conexão com banco estabelecida! Encontrados ${rows.length} usuários.`,
            nomes: nomes
        });
        
    } catch (error) {
        console.error('Erro ao conectar com o banco:', error);
        
        res.status(500).json({
            success: false,
            error: 'Erro ao conectar com o banco de dados: ' + error.message
        });
    }
});