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
import {KitchenTimings} from '../models';
import {KitchenTimingsRepository} from '../repositories';

export class KitchenTimingsController {
  constructor(
    @repository(KitchenTimingsRepository)
    public kitchenTimingsRepository : KitchenTimingsRepository,
  ) {}

  @post('/kitchen-timings', {
    responses: {
      '200': {
        description: 'KitchenTimings model instance',
        content: {'application/json': {schema: getModelSchemaRef(KitchenTimings)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(KitchenTimings, {
            title: 'NewKitchenTimings',
            exclude: ['_id'],
          }),
        },
      },
    })
    kitchenTimings: Omit<KitchenTimings, '_id'>,
  ): Promise<KitchenTimings> {
    return this.kitchenTimingsRepository.create(kitchenTimings);
  }

  @get('/kitchen-timings/count', {
    responses: {
      '200': {
        description: 'KitchenTimings model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(KitchenTimings)) where?: Where<KitchenTimings>,
  ): Promise<Count> {
    return this.kitchenTimingsRepository.count(where);
  }

  @get('/kitchen-timings', {
    responses: {
      '200': {
        description: 'Array of KitchenTimings model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(KitchenTimings)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(KitchenTimings)) filter?: Filter<KitchenTimings>,
  ): Promise<KitchenTimings[]> {
    return this.kitchenTimingsRepository.find(filter);
  }

  @patch('/kitchen-timings', {
    responses: {
      '200': {
        description: 'KitchenTimings PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(KitchenTimings, {partial: true}),
        },
      },
    })
    kitchenTimings: KitchenTimings,
    @param.query.object('where', getWhereSchemaFor(KitchenTimings)) where?: Where<KitchenTimings>,
  ): Promise<Count> {
    return this.kitchenTimingsRepository.updateAll(kitchenTimings, where);
  }

  @get('/kitchen-timings/{id}', {
    responses: {
      '200': {
        description: 'KitchenTimings model instance',
        content: {'application/json': {schema: getModelSchemaRef(KitchenTimings)}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<KitchenTimings> {
    return this.kitchenTimingsRepository.findById(id);
  }

  @patch('/kitchen-timings/{id}', {
    responses: {
      '204': {
        description: 'KitchenTimings PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(KitchenTimings, {partial: true}),
        },
      },
    })
    kitchenTimings: KitchenTimings,
  ): Promise<void> {
    await this.kitchenTimingsRepository.updateById(id, kitchenTimings);
  }

  @put('/kitchen-timings/{id}', {
    responses: {
      '204': {
        description: 'KitchenTimings PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() kitchenTimings: KitchenTimings,
  ): Promise<void> {
    await this.kitchenTimingsRepository.replaceById(id, kitchenTimings);
  }

  @del('/kitchen-timings/{id}', {
    responses: {
      '204': {
        description: 'KitchenTimings DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.kitchenTimingsRepository.deleteById(id);
  }
}
