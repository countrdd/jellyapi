import {DefaultCrudRepository} from '@loopback/repository';
import {CheckDetails, CheckDetailsRelations} from '../models';
import {MongoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CheckDetailsRepository extends DefaultCrudRepository<
  CheckDetails,
  typeof CheckDetails.prototype._id,
  CheckDetailsRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(CheckDetails, dataSource);
  }
}
