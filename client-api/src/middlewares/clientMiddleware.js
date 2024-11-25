require('dotenv').config();

function validateToken(req, res, next) {
    const requiredHeader = req.header('token'); // Substitua pelo header que deseja validar
    if (!requiredHeader || requiredHeader !== process.env.token) {
        return res.status(400).json({ error: 'Token inválido' });
    }
    next(); // Continua para o próximo middleware ou rota
}

const validateBody = (req, res, next) => {

    const { body } = req;

    if(body.produto === undefined) {
        return res.status(400).json({ message: 'Produto é necessário' });
    }

    if(body.produto === ''){
        return res.status(400).json({ message: 'Produto não pode ser vazio' });
    }

    next();
};

module.exports = {
    validateToken,
    validateBody
};