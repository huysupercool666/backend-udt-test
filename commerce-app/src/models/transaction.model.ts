import {Entity, model, property} from '@loopback/repository';

@model()
export class Transaction extends Entity {
  @property({
    type: 'number',
    required: true,
  })
  TransactionId: number;

  @property({
    type: 'number',
    required: true,
  })
  CustomerId: number;

  @property({
    type: 'date',
    required: true,
  })
  TransactionDate: string;

  @property({
    type: 'boolean',
    required: true,
  })
  Status: boolean;

  @property({
    type: 'any',
    required: true,
  })
  TotalAmount: any;


  constructor(data?: Partial<Transaction>) {
    super(data);
  }
}

export interface TransactionRelations {
  // describe navigational properties here
}

export type TransactionWithRelations = Transaction & TransactionRelations;
