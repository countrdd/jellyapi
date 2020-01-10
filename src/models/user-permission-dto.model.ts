import {Model, model, property} from '@loopback/repository';

@model({settings: {}})
export class UserPermissionsDto extends Model {
  @property({
    type: 'string',
    required: true,
  })
  permission: string;

  @property({
    type: 'boolean',
    required: true,
  })
  allowed: boolean;

  constructor(data?: Partial<UserPermissionsDto>) {
    super(data);
  }
}
