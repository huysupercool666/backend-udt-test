import { Entity, model, property, hasMany } from '@loopback/repository';
import {Cart} from './cart.model';
import {Transaction} from './transaction.model';
@model()
export class Customer extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  customerId?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  phoneNumber: string;

  @property({
    type: 'string',
    required: true,
  })
  address: string;

  @property({
    type: 'string',
    required: true,
  })
  gender: string;

  @property({
    type: 'string',
    required: true,
  })
  username: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @hasMany(() => Cart)
  carts: Cart[];

  @hasMany(() => Transaction)
  transactions: Transaction[];

  constructor(data?: Partial<Customer>) {
    super(data);
  }
}

export interface CustomerRelations {
  // describe navigational properties here
}

export type CustomerWithRelations = Customer & CustomerRelations;
