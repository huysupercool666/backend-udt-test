import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {EcommerceDbDataSource} from '../datasources';
import {Billing, BillingRelations} from '../models';

export class BillingRepository extends DefaultCrudRepository<
  Billing,
  typeof Billing.prototype.BillingId,
  BillingRelations
> {
  constructor(
    @inject('datasources.ecommerceDb') dataSource: EcommerceDbDataSource,
  ) {
    super(Billing, dataSource);
  }
}
