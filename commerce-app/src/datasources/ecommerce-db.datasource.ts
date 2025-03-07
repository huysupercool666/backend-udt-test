import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'ecommerceDb',
  connector: 'mongodb',
  url: 'mongodb+srv://huyTD:0995538418a@huy-database.hcx0t.mongodb.net/',
  host: '',
  port: 0,
  user: '',
  password: '',
  database: 'ecommerce',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class EcommerceDbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'ecommerceDb';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.ecommerceDb', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
