import {Entity, model, property} from '@loopback/repository';

@model()
export class Cart extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  CartId?: number;

  @property({
    type: 'number',
    required: true,
  })
  CustomerId: number;

  @property({
    type: 'date',
    required: true,
  })
  CreatedAt: string;

  @property({
    type: 'date',
    required: true,
  })
  UpdatedAt: string;

  @property({
    type: 'boolean',
    required: true,
  })
  CartStatus: boolean;


  constructor(data?: Partial<Cart>) {
    super(data);
  }
}

export interface CartRelations {
  // describe navigational properties here
}

export type CartWithRelations = Cart & CartRelations;
