import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import { Customer } from '../models';
import { CustomerRepository } from '../repositories';

export class CustomerController {
  constructor(
    @repository(CustomerRepository)
    public customerRepository: CustomerRepository,
  ) {}

  @post('/customers')
  @response(200, {
    description: 'Customer model instance',
    content: { 'application/json': { schema: getModelSchemaRef(Customer) } },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Customer, {
            title: 'NewCustomer',
            exclude: ['customerId'],
          }),
        },
      },
    })
    customer: Omit<Customer, 'customerId'>,
  ): Promise<Customer> {
    return this.customerRepository.create(customer);
  }

  @get('/customers/count')
  @response(200, {
    description: 'Customer model count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async count(@param.where(Customer) where?: Where<Customer>): Promise<Count> {
    return this.customerRepository.count(where);
  }

  @get('/customers')
  @response(200, {
    description: 'Array of Customer model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Customer, { includeRelations: true }),
        },
      },
    },
  })
  async find(
    @param.filter(Customer) filter?: Filter<Customer>,
  ): Promise<Customer[]> {
    return this.customerRepository.find(filter);
  }

  @patch('/customers')
  @response(200, {
    description: 'Customer PATCH success count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Customer, { partial: true }),
        },
      },
    })
    customer: Customer,
    @param.where(Customer) where?: Where<Customer>,
  ): Promise<Count> {
    return this.customerRepository.updateAll(customer, where);
  }

  @get('/customers/{customerId}')
  @response(200, {
    description: 'Customer model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Customer, { includeRelations: true }),
      },
    },
  })
  async findById(
    @param.path.string('customerId') customerId: string,
    @param.filter(Customer, { exclude: 'where' })
    filter?: FilterExcludingWhere<Customer>,
  ): Promise<Customer> {
    return this.customerRepository.findById(customerId, filter);
  }

  @patch('/customers/{customerId}')
  @response(204, {
    description: 'Customer PATCH success',
  })
  async updateById(
    @param.path.string('customerId') customerId: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Customer, { partial: true }),
        },
      },
    })
    customer: Customer,
  ): Promise<void> {
    await this.customerRepository.updateById(customerId, customer);
  }

  @put('/customers/{customerId}')
  @response(204, {
    description: 'Customer PUT success',
  })
  async replaceById(
    @param.path.string('customerId') customerId: string,
    @requestBody() customer: Customer,
  ): Promise<void> {
    await this.customerRepository.replaceById(customerId, customer);
  }

  @del('/customers/{customerId}')
  @response(204, {
    description: 'Customer DELETE success',
  })
  async deleteById(
    @param.path.string('customerId') customerId: string,
  ): Promise<void> {
    await this.customerRepository.deleteById(customerId);
  }
}
