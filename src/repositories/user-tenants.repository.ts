import {DefaultCrudRepository} from '@loopback/repository';
import {UserTenants, UserTenantsRelations} from '../models';
import {MongoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class UserTenantsRepository extends DefaultCrudRepository<
  UserTenants,
  typeof UserTenants.prototype.id,
  UserTenantsRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(UserTenants, dataSource);
  }
}
