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
import {CashEntries} from '../models';
import {CashEntriesRepository} from '../repositories';

export class CashEntriesController {
  constructor(
    @repository(CashEntriesRepository)
    public cashEntriesRepository : CashEntriesRepository,
  ) {}

  @post('/cash-entries', {
    responses: {
      '200': {
        description: 'CashEntries model instance',
        content: {'application/json': {schema: getModelSchemaRef(CashEntries)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CashEntries, {
            title: 'NewCashEntries',
            exclude: ['_id'],
          }),
        },
      },
    })
    cashEntries: Omit<CashEntries, '_id'>,
  ): Promise<CashEntries> {
    return this.cashEntriesRepository.create(cashEntries);
  }

  @get('/cash-entries/count', {
    responses: {
      '200': {
        description: 'CashEntries model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(CashEntries)) where?: Where<CashEntries>,
  ): Promise<Count> {
    return this.cashEntriesRepository.count(where);
  }

  @get('/cash-entries', {
    responses: {
      '200': {
        description: 'Array of CashEntries model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(CashEntries)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(CashEntries)) filter?: Filter<CashEntries>,
  ): Promise<CashEntries[]> {
    return this.cashEntriesRepository.find(filter);
  }

  @patch('/cash-entries', {
    responses: {
      '200': {
        description: 'CashEntries PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CashEntries, {partial: true}),
        },
      },
    })
    cashEntries: CashEntries,
    @param.query.object('where', getWhereSchemaFor(CashEntries)) where?: Where<CashEntries>,
  ): Promise<Count> {
    return this.cashEntriesRepository.updateAll(cashEntries, where);
  }

  @get('/cash-entries/{id}', {
    responses: {
      '200': {
        description: 'CashEntries model instance',
        content: {'application/json': {schema: getModelSchemaRef(CashEntries)}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<CashEntries> {
    return this.cashEntriesRepository.findById(id);
  }

  @patch('/cash-entries/{id}', {
    responses: {
      '204': {
        description: 'CashEntries PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CashEntries, {partial: true}),
        },
      },
    })
    cashEntries: CashEntries,
  ): Promise<void> {
    await this.cashEntriesRepository.updateById(id, cashEntries);
  }

  @put('/cash-entries/{id}', {
    responses: {
      '204': {
        description: 'CashEntries PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() cashEntries: CashEntries,
  ): Promise<void> {
    await this.cashEntriesRepository.replaceById(id, cashEntries);
  }

  @del('/cash-entries/{id}', {
    responses: {
      '204': {
        description: 'CashEntries DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.cashEntriesRepository.deleteById(id);
  }
}
