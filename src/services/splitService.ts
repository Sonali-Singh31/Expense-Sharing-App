import { round } from '../utils/rounding';
import { SplitInput, SplitType } from '../models/expense.types';

export class SplitService {
  static calculateSplits(total: number, type: SplitType, inputs: SplitInput[]) {
    // 1. Equal Split: Divide total by number of participants [cite: 13]
    if (type === 'EQUAL') {
      const share = round(total / inputs.length);
      return inputs.map(i => ({ userId: i.userId, amount: share }));
    }
    
    // 2. Percentage Split: Calculate based on user-defined percentages [cite: 15]
    if (type === 'PERCENTAGE') {
      const totalPct = inputs.reduce((sum, i) => sum + (i.percentage || 0), 0);
      if (totalPct !== 100) throw new Error('Percentages must sum to 100');
      return inputs.map(i => ({ userId: i.userId, amount: round((total * i.percentage!) / 100) }));
    }
    
    // 3. Exact Amount Split: Verify the sum of parts equals the total [cite: 14]
    const totalExact = inputs.reduce((sum, i) => sum + (i.amount || 0), 0);
    if (Math.abs(totalExact - total) > 0.01) throw new Error('Exact amounts must sum to total');
    return inputs.map(i => ({ userId: i.userId, amount: i.amount! }));
  }
}