import {DefaultCrudRepository} from '@loopback/repository';
import {ItemSelectionDetails, ItemSelectionDetailsRelations} from '../models';
import {MongoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ItemSelectionDetailsRepository extends DefaultCrudRepository<
  ItemSelectionDetails,
  typeof ItemSelectionDetails.prototype._id,
  ItemSelectionDetailsRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(ItemSelectionDetails, dataSource);
  }
}
