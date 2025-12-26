import { Router } from 'express';
import { createGroup, getUserGroups } from '../controllers/groupController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();
router.post('/', authenticate, createGroup);
router.get('/', authenticate, getUserGroups); // NEW: GET http://localhost:3000/groups

export default router;