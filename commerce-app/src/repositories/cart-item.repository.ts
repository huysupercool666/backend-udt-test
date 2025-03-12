import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {EcommerceDbDataSource} from '../datasources';
import {CartItem, CartItemRelations} from '../models';

export class CartItemRepository extends DefaultCrudRepository<
  CartItem,
  typeof CartItem.prototype.cartItemId,
  CartItemRelations
> {
  constructor(
    @inject('datasources.ecommerceDb') dataSource: EcommerceDbDataSource,
  ) {
    super(CartItem, dataSource);
  }
}
