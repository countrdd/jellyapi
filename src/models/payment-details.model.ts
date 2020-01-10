import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class PaymentDetails extends Entity {
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
  PaymentId?: string;

  @property({
    type: 'string',
  })
  OrderId?: string;

  @property({
    type: 'number',
  })
  OrderNumber?: number;

  @property({
    type: 'date',
  })
  PaidDate?: string;

  @property({
    type: 'date',
  })
  OrderDate?: string;

  @property({
    type: 'string',
  })
  CheckId?: string;

  @property({
    type: 'string',
  })
  CheckNumber?: string;

  @property({
    type: 'string',
  })
  TabName?: string;

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
  DiningArea?: string;

  @property({
    type: 'string',
  })
  Service?: string;

  @property({
    type: 'string',
  })
  DiningOption?: string;

  @property({
    type: 'string',
  })
  HouseAcctNumber?: string;

  @property({
    type: 'number',
  })
  Amount?: number;

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
    type: 'number',
  })
  SwipedCardAmount?: number;

  @property({
    type: 'number',
  })
  KeyedCardAmount?: number;

  @property({
    type: 'number',
  })
  AmountTendered?: number;

  @property({
    type: 'string',
  })
  Refunded?: string;

  @property({
    type: 'number',
  })
  RefundAmount?: number;

  @property({
    type: 'number',
  })
  RefundTipAmount?: number;

  @property({
    type: 'string',
  })
  VoidUser?: string;

  @property({
    type: 'string',
  })
  VoidApprover?: string;

  @property({
    type: 'string',
  })
  VoidDate?: string;

  @property({
    type: 'string',
  })
  Status?: string;

  @property({
    type: 'string',
  })
  Type?: string;

  @property({
    type: 'string',
  })
  CashDrawer?: string;

  @property({
    type: 'string',
  })
  CardType?: string;

  @property({
    type: 'string',
  })
  OtherType?: string;

  @property({
    type: 'string',
  })
  email?: string;

  @property({
    type: 'string',
  })
  Phone?: string;

  @property({
    type: 'string',
  })
  Last4CardDigits?: string;

  @property({
    type: 'string',
  })
  Receipt?: string;

  @property({
    type: 'string',
  })
  Source?: string;

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

  constructor(data?: Partial<PaymentDetails>) {
    super(data);
  }
}

export interface PaymentDetailsRelations {
  // describe navigational properties here
}

export type PaymentDetailsWithRelations = PaymentDetails & PaymentDetailsRelations;
