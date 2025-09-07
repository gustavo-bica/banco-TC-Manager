require("dotenv").config();
console.log("DB_USER:", process.env.DB_USER);
const app = require("../app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

// API para testar banco e buscar nomes dos usuários
app.get('/api/testar-banco', async (req, res) => {
    try {
        console.log('Testando conexão com o banco...');
        
        // Testar conexão
        const connection = await pool.getConnection();
        console.log('Conexão estabelecida com sucesso!');
        
        // Buscar apenas os nomes dos usuários (campo 'nome' conforme a estrutura da tabela)
        const [rows] = await connection.execute('SELECT nome FROM USUARIOS');
        connection.release();
        
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