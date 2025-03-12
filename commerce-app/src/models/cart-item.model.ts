import { Entity, model, property, belongsTo } from '@loopback/repository';
import { Cart } from './cart.model';
import { Product } from './product.model';

@model()
export class CartItem extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  cartItemId?: string;

  @property({
    type: 'number',
    required: true,
  })
  quantity: number;

  @property({
    type: 'number',
    required: true,
  })
  price: number;

  @belongsTo(() => Cart)
  cartId: string;

  @belongsTo(() => Product)
  productId: string;

  constructor(data?: Partial<CartItem>) {
    super(data);
  }
}

export interface CartItemRelations {
  cart?: Cart;
  product?: Product;
}

export type CartItemWithRelations = CartItem & CartItemRelations;
