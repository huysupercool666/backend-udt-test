import { inject, Getter} from '@loopback/core';
import { DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import { EcommerceDbDataSource } from '../datasources';
import { Transaction, TransactionRelations, Customer, Agency, Cart, Billing} from '../models';
import {CustomerRepository} from './customer.repository';
import {AgencyRepository} from './agency.repository';
import {CartRepository} from './cart.repository';
import {BillingRepository} from './billing.repository';

export class TransactionRepository extends DefaultCrudRepository<
  Transaction,
  typeof Transaction.prototype.transactionId,
  TransactionRelations
> {

  public readonly customer: BelongsToAccessor<Customer, typeof Transaction.prototype.transactionId>;

  public readonly agency: BelongsToAccessor<Agency, typeof Transaction.prototype.transactionId>;

  public readonly cart: BelongsToAccessor<Cart, typeof Transaction.prototype.transactionId>;

  public readonly billing: HasOneRepositoryFactory<Billing, typeof Transaction.prototype.transactionId>;

  constructor(
    @inject('datasources.ecommerceDb') dataSource: EcommerceDbDataSource, @repository.getter('CustomerRepository') protected customerRepositoryGetter: Getter<CustomerRepository>, @repository.getter('AgencyRepository') protected agencyRepositoryGetter: Getter<AgencyRepository>, @repository.getter('CartRepository') protected cartRepositoryGetter: Getter<CartRepository>, @repository.getter('BillingRepository') protected billingRepositoryGetter: Getter<BillingRepository>,
  ) {
    super(Transaction, dataSource);
    this.billing = this.createHasOneRepositoryFactoryFor('billing', billingRepositoryGetter);
    this.registerInclusionResolver('billing', this.billing.inclusionResolver);
    this.cart = this.createBelongsToAccessorFor('cart', cartRepositoryGetter,);
    this.registerInclusionResolver('cart', this.cart.inclusionResolver);
    this.agency = this.createBelongsToAccessorFor('agency', agencyRepositoryGetter,);
    this.registerInclusionResolver('agency', this.agency.inclusionResolver);
    this.customer = this.createBelongsToAccessorFor('customer', customerRepositoryGetter,);
    this.registerInclusionResolver('customer', this.customer.inclusionResolver);
  }
}
