import {DefaultCrudRepository, Getter, HasManyRepositoryFactory, juggler, repository} from '@loopback/repository';
import {inject} from '@loopback/core';
import {Group, Tenant, TenantRelations} from '../models';
import {GroupRepository} from './group.repository';
import {MongoDataSource} from '../datasources';

export class TenantRepository extends DefaultCrudRepository<
  Tenant,
  typeof Tenant.prototype.id,
  TenantRelations
> {
  public readonly groups: HasManyRepositoryFactory<
    Group,
    typeof Tenant.prototype.id
    >;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
    @repository.getter('GroupRepository')
      getGroupRepository: Getter<GroupRepository>,
  ) {
    super(Tenant, dataSource);
    this.groups = this.createHasManyRepositoryFactoryFor(
      'groups',
      getGroupRepository,
    );
    this.registerInclusionResolver('groups', this.groups.inclusionResolver);
  }
}
