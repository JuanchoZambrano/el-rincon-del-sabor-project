import router from 'express';
import { getSales, getSalesId, createNewSale } from "../controllers/sale.controller.js"

const saleRouter = router.Router();

saleRouter.get('/sales', getSales);
saleRouter.get('/sales/:id', getSalesId);
saleRouter.post('/sales', createNewSale);

export default saleRouter;