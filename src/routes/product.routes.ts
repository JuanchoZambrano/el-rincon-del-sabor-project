import router from 'express';
import { getProductsMenu, getProductId, createNewProduct, updateProduct } from '../controllers/product.controller.js';
import { validateProduct } from '../middlewares/validate-product.js';

const productRouter = router.Router();

productRouter.get('/menu', getProductsMenu);
productRouter.get('/products/:id', getProductId);
productRouter.post('/products', validateProduct, createNewProduct);
productRouter.put('/products/:id', updateProduct);

export default productRouter;