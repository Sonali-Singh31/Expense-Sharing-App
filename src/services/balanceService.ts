import { prisma } from '../config/database';

export class BalanceService {
  /**
   * Tracks total amounts a user owes and total amounts others owe them.
   */
  static async getBalances(userId: string) {
    // Sum of splits the user is responsible for (where they didn't pay) [cite: 20]
    const userOwes = await prisma.split.aggregate({
      where: { 
        userId, 
        NOT: { expense: { paidById: userId } } 
      },
      _sum: { amount: true }
    });

    // Sum of splits others are responsible for (where this user was the payer) [cite: 21]
    const owedToUser = await prisma.split.aggregate({
      where: { 
        expense: { paidById: userId }, 
        NOT: { userId: userId } 
      },
      _sum: { amount: true }
    });

    return {
      youOwe: userOwes._sum.amount || 0,
      othersOweYou: owedToUser._sum.amount || 0
    };
  }
}