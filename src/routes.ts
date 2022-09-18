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

export { router };
