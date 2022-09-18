import { Router } from 'express';
import multer from 'multer';
import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { CreateUserController } from './controllers/user/CreateUserController';
import { DetailUserController } from './controllers/user/DetailUserController';
import { ListCategoryController } from './controllers/category/ListCategoryController';
import { CreateProductController } from './controllers/product/CreateProductController';

import { isAuthenticated } from './middlewares/isAuthenticated';

import uploadConfig from './config/multer';
import { ListProductByCategoryController } from './controllers/product/ListProductByCategoryController';
import { CreateOrderController } from './controllers/order/CreateOrderController';
import { RemoveOrderController } from './controllers/order/RemoveOrderController';
import { AddOrderItemController } from './controllers/order/AddOrderItemController';
import { RemoveOrderItemController } from './controllers/order/RemoveOrderItemController';

const router = Router();

const upload = multer(uploadConfig.upload('./tmp'));

// USERS
router.post('/users', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.get('/me', isAuthenticated, new DetailUserController().handle);

// CATEGORIES
router.post(
  '/category',
  isAuthenticated,
  new CreateCategoryController().handle
);
router.get('/category', isAuthenticated, new ListCategoryController().handle);

// PRODUCTS
router.post(
  '/product',
  isAuthenticated,
  upload.single('file'),
  new CreateProductController().handle
);
router.get(
  '/category/product',
  isAuthenticated,
  new ListProductByCategoryController().handle
);

// ORDERS
router.post('/order', isAuthenticated, new CreateOrderController().handle);
router.delete(
  '/order/:order_id',
  isAuthenticated,
  new RemoveOrderController().handle
);
router.post('/order/add', isAuthenticated, new AddOrderItemController().handle);
router.delete(
  '/order/item/:item_id',
  isAuthenticated,
  new RemoveOrderItemController().handle
);

export { router };
