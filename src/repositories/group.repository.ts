import {Getter, inject} from '@loopback/context';
import {BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory, repository, juggler} from '@loopback/repository';
import {Group, GroupRelations, Location, Tenant} from '../models';
import {LocationRepository, TenantRepository} from '../repositories';
import {MongoDataSource} from '../datasources';

export class GroupRepository extends DefaultCrudRepository<Group,
  typeof Group.prototype.id,
  GroupRelations> {

  public readonly tenant: BelongsToAccessor<Tenant,
    typeof Group.prototype.id>;
  public readonly locations: HasManyRepositoryFactory<Location,
    typeof Group.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
    @repository.getter('LocationRepository')
      getLocationRepository: Getter<LocationRepository>,
    @repository.getter('TenantRepository')
      tenantRepositoryGetter: Getter<TenantRepository>,
  ) {
    super(Group, dataSource);
    this.tenant = this.createBelongsToAccessorFor(
      'tenant',
      tenantRepositoryGetter,
    );
    this.locations = this.createHasManyRepositoryFactoryFor(
      'locations',
      getLocationRepository,
    );
    this.registerInclusionResolver('locations', this.locations.inclusionResolver);
    this.registerInclusionResolver('tenant', this.tenant.inclusionResolver);
  }
}
