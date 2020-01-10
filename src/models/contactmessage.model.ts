import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Contactmessage extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'string',
  })
  email?: string;

  @property({
    type: 'string',
  })
  messages?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Contactmessage>) {
    super(data);
  }
}

export interface ContactmessageRelations {
  // describe navigational properties here
}

export type ContactmessageWithRelations = Contactmessage & ContactmessageRelations;
