import { inject, Getter} from '@loopback/core';
import { DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import { EcommerceDbDataSource } from '../datasources';
import { Billing, BillingRelations, Transaction} from '../models';
import {TransactionRepository} from './transaction.repository';

export class BillingRepository extends DefaultCrudRepository<
  Billing,
  typeof Billing.prototype.billingId,
  BillingRelations
> {

  public readonly transaction: BelongsToAccessor<Transaction, typeof Billing.prototype.billingId>;

  constructor(
    @inject('datasources.ecommerceDb') dataSource: EcommerceDbDataSource, @repository.getter('TransactionRepository') protected transactionRepositoryGetter: Getter<TransactionRepository>,
  ) {
    super(Billing, dataSource);
    this.transaction = this.createBelongsToAccessorFor('transaction', transactionRepositoryGetter,);
    this.registerInclusionResolver('transaction', this.transaction.inclusionResolver);
  }
}
