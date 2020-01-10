import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {CheckDetails} from '../models';
import {CheckDetailsRepository} from '../repositories';

export class CheckDetailsController {
  constructor(
    @repository(CheckDetailsRepository)
    public checkDetailsRepository : CheckDetailsRepository,
  ) {}

  @post('/check-details', {
    responses: {
      '200': {
        description: 'CheckDetails model instance',
        content: {'application/json': {schema: getModelSchemaRef(CheckDetails)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CheckDetails, {
            title: 'NewCheckDetails',
            exclude: ['_id'],
          }),
        },
      },
    })
    checkDetails: Omit<CheckDetails, '_id'>,
  ): Promise<CheckDetails> {
    return this.checkDetailsRepository.create(checkDetails);
  }

  @get('/check-details/count', {
    responses: {
      '200': {
        description: 'CheckDetails model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(CheckDetails)) where?: Where<CheckDetails>,
  ): Promise<Count> {
    return this.checkDetailsRepository.count(where);
  }

  @get('/check-details', {
    responses: {
      '200': {
        description: 'Array of CheckDetails model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(CheckDetails)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(CheckDetails)) filter?: Filter<CheckDetails>,
  ): Promise<CheckDetails[]> {
    return this.checkDetailsRepository.find(filter);
  }

  @patch('/check-details', {
    responses: {
      '200': {
        description: 'CheckDetails PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CheckDetails, {partial: true}),
        },
      },
    })
    checkDetails: CheckDetails,
    @param.query.object('where', getWhereSchemaFor(CheckDetails)) where?: Where<CheckDetails>,
  ): Promise<Count> {
    return this.checkDetailsRepository.updateAll(checkDetails, where);
  }

  @get('/check-details/{_id}', {
    responses: {
      '200': {
        description: 'CheckDetails model instance',
        content: {'application/json': {schema: getModelSchemaRef(CheckDetails)}},
      },
    },
  })
  async findById(@param.path.string('_id') _id: string): Promise<CheckDetails> {
    return this.checkDetailsRepository.findById(_id);
  }

  @patch('/check-details/{_id}', {
    responses: {
      '204': {
        description: 'CheckDetails PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('_id') _id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CheckDetails, {partial: true}),
        },
      },
    })
    checkDetails: CheckDetails,
  ): Promise<void> {
    await this.checkDetailsRepository.updateById(_id, checkDetails);
  }

  @put('/check-details/{_id}', {
    responses: {
      '204': {
        description: 'CheckDetails PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('_id') _id: string,
    @requestBody() checkDetails: CheckDetails,
  ): Promise<void> {
    await this.checkDetailsRepository.replaceById(_id, checkDetails);
  }

  @del('/check-details/{_id}', {
    responses: {
      '204': {
        description: 'CheckDetails DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('_id') _id: string): Promise<void> {
    await this.checkDetailsRepository.deleteById(_id);
  }
}
