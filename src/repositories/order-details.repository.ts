import {DefaultCrudRepository} from '@loopback/repository';
import {OrderDetails, OrderDetailsRelations} from '../models';
import {MongoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class OrderDetailsRepository extends DefaultCrudRepository<
  OrderDetails,
  typeof OrderDetails.prototype._id,
  OrderDetailsRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(OrderDetails, dataSource);
  }
}
