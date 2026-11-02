import swaggerUi from 'swagger-ui-express'; 
import { Router, type Request, type Response } from 'express';
import swaggerDoc from '../../swagger-output.json' with {type: 'json'}
import {pool} from '../config/db.js';

export const swaggerRouter: Router = Router();

swaggerRouter.get('/api/menu', async (req: Request, res: Response) => {
    try {
        const query = 'SELECT * FROM products';
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ Mensaje: 'Error al obtener el menú' });
     }
 });

swaggerRouter.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

export default swaggerRouter;