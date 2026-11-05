import router from 'express';
import { getCustomers, getCustomersId, createNewCustomer, updateCustomer } from '../controllers/customer.controller.js';
import { validateCustomer } from '../middlewares/validate-customer.js';

const customerRouter = router.Router();

customerRouter.get('/customers', getCustomers);
customerRouter.get('/customers/:id', getCustomersId);
customerRouter.post('/customers', validateCustomer, createNewCustomer);
customerRouter.put('/customers/:id', updateCustomer);

export default customerRouter;