import {DefaultCrudRepository} from '@loopback/repository';
import {TimeEntries, TimeEntriesRelations} from '../models';
import {MongoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TimeEntriesRepository extends DefaultCrudRepository<
  TimeEntries,
  typeof TimeEntries.prototype._id,
  TimeEntriesRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(TimeEntries, dataSource);
  }
}
