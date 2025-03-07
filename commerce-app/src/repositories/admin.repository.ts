import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {EcommerceDbDataSource} from '../datasources';
import {Admin, AdminRelations} from '../models';

export class AdminRepository extends DefaultCrudRepository<
  Admin,
  typeof Admin.prototype.AdminId,
  AdminRelations
> {
  constructor(
    @inject('datasources.ecommerceDb') dataSource: EcommerceDbDataSource,
  ) {
    super(Admin, dataSource);
  }
}
