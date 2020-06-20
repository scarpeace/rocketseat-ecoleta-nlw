import { Request, Response, response } from 'express'
import knex from '../database/connection'

class PointsController {

    async index(req: Request, res: Response) {
        const { city, uf, items } = req.query;

        //Pega os query params que tão vindo da requisição, separa eles aonde tem a virgula e converte o número após tirar os espaços que estão em volta para não dar bug.
        const parsedItems = String(items)
            .split(',')
            .map(item => Number(item.trim()))

        const points = await knex('points')
            .join('point_items', 'points.id', '=', 'point_items.point_id')
            .whereIn('point_items.item_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*');
        
            if (!points) {
                return res.status(400).json({ message: 'Point not Found' })
            }

        return res.json(points);
    }

    async show(req: Request, res: Response) {
        const { id } = req.params;

        const point = await knex('points').where('id', id).first();

        if (!point) {
            return res.status(400).json({ message: 'Point not Found' });
        }

        const items = knex('items')
            .join('point_items', 'items.id', '=', 'points_items.item.id')
            .where('point_items.point_id', id)
            .select('items.title')

        return res.json(point)
    }

    async create(req: Request, res: Response) {
        const { name, email, whatsapp, latitude, longitude, city, uf, items } = req.body;
        const point = {
            image: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        }

        const trx = await knex.transaction()

        //O Knex retorna os ids dos items que foram inseridos após o metodo insert(), então pegamos ele para adicionar na pointItems
        //Como é retornado um array, nós precisamos pegar o item na primeira posição porque tá sendo criado só um item.
        const insertedIds = await trx('points').insert(point)

        const point_id = insertedIds[0]

        const pointItems = items.map((item_id: Number) => {
            return {
                item_id: item_id,
                point_id: point_id
            }
        })

        await trx('point_items').insert(pointItems)

        await trx.commit();

        return res.json({
            id: point_id,
            ...point
        })
    }
}

export default PointsController;