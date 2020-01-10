import {Getter, inject} from '@loopback/context';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {Group, Location, LocationRelations} from '../models';
import {GroupRepository} from '../repositories';
import {MongoDataSource} from '../datasources';


export class LocationRepository extends DefaultCrudRepository<Location,
  typeof Location.prototype.id,
  LocationRelations> {
  public readonly group: BelongsToAccessor<Group,
    typeof Location.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
    @repository.getter('GroupRepository')
      groupRepositoryGetter: Getter<GroupRepository>,
  ) {
    super(Location, dataSource);
    this.group = this.createBelongsToAccessorFor(
      'group',
      groupRepositoryGetter,
    );
    this.registerInclusionResolver('group', this.group.inclusionResolver);
  }
}
