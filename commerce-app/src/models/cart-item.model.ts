import {Entity, model, property} from '@loopback/repository';

@model()
export class CartItem extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  CartItemId?: number;

  @property({
    type: 'number',
    required: true,
  })
  CartId: number;

  @property({
    type: 'number',
    required: true,
  })
  ProductId: number;

  @property({
    type: 'number',
    required: true,
  })
  Quantity: number;

  @property({
    type: 'any',
    required: true,
  })
  Price: any;


  constructor(data?: Partial<CartItem>) {
    super(data);
  }
}

export interface CartItemRelations {
  // describe navigational properties here
}

export type CartItemWithRelations = CartItem & CartItemRelations;
