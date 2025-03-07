import {Entity, model, property} from '@loopback/repository';

@model()
export class Billing extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  BillingId?: number;

  @property({
    type: 'number',
    required: true,
  })
  TransactionId: number;

  @property({
    type: 'date',
    required: true,
  })
  BillingDate: string;

  @property({
    type: 'boolean',
    required: true,
  })
  PaymentStatus: boolean;


  constructor(data?: Partial<Billing>) {
    super(data);
  }
}

export interface BillingRelations {
  // describe navigational properties here
}

export type BillingWithRelations = Billing & BillingRelations;
