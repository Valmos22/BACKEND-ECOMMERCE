import { Router } from "express"
import { createUser, getUserById, updateUser, deleteUser, loginUser } from "../controllers/userController"

const router = Router()

router.post('/users', createUser);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.post('/login', loginUser);

export default router;