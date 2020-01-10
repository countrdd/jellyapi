import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class TimeEntries extends Entity {
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
  LocationCode?: string;

  @property({
    type: 'string',
  })
  Id?: string;

  @property({
    type: 'string',
  })
  GUID?: string;

  @property({
    type: 'string',
  })
  EmployeeId?: string;

  @property({
    type: 'string',
  })
  EmployeeGUID?: string;

  @property({
    type: 'string',
  })
  EmployeeExternalId?: string;

  @property({
    type: 'string',
  })
  Employee?: string;

  @property({
    type: 'string',
  })
  JobId?: string;

  @property({
    type: 'string',
  })
  JobCode?: string;

  @property({
    type: 'string',
  })
  JobTitle?: string;

  @property({
    type: 'date',
  })
  InDate?: string;

  @property({
    type: 'date',
  })
  OutDate?: string;

  @property({
    type: 'number',
  })
  TotalHours?: number;

  @property({
    type: 'number',
  })
  UnpaidBreakTime?: number;

  @property({
    type: 'number',
  })
  PaidBreakTime?: number;

  @property({
    type: 'number',
  })
  PayableHours?: number;

  @property({
    type: 'number',
  })
  CashTipsDeclared?: number;

  @property({
    type: 'number',
  })
  NonCashTips?: number;

  @property({
    type: 'number',
  })
  TotalGratuity?: number;

  @property({
    type: 'number',
  })
  TotalTips?: number;

  @property({
    type: 'number',
  })
  TipsWithheld?: number;

  @property({
    type: 'number',
  })
  Wage?: number;

  @property({
    type: 'number',
  })
  RegularHours?: number;

  @property({
    type: 'number',
  })
  OvertimeHours?: number;

  @property({
    type: 'number',
  })
  RegularPay?: number;

  @property({
    type: 'number',
  })
  OvertimePay?: number;

  @property({
    type: 'number',
  })
  TotalPay?: number;

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

  constructor(data?: Partial<TimeEntries>) {
    super(data);
  }
}

export interface TimeEntriesRelations {
  // describe navigational properties here
}

export type TimeEntriesWithRelations = TimeEntries & TimeEntriesRelations;
