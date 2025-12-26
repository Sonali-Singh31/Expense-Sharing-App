import { Router } from 'express';
import { addExpense, getGroupExpenses } from '../controllers/expenseController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();
router.post('/', authenticate, addExpense);
router.get('/:groupId', authenticate, getGroupExpenses); // NEW: GET http://localhost:3000/expenses/GROUP_ID

export default router;