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
import {ModifiersSelectionDetails} from '../models';
import {ModifiersSelectionDetailsRepository} from '../repositories';

export class ModifiersSelectionDetailsController {
  constructor(
    @repository(ModifiersSelectionDetailsRepository)
    public modifiersSelectionDetailsRepository : ModifiersSelectionDetailsRepository,
  ) {}

  @post('/modifiers-selection-details', {
    responses: {
      '200': {
        description: 'ModifiersSelectionDetails model instance',
        content: {'application/json': {schema: getModelSchemaRef(ModifiersSelectionDetails)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ModifiersSelectionDetails, {
            title: 'NewModifiersSelectionDetails',
            exclude: ['_id'],
          }),
        },
      },
    })
    modifiersSelectionDetails: Omit<ModifiersSelectionDetails, '_id'>,
  ): Promise<ModifiersSelectionDetails> {
    return this.modifiersSelectionDetailsRepository.create(modifiersSelectionDetails);
  }

  @get('/modifiers-selection-details/count', {
    responses: {
      '200': {
        description: 'ModifiersSelectionDetails model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(ModifiersSelectionDetails)) where?: Where<ModifiersSelectionDetails>,
  ): Promise<Count> {
    return this.modifiersSelectionDetailsRepository.count(where);
  }

  @get('/modifiers-selection-details', {
    responses: {
      '200': {
        description: 'Array of ModifiersSelectionDetails model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ModifiersSelectionDetails)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(ModifiersSelectionDetails)) filter?: Filter<ModifiersSelectionDetails>,
  ): Promise<ModifiersSelectionDetails[]> {
    return this.modifiersSelectionDetailsRepository.find(filter);
  }

  @patch('/modifiers-selection-details', {
    responses: {
      '200': {
        description: 'ModifiersSelectionDetails PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ModifiersSelectionDetails, {partial: true}),
        },
      },
    })
    modifiersSelectionDetails: ModifiersSelectionDetails,
    @param.query.object('where', getWhereSchemaFor(ModifiersSelectionDetails)) where?: Where<ModifiersSelectionDetails>,
  ): Promise<Count> {
    return this.modifiersSelectionDetailsRepository.updateAll(modifiersSelectionDetails, where);
  }

  @get('/modifiers-selection-details/{id}', {
    responses: {
      '200': {
        description: 'ModifiersSelectionDetails model instance',
        content: {'application/json': {schema: getModelSchemaRef(ModifiersSelectionDetails)}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<ModifiersSelectionDetails> {
    return this.modifiersSelectionDetailsRepository.findById(id);
  }

  @patch('/modifiers-selection-details/{id}', {
    responses: {
      '204': {
        description: 'ModifiersSelectionDetails PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ModifiersSelectionDetails, {partial: true}),
        },
      },
    })
    modifiersSelectionDetails: ModifiersSelectionDetails,
  ): Promise<void> {
    await this.modifiersSelectionDetailsRepository.updateById(id, modifiersSelectionDetails);
  }

  @put('/modifiers-selection-details/{id}', {
    responses: {
      '204': {
        description: 'ModifiersSelectionDetails PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() modifiersSelectionDetails: ModifiersSelectionDetails,
  ): Promise<void> {
    await this.modifiersSelectionDetailsRepository.replaceById(id, modifiersSelectionDetails);
  }

  @del('/modifiers-selection-details/{id}', {
    responses: {
      '204': {
        description: 'ModifiersSelectionDetails DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.modifiersSelectionDetailsRepository.deleteById(id);
  }
}
