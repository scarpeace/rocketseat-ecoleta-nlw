import express from 'express'

import PointsController from './controllers/pointsController'
import ItemsController from './controllers/itemsController'

const routes = express.Router();
const pointController = new PointsController();
const itemsController = new ItemsController();

routes.get('/items',itemsController.index);
routes.get('/points',pointController.index);
routes.post('/points', pointController.create);
routes.get('/points/:id', pointController.show);

export default routes;