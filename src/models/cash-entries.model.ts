import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class CashEntries extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @property({
    type: 'string',
  })
  Location?: string;

  @property({
    type: 'string',
  })
  EntryId?: string;

  @property({
    type: 'date',
  })
  CreatedDate?: string;

  @property({
    type: 'string',
  })
  Action?: string;

  @property({
    type: 'number',
  })
  Amount?: number;

  @property({
    type: 'string',
  })
  CashDrawer?: string;

  @property({
    type: 'string',
  })
  PayoutReason?: string;

  @property({
    type: 'string',
  })
  NoSaleReason?: string;

  @property({
    type: 'string',
  })
  Employee?: string;
  @property({
    type: 'string',
  })
  Employee2?: string;

  @property({
    type: 'object',
  })
  LocationId?: object;

  @property({
    type: 'date',
  })
  exportFileDate?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<CashEntries>) {
    super(data);
  }
}

export interface CashEntriesRelations {
  // describe navigational properties here
}

export type CashEntriesWithRelations = CashEntries & CashEntriesRelations;
