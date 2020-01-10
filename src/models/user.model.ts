// Copyright IBM Corp. 2018. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {Entity, model, property, hasMany} from '@loopback/repository';
import {Roles} from './roles.model';


@model({
  settings: {
    strict: false,
    indexes: {
      uniqueEmail: {
        keys: {
          email: 1,
        },
        options: {
          unique: true,
        },
      },
    },
  },
})
export class User extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,

  })
  email: string;

  @property({
    type: 'string',
  })
  password: string;

  @property({
    type: 'string',
  })
  firstName?: string;

  @property({
    type: 'string',
  })
  lastName?: string;

  @property({
    type: 'boolean',
  })
  sysadmin?: boolean;

  @property({
    type: 'boolean',
  })
  active?: boolean;

  @property({
    type: 'string',
  })
  selectedLocation?: string;
  @property({
    type: 'string',
  })
  selectedLocationName?: string;


  @property({
    type: 'string',
    mongodb: {dataType: 'ObjectID'},
  })
  defaultTenant?: string;

  @property({
    type: 'string',
    mongodb: {dataType: 'ObjectID'},
  })
  defaultLocation?: string;
  @property({
    type: 'string',
    mongodb: {dataType: 'ObjectID'},
  })
  defaultGroup?: string;

  @property({
    type: 'date',
  })
  lastLogin?: string;

  @property({
    type: 'string',
  })
  address?: string;
  @property({
    type: 'string',
  })
  city?: string;
  @property({
    type: 'string',
  })
  state?: string;
  @property({
    type: 'string',
  })
  zipCode?: string;

  @property({
    type: 'string',
  })
  phone?: string;




  constructor(data?: Partial<User>) {
    super(data);
  }

}
export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = Roles & UserRelations;
