import {Entity, model, property} from '@loopback/repository';

@model()
export class Agency extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  AgencyId?: number;

  @property({
    type: 'string',
    required: true,
  })
  Name: string;

  @property({
    type: 'string',
    required: true,
  })
  Email: string;

  @property({
    type: 'string',
    required: true,
  })
  PhoneNumber: string;

  @property({
    type: 'string',
    required: true,
  })
  Address: string;


  constructor(data?: Partial<Agency>) {
    super(data);
  }
}

export interface AgencyRelations {
  // describe navigational properties here
}

export type AgencyWithRelations = Agency & AgencyRelations;
