import { ILoan } from './loan.interface';

export interface IBook {
  id: number;
  name: string;
  author: string;
  loans: Array<ILoan>;
}
