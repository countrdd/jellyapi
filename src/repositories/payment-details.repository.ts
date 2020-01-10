import {DefaultCrudRepository} from '@loopback/repository';
import {PaymentDetails, PaymentDetailsRelations} from '../models';
import {MongoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PaymentDetailsRepository extends DefaultCrudRepository<
  PaymentDetails,
  typeof PaymentDetails.prototype._id,
  PaymentDetailsRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(PaymentDetails, dataSource);
  }
}
