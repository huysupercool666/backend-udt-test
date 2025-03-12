import { Entity, model, property, hasMany } from '@loopback/repository';
import { Agency } from './agency.model';
@model()
export class Admin extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  adminId?: string;

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
  username: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @hasMany(() => Agency)
  agencies: Agency[];

  constructor(data?: Partial<Admin>) {
    super(data);
  }
}

export interface AdminRelations {
  // describe navigational properties here
}

export type AdminWithRelations = Admin & AdminRelations;
