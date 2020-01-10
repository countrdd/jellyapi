import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class CheckDetails extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;
  @property({
    type: 'string',
  })
  CustomerId?: string;

  @property({
    type: 'string',
  })
  Customer?: string;

  @property({
    type: 'string',
  })
  CustomerPhone?: string;

  @property({
    type: 'string',
  })
  CustomerEmail?: string;

  @property({
    type: 'string',
  })
  LocationCode?: string;

  @property({
    type: 'string',
  })
  OpenedDate?: string;

  @property({
    type: 'string',
  })
  OpenedTime?: string;

  @property({
    type: 'string',
  })
  ItemDescription?: string;

  @property({
    type: 'string',
  })
  Server?: string;

  @property({
    type: 'number',
  })
  Tax?: number;

  @property({
    type: 'string',
  })
  Tender?: string;

  @property({
    type: 'string',
  })
  CheckId?: string;

  @property({
    type: 'number',
  })
  CheckNumber?: number;

  @property({
    type: 'number',
  })
  Total?: number;

  @property({
    type: 'string',
  })
  CustomerFamily?: string;

  @property({
    type: 'number',
  })
  TableSize?: number;

  @property({
    type: 'number',
  })
  Discount?: number;

  @property({
    type: 'string',
  })
  ReasonofDiscount?: string;

  @property({
    type: 'string',
  })
  Link?: string;

  @property({
    type: 'object',
  })
  locationId?: object;

  @property({
    type: 'date',
  })
  exportFileDate?: string;

  @property({
    type: 'string',
  })
  checkOpened?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<CheckDetails>) {
    super(data);
  }
}

export interface CheckDetailsRelations {
  // describe navigational properties here
}

export type CheckDetailsWithRelations = CheckDetails & CheckDetailsRelations;
