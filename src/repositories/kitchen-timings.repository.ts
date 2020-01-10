import {DefaultCrudRepository} from '@loopback/repository';
import {KitchenTimings, KitchenTimingsRelations} from '../models';
import {MongoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class KitchenTimingsRepository extends DefaultCrudRepository<
  KitchenTimings,
  typeof KitchenTimings.prototype._id,
  KitchenTimingsRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(KitchenTimings, dataSource);
  }
}
