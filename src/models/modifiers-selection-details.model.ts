import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class ModifiersSelectionDetails extends Entity {
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
  ModifierId?: string;

  @property({
    type: 'string',
  })
  MasterId?: string;

  @property({
    type: 'string',
  })
  ModiferSKU?: string;

  @property({
    type: 'string',
  })
  ModifierPLU?: string;

  @property({
    type: 'string',
  })
  Modifier?: string;

  @property({
    type: 'string',
  })
  OptionGroupName?: string;

  @property({
    type: 'string',
  })
  OptionGroupID?: string;

  @property({
    type: 'string',
  })
  ParentMenuSelectionItemID?: string;

  @property({
    type: 'string',
  })
  ParentMenuSelection?: string;

  @property({
    type: 'string',
  })
  SalesCateogry?: string;

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
    type: 'string',
  })
  Void?: string;

  @property({
    type: 'string',
  })
  VoidReasonID?: string;

  @property({
    type: 'string',
  })
  VoidReason?: string;

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

  constructor(data?: Partial<ModifiersSelectionDetails>) {
    super(data);
  }
}

export interface ModifiersSelectionDetailsRelations {
  // describe navigational properties here
}

export type ModifiersSelectionDetailsWithRelations = ModifiersSelectionDetails & ModifiersSelectionDetailsRelations;
