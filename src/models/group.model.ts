import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Tenant, TenantWithRelations} from './tenant.model';
import {v4 as uuid} from "uuid";
import {Location, LocationWithRelations} from './location.model';
import {BaseEntity} from './base-entity.model';

@model({settings: {strict: false}})
export class Group extends BaseEntity{
  @property({
    type: 'string',
    mongodb: {dataType: 'ObjectID'},
    id: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  groupName?: string;

  @belongsTo(() => Tenant)
  tenantId: string;

  @hasMany(() => Location)
  locations?: Location[];

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @property({
    type: 'string',
  })
  oldgid?: string;
  [prop: string]: any;

  constructor(data?: Partial<Group>) {
    super(data);
  }
}

export interface GroupRelations {
  tenant?: TenantWithRelations
  locations?: LocationWithRelations[]
  // describe navigational properties here
}

export type GroupWithRelations = Group & GroupRelations;
