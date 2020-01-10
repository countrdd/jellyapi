import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class OrderDetails extends Entity {
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
  OrderId?: string;

  @property({
    type: 'number',
  })
  OrderNumber?: number;

  @property({
    type: 'string',
  })
  Checks?: string;

  @property({
    type: 'date',
  })
  Opened?: string;

  @property({
    type: 'number',
  })
  NoofGuests?: number;

  @property({
    type: 'string',
  })
  TabNames?: string;

  @property({
    type: 'string',
  })
  Server?: string;

  @property({
    type: 'string',
  })
  Table?: string;

  @property({
    type: 'string',
  })
  RevenueCenter?: string;

  @property({
    type: 'string',
  })
  DiningArea?: string;

  @property({
    type: 'string',
  })
  Service?: string;

  @property({
    type: 'string',
  })
  DiningOptions?: string;

  @property({
    type: 'number',
  })
  DiscountAmount?: number;

  @property({
    type: 'number',
  })
  Amount?: number;

  @property({
    type: 'number',
  })
  Tax?: number;

  @property({
    type: 'number',
  })
  Tip?: number;

  @property({
    type: 'number',
  })
  Gratuity?: number;

  @property({
    type: 'number',
  })
  Total?: number;

  @property({
    type: 'string',
  })
  Voided?: string;

  @property({
    type: 'date',
  })
  Paid?: string;

  @property({
    type: 'date',
  })
  Closed?: string;

  @property({
    type: 'string',
  })
  Duration?: string;

  @property({
    type: 'string',
  })
  OrderSource?: string;

  @property({
    type: 'object',
  })
  locationId?: object;

  @property({
    type: 'date',
  })
  exportFileDate?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<OrderDetails>) {
    super(data);
  }
}

export interface OrderDetailsRelations {
  // describe navigational properties here
}

export type OrderDetailsWithRelations = OrderDetails & OrderDetailsRelations;
