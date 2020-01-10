import {Entity, model, property, hasMany} from '@loopback/repository';
import {Group, GroupWithRelations} from './group.model';
import {v4 as uuid} from 'uuid';
@model({settings: {strict: false}})
export class Tenant extends Entity {
  @property({
    type: 'string',
    mongodb: {dataType: 'ObjectID'},
    id: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  tenantName?: string;

  @hasMany(() => Group)
  groups?: Group[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Tenant>) {
    super(data);
  }
}

export interface TenantRelations {
  groups?: GroupWithRelations[]
  // describe navigational properties here
}

export type TenantWithRelations = Tenant & TenantRelations;
