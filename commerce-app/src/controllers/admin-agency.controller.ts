import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import { Admin, Agency } from '../models';
import { AdminRepository } from '../repositories';

export class AdminAgencyController {
  constructor(
    @repository(AdminRepository) protected adminRepository: AdminRepository,
  ) {}

  @get('/admins/{adminId}/agencies', {
    responses: {
      '200': {
        description: 'Array of Admin has many Agency',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Agency) },
          },
        },
      },
    },
  })
  async find(
    @param.path.string('adminId') adminId: string,
    @param.query.object('filter') filter?: Filter<Agency>,
  ): Promise<Agency[]> {
    return this.adminRepository.agencies(adminId).find(filter);
  }

  @post('/admins/{adminId}/agencies', {
    responses: {
      '200': {
        description: 'Admin model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Agency) } },
      },
    },
  })
  async create(
    @param.path.string('adminId') adminId: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Agency, {
            title: 'NewAgencyInAdmin',
            exclude: ['agencyId'],
            optional: ['adminId'],
          }),
        },
      },
    })
    agency: Omit<Agency, 'agencyId'>,
  ): Promise<Agency> {
    return this.adminRepository.agencies(adminId).create(agency);
  }

  @patch('/admins/{adminId}/agencies', {
    responses: {
      '200': {
        description: 'Admin.Agency PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async patch(
    @param.path.string('adminId') adminId: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Agency, { partial: true }),
        },
      },
    })
    agency: Partial<Agency>,
    @param.query.object('where', getWhereSchemaFor(Agency))
    where?: Where<Agency>,
  ): Promise<Count> {
    return this.adminRepository.agencies(adminId).patch(agency, where);
  }

  @del('/admins/{adminId}/agencies', {
    responses: {
      '200': {
        description: 'Admin.Agency DELETE success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async delete(
    @param.path.string('adminId') adminId: string,
    @param.query.object('where', getWhereSchemaFor(Agency))
    where?: Where<Agency>,
  ): Promise<Count> {
    return this.adminRepository.agencies(adminId).delete(where);
  }
}
