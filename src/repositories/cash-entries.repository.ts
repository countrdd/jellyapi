import {DefaultCrudRepository} from '@loopback/repository';
import {CashEntries, CashEntriesRelations} from '../models';
import {MongoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CashEntriesRepository extends DefaultCrudRepository<
  CashEntries,
  typeof CashEntries.prototype._id,
  CashEntriesRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(CashEntries, dataSource);
  }
}
