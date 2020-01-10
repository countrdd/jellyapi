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
import {ItemSelectionDetails} from '../models';
import {ItemSelectionDetailsRepository} from '../repositories';

export class ItemSelectionDetailsController {
  constructor(
    @repository(ItemSelectionDetailsRepository)
    public itemSelectionDetailsRepository : ItemSelectionDetailsRepository,
  ) {}

  @post('/item-selection-details', {
    responses: {
      '200': {
        description: 'ItemSelectionDetails model instance',
        content: {'application/json': {schema: getModelSchemaRef(ItemSelectionDetails)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ItemSelectionDetails, {
            title: 'NewItemSelectionDetails',
            exclude: ['_id'],
          }),
        },
      },
    })
    itemSelectionDetails: Omit<ItemSelectionDetails, '_id'>,
  ): Promise<ItemSelectionDetails> {
    return this.itemSelectionDetailsRepository.create(itemSelectionDetails);
  }

  @get('/item-selection-details/count', {
    responses: {
      '200': {
        description: 'ItemSelectionDetails model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(ItemSelectionDetails)) where?: Where<ItemSelectionDetails>,
  ): Promise<Count> {
    return this.itemSelectionDetailsRepository.count(where);
  }

  @get('/item-selection-details', {
    responses: {
      '200': {
        description: 'Array of ItemSelectionDetails model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ItemSelectionDetails)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(ItemSelectionDetails)) filter?: Filter<ItemSelectionDetails>,
  ): Promise<ItemSelectionDetails[]> {
    return this.itemSelectionDetailsRepository.find(filter);
  }

  @patch('/item-selection-details', {
    responses: {
      '200': {
        description: 'ItemSelectionDetails PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ItemSelectionDetails, {partial: true}),
        },
      },
    })
    itemSelectionDetails: ItemSelectionDetails,
    @param.query.object('where', getWhereSchemaFor(ItemSelectionDetails)) where?: Where<ItemSelectionDetails>,
  ): Promise<Count> {
    return this.itemSelectionDetailsRepository.updateAll(itemSelectionDetails, where);
  }

  @get('/item-selection-details/{id}', {
    responses: {
      '200': {
        description: 'ItemSelectionDetails model instance',
        content: {'application/json': {schema: getModelSchemaRef(ItemSelectionDetails)}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<ItemSelectionDetails> {
    return this.itemSelectionDetailsRepository.findById(id);
  }

  @patch('/item-selection-details/{id}', {
    responses: {
      '204': {
        description: 'ItemSelectionDetails PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ItemSelectionDetails, {partial: true}),
        },
      },
    })
    itemSelectionDetails: ItemSelectionDetails,
  ): Promise<void> {
    await this.itemSelectionDetailsRepository.updateById(id, itemSelectionDetails);
  }

  @put('/item-selection-details/{id}', {
    responses: {
      '204': {
        description: 'ItemSelectionDetails PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() itemSelectionDetails: ItemSelectionDetails,
  ): Promise<void> {
    await this.itemSelectionDetailsRepository.replaceById(id, itemSelectionDetails);
  }

  @del('/item-selection-details/{id}', {
    responses: {
      '204': {
        description: 'ItemSelectionDetails DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.itemSelectionDetailsRepository.deleteById(id);
  }
}
