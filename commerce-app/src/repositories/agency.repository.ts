import { inject, Getter} from '@loopback/core';
import { DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import { EcommerceDbDataSource } from '../datasources';
import { Agency, AgencyRelations, Admin, Product, Transaction} from '../models';
import {AdminRepository} from './admin.repository';
import {ProductRepository} from './product.repository';
import {TransactionRepository} from './transaction.repository';

export class AgencyRepository extends DefaultCrudRepository<
  Agency,
  typeof Agency.prototype.agencyId,
  AgencyRelations
> {

  public readonly admin: BelongsToAccessor<Admin, typeof Agency.prototype.agencyId>;

  public readonly products: HasManyRepositoryFactory<Product, typeof Agency.prototype.agencyId>;

  public readonly transactions: HasManyRepositoryFactory<Transaction, typeof Agency.prototype.agencyId>;

  constructor(
    @inject('datasources.ecommerceDb') dataSource: EcommerceDbDataSource, @repository.getter('AdminRepository') protected adminRepositoryGetter: Getter<AdminRepository>, @repository.getter('ProductRepository') protected productRepositoryGetter: Getter<ProductRepository>, @repository.getter('TransactionRepository') protected transactionRepositoryGetter: Getter<TransactionRepository>,
  ) {
    super(Agency, dataSource);
    this.transactions = this.createHasManyRepositoryFactoryFor('transactions', transactionRepositoryGetter,);
    this.registerInclusionResolver('transactions', this.transactions.inclusionResolver);
    this.products = this.createHasManyRepositoryFactoryFor('products', productRepositoryGetter,);
    this.registerInclusionResolver('products', this.products.inclusionResolver);
    this.admin = this.createBelongsToAccessorFor('admin', adminRepositoryGetter,);
    this.registerInclusionResolver('admin', this.admin.inclusionResolver);
  }
}
