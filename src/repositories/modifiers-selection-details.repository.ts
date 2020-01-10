import {DefaultCrudRepository} from '@loopback/repository';
import {ModifiersSelectionDetails, ModifiersSelectionDetailsRelations} from '../models';
import {MongoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ModifiersSelectionDetailsRepository extends DefaultCrudRepository<
  ModifiersSelectionDetails,
  typeof ModifiersSelectionDetails.prototype._id,
  ModifiersSelectionDetailsRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(ModifiersSelectionDetails, dataSource);
  }
}
