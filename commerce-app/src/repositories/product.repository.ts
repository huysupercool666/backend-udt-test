import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {EcommerceDbDataSource} from '../datasources';
import {Product, ProductRelations, Agency, CartItem} from '../models';
import {AgencyRepository} from './agency.repository';
import {CartItemRepository} from './cart-item.repository';

export class ProductRepository extends DefaultCrudRepository<
  Product,
  typeof Product.prototype.productId,
  ProductRelations
> {

  public readonly agency: BelongsToAccessor<Agency, typeof Product.prototype.productId>;

  public readonly cartItems: HasManyRepositoryFactory<CartItem, typeof Product.prototype.productId>;

  constructor(
    @inject('datasources.ecommerceDb') dataSource: EcommerceDbDataSource, @repository.getter('AgencyRepository') protected agencyRepositoryGetter: Getter<AgencyRepository>, @repository.getter('CartItemRepository') protected cartItemRepositoryGetter: Getter<CartItemRepository>,
  ) {
    super(Product, dataSource);
    this.cartItems = this.createHasManyRepositoryFactoryFor('cartItems', cartItemRepositoryGetter,);
    this.registerInclusionResolver('cartItems', this.cartItems.inclusionResolver);
    this.agency = this.createBelongsToAccessorFor('agency', agencyRepositoryGetter,);
    this.registerInclusionResolver('agency', this.agency.inclusionResolver);
  }
}
