import {Getter, inject} from '@loopback/context';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {Roles, Tenant, User, UserTenantPermissions, UserTenantPermissionsRelations, UserTenants} from '../models';
import {MongoDataSource} from '../datasources';
import {UserTenantsRepository} from './user-tenants.repository';
import {TenantRepository} from './tenant.repository';
import {UserRepository} from './user.repository';
import {RolesRepository} from './roles.repository';

export class UserTenantPermissionsRepository extends DefaultCrudRepository<UserTenantPermissions,
  typeof UserTenantPermissions.prototype.id,
  UserTenantPermissionsRelations> {
  public readonly userTenant: BelongsToAccessor<UserTenants,
    typeof UserTenantPermissions.prototype.id>;
  public readonly tenant: BelongsToAccessor<Tenant,
    typeof UserTenants.prototype.id>;
  public readonly user: BelongsToAccessor<User,
    typeof UserTenants.prototype.id>;
  public readonly role: BelongsToAccessor<Roles,
    typeof UserTenants.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
    @repository.getter(TenantRepository)
      tenantRepositoryGetter: Getter<TenantRepository>,
    @repository.getter(UserRepository)
      userRepositoryGetter: Getter<UserRepository>,
    @repository.getter(RolesRepository)
      roleRepositoryGetter: Getter<RolesRepository>,
    @repository.getter(UserTenantsRepository)
      utRepositoryGetter: Getter<UserTenantsRepository>,
  ) {
    super(UserTenantPermissions, dataSource);

    this.userTenant = this._createBelongsToAccessorFor(
      'user_tenant_id',
      utRepositoryGetter,
    );
    this.tenant = this._createBelongsToAccessorFor(
      'tenant_id',
      tenantRepositoryGetter,
    );
    this.user = this._createBelongsToAccessorFor(
      'user_id',
      userRepositoryGetter,
    );
    this.role = this._createBelongsToAccessorFor(
      'role_id',
      roleRepositoryGetter,
    );

  }
}
