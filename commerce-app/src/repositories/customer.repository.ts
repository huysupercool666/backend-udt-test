import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {EcommerceDbDataSource} from '../datasources';
import {Customer, CustomerRelations, Cart, Transaction} from '../models';
import {CartRepository} from './cart.repository';
import {TransactionRepository} from './transaction.repository';

export class CustomerRepository extends DefaultCrudRepository<
  Customer,
  typeof Customer.prototype.customerId,
  CustomerRelations
> {

  public readonly carts: HasManyRepositoryFactory<Cart, typeof Customer.prototype.customerId>;

  public readonly transactions: HasManyRepositoryFactory<Transaction, typeof Customer.prototype.customerId>;

  constructor(
    @inject('datasources.ecommerceDb') dataSource: EcommerceDbDataSource, @repository.getter('CartRepository') protected cartRepositoryGetter: Getter<CartRepository>, @repository.getter('TransactionRepository') protected transactionRepositoryGetter: Getter<TransactionRepository>,
  ) {
    super(Customer, dataSource);
    this.transactions = this.createHasManyRepositoryFactoryFor('transactions', transactionRepositoryGetter,);
    this.registerInclusionResolver('transactions', this.transactions.inclusionResolver);
    this.carts = this.createHasManyRepositoryFactoryFor('carts', cartRepositoryGetter,);
    this.registerInclusionResolver('carts', this.carts.inclusionResolver);
  }
}
