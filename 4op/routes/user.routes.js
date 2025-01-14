import express from 'express';
import authMiddleware from '../middleware/auth.js';
import authorize from '../middleware/authorize.js';
import UserController from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', authMiddleware, authorize(['admin']), UserController.getAllUsers);

router.post('/', authMiddleware, authorize(['admin']), UserController.createUser);

router.get('/:id', authMiddleware, authorize(['admin']), UserController.getUserById); 

router.put('/:id', authMiddleware, authorize(['admin']), UserController.updateUser);

router.delete('/:id', authMiddleware, authorize(['admin']), UserController.deleteUser);

export default router;
