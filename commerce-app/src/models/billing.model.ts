import { Entity, model, property, belongsTo } from '@loopback/repository';
import { Transaction } from './transaction.model';

@model()
export class Billing extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  billingId?: string;

  @property({
    type: 'number',
    required: true,
  })
  amount: number;

  @belongsTo(() => Transaction)
  transactionId: string;

  @property({
    type: 'date',
    required: true,
  })
  billingDate: string;

  @property({
    type: 'string',
    required: true,
  })
  paymentStatus: string;

  constructor(data?: Partial<Billing>) {
    super(data);
  }
}

export interface BillingRelations {
  // describe navigational properties here
}

export type BillingWithRelations = Billing & BillingRelations;
