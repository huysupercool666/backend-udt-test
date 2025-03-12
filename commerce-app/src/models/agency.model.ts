import {
  Entity,
  model,
  property,
  belongsTo,
  hasMany,
} from '@loopback/repository';
import { Admin } from './admin.model';
import { Product } from './product.model';
import { Transaction } from './transaction.model';

@model()
export class Agency extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  agencyId?: string;

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

  @belongsTo(() => Admin)
  adminId: string;

  @hasMany(() => Product)
  products: Product[];

  @hasMany(() => Transaction)
  transactions: Transaction[];

  constructor(data?: Partial<Agency>) {
    super(data);
  }
}

export interface AgencyRelations {
  // describe navigational properties here
}

export type AgencyWithRelations = Agency & AgencyRelations;
