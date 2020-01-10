import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class UserLocation extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @property({
    type: 'string',
    required: true,
  })
  UserId: string;

  @property({
    type: 'string',
    required: true,
  })
  LocaitonId: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<UserLocation>) {
    super(data);
  }
}

export interface UserLocationRelations {
  // describe navigational properties here
}

export type UserLocationWithRelations = UserLocation & UserLocationRelations;
