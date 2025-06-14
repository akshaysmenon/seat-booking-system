import { Router } from 'express';
import * as userController from '../controllers/userController.js';

const router = Router();

router.get('/', userController.listUsers);
router.get('/:id', userController.getUser);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;
