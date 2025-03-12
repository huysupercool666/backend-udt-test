import {
  Entity,
  model,
  property,
  belongsTo,
  hasMany,
  hasOne,
} from '@loopback/repository';
import { Customer } from './customer.model';
import { Transaction } from './transaction.model';
import { CartItem } from './cart-item.model';

@model()
export class Cart extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  cartId?: string;

  @property({
    type: 'date',
    required: true,
  })
  createdAt: string;

  @belongsTo(() => Customer)
  customerId: string;

  @hasOne(() => Transaction)
  transaction: Transaction;

  @property({
    type: 'date',
    required: true,
  })
  updatedAt: string;

  @property({
    type: 'string',
    required: true,
  })
  cartStatus: string;

  @hasMany(() => CartItem)
  cartItems: CartItem[];

  constructor(data?: Partial<Cart>) {
    super(data);
  }
}

export interface CartRelations {
  // describe navigational properties here
}

export type CartWithRelations = Cart & CartRelations;
