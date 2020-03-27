const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;

        const [qtdCasos] = await connection('casos').count();

        const casos = await connection('casos')
        .join('ongs', 'ongs.id', '=', 'casos.ong_id')
        .limit(5)
        .offset((page - 1) * 5)
        .select(['casos.*', 
                 'ongs.nome', 
                 'ongs.email', 
                 'ongs.telefone', 
                 'ongs.cidade', 
                 'ongs.uf']);

        response.header('X-Total-Count', qtdCasos['count(*)']);

        return response.json(casos);
    }, 

    async create(request, response) {
        const { titulo, descricao, valor } = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('casos').insert({
            titulo,
            descricao,
            valor,
            ong_id,
        });
        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const casos = await connection('casos')
            .where('id', id)
            .select('ong_id', )
            .first();

            if(casos.ong_id != ong_id) {
                return response.status(401).json('Operação não permitida!');
            }

            await connection('casos').where('id', id).delete();

            return response.status(204).send();
    }
};