import {Entity, model, property} from '@loopback/repository';

@model()
export class Roles extends Entity {
  @property({
    type: 'string',
    mongodb: {dataType: 'ObjectID'},
    id: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  roleName?: string;

  @property({
    type: 'object',
  })
  permissions?: object;

  @property({
    type: 'number',
  })
  role_key?: number;


  constructor(data?: Partial<Roles>) {
    super(data);
  }
}

export interface RolesRelations {
  // describe navigational properties here
}

export type RolesWithRelations = Roles & RolesRelations;
