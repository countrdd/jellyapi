import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class ItemSelectionDetails extends Entity {
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
    type: 'date',
  })
  SentDate?: string;

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
  ItemSelectionId?: string;

  @property({
    type: 'string',
  })
  ItemId?: string;

  @property({
    type: 'string',
  })
  MasterId?: string;

  @property({
    type: 'string',
  })
  SKU?: string;

  @property({
    type: 'string',
  })
  PLU?: string;

  @property({
    type: 'string',
  })
  MenuItem?: string;

  @property({
    type: 'string',
  })
  MenuSubGroups?: string;

  @property({
    type: 'string',
  })
  MenuGroup?: string;

  @property({
    type: 'string',
  })
  Menu?: string;

  @property({
    type: 'string',
  })
  SalesCategory?: string;

  @property({
    type: 'number',
  })
  GrossPrice?: number;

  @property({
    type: 'number',
  })
  Discnt?: number;

  @property({
    type: 'number',
  })
  NetPrice?: number;

  @property({
    type: 'number',
  })
  Qty?: number;

  @property({
    type: 'number',
  })
  Tax?: number;

  @property({
    type: 'string',
  })
  Void?: string;

  @property({
    type: 'string',
  })
  Deferred?: string;

  @property({
    type: 'string',
  })
  TaxExempt?: string;

  @property({
    type: 'string',
  })
  TaxInclusionOption?: string;

  @property({
    type: 'string',
  })
  DiningOptionTax?: string;

  @property({
    type: 'string',
  })
  TabName?: string;

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

  constructor(data?: Partial<ItemSelectionDetails>) {
    super(data);
  }
}

export interface ItemSelectionDetailsRelations {
  // describe navigational properties here
}

export type ItemSelectionDetailsWithRelations = ItemSelectionDetails & ItemSelectionDetailsRelations;
