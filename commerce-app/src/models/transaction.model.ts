import {
  Entity,
  model,
  property,
  belongsTo,
  hasOne,
} from '@loopback/repository';
import { Customer } from './customer.model';
import { Agency } from './agency.model';
import { Cart } from './cart.model';
import { Billing } from './billing.model';

@model()
export class Transaction extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  transactionId?: string;

  @belongsTo(() => Customer)
  customerId: string;

  @belongsTo(() => Agency)
  agencyId: string;

  @property({
    type: 'date',
    required: true,
  })
  transactionDate: string;

  @belongsTo(() => Cart)
  cartId: string;
  @property({
    type: 'string',
    required: true,
  })
  status: string;

  @property({
    type: 'number',
    required: true,
  })
  totalAmount: number;

  @hasOne(() => Billing)
  billing: Billing;

  constructor(data?: Partial<Transaction>) {
    super(data);
  }
}

export interface TransactionRelations {
  // describe navigational properties here
}

export type TransactionWithRelations = Transaction & TransactionRelations;
