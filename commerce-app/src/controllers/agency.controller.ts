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
import {Agency} from '../models';
import {AgencyRepository} from '../repositories';

export class AgencyController {
  constructor(
    @repository(AgencyRepository)
    public agencyRepository : AgencyRepository,
  ) {}

  @post('/agencies')
  @response(200, {
    description: 'Agency model instance',
    content: {'application/json': {schema: getModelSchemaRef(Agency)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Agency, {
            title: 'NewAgency',
            exclude: ['agencyId'],
          }),
        },
      },
    })
    agency: Omit<Agency, 'agencyId'>,
  ): Promise<Agency> {
    return this.agencyRepository.create(agency);
  }

  @get('/agencies/count')
  @response(200, {
    description: 'Agency model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Agency) where?: Where<Agency>,
  ): Promise<Count> {
    return this.agencyRepository.count(where);
  }

  @get('/agencies')
  @response(200, {
    description: 'Array of Agency model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Agency, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Agency) filter?: Filter<Agency>,
  ): Promise<Agency[]> {
    return this.agencyRepository.find(filter);
  }

  @patch('/agencies')
  @response(200, {
    description: 'Agency PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Agency, {partial: true}),
        },
      },
    })
    agency: Agency,
    @param.where(Agency) where?: Where<Agency>,
  ): Promise<Count> {
    return this.agencyRepository.updateAll(agency, where);
  }

  @get('/agencies/{agencyId}')
  @response(200, {
    description: 'Agency model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Agency, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('agencyId') agencyId: string,
    @param.filter(Agency, {exclude: 'where'}) filter?: FilterExcludingWhere<Agency>
  ): Promise<Agency> {
    return this.agencyRepository.findById(agencyId, filter);
  }

  @patch('/agencies/{agencyId}')
  @response(204, {
    description: 'Agency PATCH success',
  })
  async updateById(
    @param.path.string('agencyId') agencyId: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Agency, {partial: true}),
        },
      },
    })
    agency: Agency,
  ): Promise<void> {
    await this.agencyRepository.updateById(agencyId, agency);
  }

  @put('/agencies/{agencyId}')
  @response(204, {
    description: 'Agency PUT success',
  })
  async replaceById(
    @param.path.string('agencyId') agencyId: string,
    @requestBody() agency: Agency,
  ): Promise<void> {
    await this.agencyRepository.replaceById(agencyId, agency);
  }

  @del('/agencies/{agencyId}')
  @response(204, {
    description: 'Agency DELETE success',
  })
  async deleteById(@param.path.string('agencyId') agencyId: string): Promise<void> {
    await this.agencyRepository.deleteById(agencyId);
  }
}
