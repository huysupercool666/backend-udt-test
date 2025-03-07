import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {EcommerceDbDataSource} from '../datasources';
import {Product, ProductRelations} from '../models';

export class ProductRepository extends DefaultCrudRepository<
  Product,
  typeof Product.prototype.ProductId,
  ProductRelations
> {
  constructor(
    @inject('datasources.ecommerceDb') dataSource: EcommerceDbDataSource,
  ) {
    super(Product, dataSource);
  }
}
