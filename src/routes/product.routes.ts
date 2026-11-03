import router from 'express';
import { getMenu, getProductId, createNewProduct, updateProduct } from '../controllers/product.controller.js';

const productRouter = router.Router();

productRouter.get('/menu', getMenu);
productRouter.get('/products/:id', getProductId);
productRouter.post('/products', createNewProduct);
productRouter.put('/products/:id', updateProduct);

export default productRouter;