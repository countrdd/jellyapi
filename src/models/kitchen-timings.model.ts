import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class KitchenTimings extends Entity {
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
  ID?: string;

  @property({
    type: 'string',
  })
  Server?: string;

  @property({
    type: 'string',
  })
  CheckNumber?: string;

  @property({
    type: 'string',
  })
  Table?: string;

  @property({
    type: 'date',
  })
  CheckOpened?: string;

  @property({
    type: 'string',
  })
  Station?: string;

  @property({
    type: 'string',
  })
  ExpediterLevel?: string;

  @property({
    type: 'date',
  })
  FiredDate?: string;

  @property({
    type: 'date',
  })
  FulfilledDate?: string;

  @property({
    type: 'string',
  })
  FulfillmentTime?: string;

  @property({
    type: 'string',
  })
  FulfilledBy?: string;

  @property({
    type: 'date',
  })
  exportFileDate?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<KitchenTimings>) {
    super(data);
  }
}

export interface KitchenTimingsRelations {
  // describe navigational properties here
}

export type KitchenTimingsWithRelations = KitchenTimings & KitchenTimingsRelations;
