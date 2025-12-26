import { Response } from 'express';
import { prisma } from '../config/database';
import { SplitService } from '../services/splitService';

export const addExpense = async (req: any, res: Response) => {
  // Destructure the input from request body 
  const { description, amount, groupId, splitType, splits } = req.body;

  try {
    // 1. Calculate the split amounts based on type 
    const calculated = SplitService.calculateSplits(amount, splitType, splits);

    // 2. Create the expense record in the database
    const expense = await prisma.expense.create({
      data: {
        description,
        totalAmount: amount, 
        splitType,           
        groupId,             
        paidById: req.user.id, 
        splits: {
          create: calculated.map((s: any) => ({
            userId: s.userId,
            amount: s.amount // Individual dues for each member 
          }))
        }
      },
      include: {
        splits: true // Returns the split details in the response
      }
    });

    res.json(expense);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};

// Add this to your existing expenseController.ts
export const getGroupExpenses = async (req: any, res: Response) => {
  const { groupId } = req.params;

  try {
    const expenses = await prisma.expense.findMany({
      where: { groupId },
      include: {
        paidBy: { select: { name: true } },
        splits: { include: { user: { select: { name: true } } } }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(expenses);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};