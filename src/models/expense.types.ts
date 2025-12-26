export type SplitType = 'EQUAL' | 'EXACT' | 'PERCENTAGE';
export interface SplitInput {
  userId: string;
  amount?: number;
  percentage?: number;
}