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
import {TimeEntries} from '../models';
import {TimeEntriesRepository} from '../repositories';

export class TimeEntriesController {
  constructor(
    @repository(TimeEntriesRepository)
    public timeEntriesRepository : TimeEntriesRepository,
  ) {}

  @post('/time-entries', {
    responses: {
      '200': {
        description: 'TimeEntries model instance',
        content: {'application/json': {schema: getModelSchemaRef(TimeEntries)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TimeEntries, {
            title: 'NewTimeEntries',
            exclude: ['_id'],
          }),
        },
      },
    })
    timeEntries: Omit<TimeEntries, '_id'>,
  ): Promise<TimeEntries> {
    return this.timeEntriesRepository.create(timeEntries);
  }

  @get('/time-entries/count', {
    responses: {
      '200': {
        description: 'TimeEntries model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(TimeEntries)) where?: Where<TimeEntries>,
  ): Promise<Count> {
    return this.timeEntriesRepository.count(where);
  }

  @get('/time-entries', {
    responses: {
      '200': {
        description: 'Array of TimeEntries model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TimeEntries)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(TimeEntries)) filter?: Filter<TimeEntries>,
  ): Promise<TimeEntries[]> {
    return this.timeEntriesRepository.find(filter);
  }

  @patch('/time-entries', {
    responses: {
      '200': {
        description: 'TimeEntries PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TimeEntries, {partial: true}),
        },
      },
    })
    timeEntries: TimeEntries,
    @param.query.object('where', getWhereSchemaFor(TimeEntries)) where?: Where<TimeEntries>,
  ): Promise<Count> {
    return this.timeEntriesRepository.updateAll(timeEntries, where);
  }

  @get('/time-entries/{id}', {
    responses: {
      '200': {
        description: 'TimeEntries model instance',
        content: {'application/json': {schema: getModelSchemaRef(TimeEntries)}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<TimeEntries> {
    return this.timeEntriesRepository.findById(id);
  }

  @patch('/time-entries/{id}', {
    responses: {
      '204': {
        description: 'TimeEntries PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TimeEntries, {partial: true}),
        },
      },
    })
    timeEntries: TimeEntries,
  ): Promise<void> {
    await this.timeEntriesRepository.updateById(id, timeEntries);
  }

  @put('/time-entries/{id}', {
    responses: {
      '204': {
        description: 'TimeEntries PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() timeEntries: TimeEntries,
  ): Promise<void> {
    await this.timeEntriesRepository.replaceById(id, timeEntries);
  }

  @del('/time-entries/{id}', {
    responses: {
      '204': {
        description: 'TimeEntries DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.timeEntriesRepository.deleteById(id);
  }
}
