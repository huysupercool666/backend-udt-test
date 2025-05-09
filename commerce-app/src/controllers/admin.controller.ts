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
import { Admin } from '../models';
import { AdminRepository } from '../repositories';

export class AdminController {
  constructor(
    @repository(AdminRepository)
    public adminRepository: AdminRepository,
  ) {}

  @post('/admins')
  @response(200, {
    description: 'Admin model instance',
    content: { 'application/json': { schema: getModelSchemaRef(Admin) } },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Admin, {
            title: 'NewAdmin',
            exclude: ['adminId'],
          }),
        },
      },
    })
    admin: Omit<Admin, 'adminId'>,
  ): Promise<Admin> {
    return this.adminRepository.create(admin);
  }

  @get('/admins/count')
  @response(200, {
    description: 'Admin model count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async count(@param.where(Admin) where?: Where<Admin>): Promise<Count> {
    return this.adminRepository.count(where);
  }

  @get('/admins')
  @response(200, {
    description: 'Array of Admin model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Admin, { includeRelations: true }),
        },
      },
    },
  })
  async find(@param.filter(Admin) filter?: Filter<Admin>): Promise<Admin[]> {
    return this.adminRepository.find(filter);
  }

  @patch('/admins')
  @response(200, {
    description: 'Admin PATCH success count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Admin, { partial: true }),
        },
      },
    })
    admin: Admin,
    @param.where(Admin) where?: Where<Admin>,
  ): Promise<Count> {
    return this.adminRepository.updateAll(admin, where);
  }

  @get('/admins/{adminId}')
  @response(200, {
    description: 'Admin model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Admin, { includeRelations: true }),
      },
    },
  })
  async findById(
    @param.path.string('adminId') adminId: string,
    @param.filter(Admin, { exclude: 'where' })
    filter?: FilterExcludingWhere<Admin>,
  ): Promise<Admin> {
    return this.adminRepository.findById(adminId, filter);
  }

  @patch('/admins/{adminId}')
  @response(204, {
    description: 'Admin PATCH success',
  })
  async updateById(
    @param.path.string('adminId') adminId: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Admin, { partial: true }),
        },
      },
    })
    admin: Admin,
  ): Promise<void> {
    await this.adminRepository.updateById(adminId, admin);
  }

  @put('/admins/{adminId}')
  @response(204, {
    description: 'Admin PUT success',
  })
  async replaceById(
    @param.path.string('adminId') adminId: string,
    @requestBody() admin: Admin,
  ): Promise<void> {
    await this.adminRepository.replaceById(adminId, admin);
  }

  @del('/admins/{adminId}')
  @response(204, {
    description: 'Admin DELETE success',
  })
  async deleteById(
    @param.path.string('adminId') adminId: string,
  ): Promise<void> {
    await this.adminRepository.deleteById(adminId);
  }
}
