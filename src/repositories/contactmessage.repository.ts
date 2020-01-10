import {DefaultCrudRepository} from '@loopback/repository';
import {Contactmessage, ContactmessageRelations} from '../models';
import {MongoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ContactmessageRepository extends DefaultCrudRepository<
  Contactmessage,
  typeof Contactmessage.prototype.id,
  ContactmessageRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(Contactmessage, dataSource);
  }
}
