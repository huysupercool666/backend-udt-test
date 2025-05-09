import { inject, Getter} from '@loopback/core';
import { DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import { EcommerceDbDataSource } from '../datasources';
import { Admin, AdminRelations, Agency} from '../models';
import {AgencyRepository} from './agency.repository';

export class AdminRepository extends DefaultCrudRepository<
  Admin,
  typeof Admin.prototype.adminId,
  AdminRelations
> {

  public readonly agencies: HasManyRepositoryFactory<Agency, typeof Admin.prototype.adminId>;

  constructor(
    @inject('datasources.ecommerceDb') dataSource: EcommerceDbDataSource, @repository.getter('AgencyRepository') protected agencyRepositoryGetter: Getter<AgencyRepository>,
  ) {
    super(Admin, dataSource);
    this.agencies = this.createHasManyRepositoryFactoryFor('agencies', agencyRepositoryGetter,);
    this.registerInclusionResolver('agencies', this.agencies.inclusionResolver);
  }
}
