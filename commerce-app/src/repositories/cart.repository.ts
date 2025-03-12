import { inject, Getter} from '@loopback/core';
import { DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import { EcommerceDbDataSource } from '../datasources';
import { Cart, CartRelations, Customer, Transaction, CartItem} from '../models';
import {CustomerRepository} from './customer.repository';
import {TransactionRepository} from './transaction.repository';
import {CartItemRepository} from './cart-item.repository';

export class CartRepository extends DefaultCrudRepository<
  Cart,
  typeof Cart.prototype.cartId,
  CartRelations
> {

  public readonly customer: BelongsToAccessor<Customer, typeof Cart.prototype.cartId>;

  public readonly transaction: HasOneRepositoryFactory<Transaction, typeof Cart.prototype.cartId>;

  public readonly cartItems: HasManyRepositoryFactory<CartItem, typeof Cart.prototype.cartId>;

  constructor(
    @inject('datasources.ecommerceDb') dataSource: EcommerceDbDataSource, @repository.getter('CustomerRepository') protected customerRepositoryGetter: Getter<CustomerRepository>, @repository.getter('TransactionRepository') protected transactionRepositoryGetter: Getter<TransactionRepository>, @repository.getter('CartItemRepository') protected cartItemRepositoryGetter: Getter<CartItemRepository>,
  ) {
    super(Cart, dataSource);
    this.cartItems = this.createHasManyRepositoryFactoryFor('cartItems', cartItemRepositoryGetter,);
    this.registerInclusionResolver('cartItems', this.cartItems.inclusionResolver);
    this.transaction = this.createHasOneRepositoryFactoryFor('transaction', transactionRepositoryGetter);
    this.registerInclusionResolver('transaction', this.transaction.inclusionResolver);
    this.customer = this.createBelongsToAccessorFor('customer', customerRepositoryGetter,);
    this.registerInclusionResolver('customer', this.customer.inclusionResolver);
  }
}
