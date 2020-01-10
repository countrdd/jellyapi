import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Tenant} from './tenant.model';
import {Roles} from './roles.model';
import {User} from './user.model';

@model()
export class UserTenants extends Entity {
  @property({
    type: 'string',
    mongodb: {dataType: 'ObjectID'},
    id: true,
  })
  id?: string;

  @belongsTo(() => User)
  userId?: string;

  @belongsTo(() => Tenant)
  tenantId: string;

  @belongsTo(() => Roles)
  roleId?: string;

  @property({
    type: 'string',
  })
  status?: string;


  constructor(data?: Partial<UserTenants>) {
    super(data);
  }
}

export interface UserTenantsRelations {
  // describe navigational properties here
}

export type UserTenantsWithRelations = UserTenants & UserTenantsRelations;
