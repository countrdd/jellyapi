import {belongsTo, Entity, model, property} from '@loopback/repository';
import {v4 as uuid} from 'uuid';
import {Group, GroupWithRelations} from './group.model';
import {BaseEntity} from './base-entity.model';
@model({settings: {strict: false}, forceId: false})
export class Location extends BaseEntity {
  @property({
    type: 'string',
    mongodb: {dataType: 'ObjectID'},
    id: true,
  })
  id?: string;


  @property({
    type: 'string',
  })
  locationName?: string;
  // Define Relationship to Groups
  @property({
    type: 'string',
  })
  exportNumber?: string;
  @property({
    type: 'object',
  })
  payrollSettings?: object;
  @property({
    type: 'string',
  })
  address?: string;
  @property({
    type: 'string',
  })
  city?: string;
  @property({
    type: 'string',
  })
  state?: string;
  @property({
    type: 'string',
  })
  zipCode?: string;
  @property({
    type: 'string',
  })
  email?: string;
  @property({
    type: 'string',
  })
  phone?: string;


  @belongsTo(() => Group)
 groupId: string;


  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Location>) {
    super(data);
  }
}

export interface LocationRelations {
  group?: GroupWithRelations
  // describe navigational properties here
}

export type LocationWithRelations = Location & LocationRelations;
