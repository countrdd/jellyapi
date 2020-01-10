import {belongsTo, Entity, model, property} from '@loopback/repository';
import {BaseEntity} from './base-entity.model';
import {UserTenants} from './user-tenants.model';

@model()
export class UserTenantPermissions extends BaseEntity {
  @property({
    type: 'string',
    mongodb: {dataType: 'ObjectID'},
    id: true,
  })
  id?: string;

  @belongsTo(
    () => UserTenants,
    {keyFrom: 'usertenantid', name: 'usertenantid'},
    {
      name: 'usertenantid',
      required: true,
    },
  )
  userTenantId: number;

  @property({
    type: 'string',
  })
  permission?: string;

  @property({
    type: 'string',
  })
  allowed?: string;


  constructor(data?: Partial<UserTenantPermissions>) {
    super(data);
  }
}

export interface UserTenantPermissionsRelations {
  // describe navigational properties here
}

export type UserTenantPermissionsWithRelations = UserTenantPermissions & UserTenantPermissionsRelations;
