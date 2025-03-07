import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {EcommerceDbDataSource} from '../datasources';
import {Agency, AgencyRelations} from '../models';

export class AgencyRepository extends DefaultCrudRepository<
  Agency,
  typeof Agency.prototype.AgencyId,
  AgencyRelations
> {
  constructor(
    @inject('datasources.ecommerceDb') dataSource: EcommerceDbDataSource,
  ) {
    super(Agency, dataSource);
  }
}
