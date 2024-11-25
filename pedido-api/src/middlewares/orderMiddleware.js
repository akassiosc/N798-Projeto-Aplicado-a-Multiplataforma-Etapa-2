require('dotenv').config();

function validateToken(req, res, next) {
    const requiredHeader = req.header('token'); // Substitua pelo header que deseja validar
    if (!requiredHeader || requiredHeader !== process.env.TOKEN) {
        return res.status(400).json({ error: 'Token inválido' });
    }
    next(); // Continua para o próximo middleware ou rota
}

module.exports = {
    validateToken
};