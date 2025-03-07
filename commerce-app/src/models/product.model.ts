import {Entity, model, property} from '@loopback/repository';

@model()
export class Product extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  ProductId?: string;

  @property({
    type: 'number',
    required: true,
  })
  AgencyId: number;

  @property({
    type: 'string',
    required: true,
  })
  Name: string;

  @property({
    type: 'string',
  })
  Description?: string;

  @property({
    type: 'any',
    required: true,
  })
  Price: any;

  @property({
    type: 'number',
    default: 0,
  })
  StockQuantity?: number;


  constructor(data?: Partial<Product>) {
    super(data);
  }
}

export interface ProductRelations {
  // describe navigational properties here
}

export type ProductWithRelations = Product & ProductRelations;
