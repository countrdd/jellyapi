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
import {Contactmessage} from '../models';
import {ContactmessageRepository} from '../repositories';

export class ContactmessageController {
  constructor(
    @repository(ContactmessageRepository)
    public contactmessageRepository : ContactmessageRepository,
  ) {}

  @post('/contactmessages', {
    responses: {
      '200': {
        description: 'Contactmessage model instance',
        content: {'application/json': {schema: getModelSchemaRef(Contactmessage)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Contactmessage, {
            title: 'NewContactmessage',
            exclude: ['id'],
          }),
        },
      },
    })
    contactmessage: Omit<Contactmessage, 'id'>,
  ): Promise<Contactmessage> {
    return this.contactmessageRepository.create(contactmessage);
  }

  @get('/contactmessages/count', {
    responses: {
      '200': {
        description: 'Contactmessage model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Contactmessage)) where?: Where<Contactmessage>,
  ): Promise<Count> {
    return this.contactmessageRepository.count(where);
  }

  @get('/contactmessages', {
    responses: {
      '200': {
        description: 'Array of Contactmessage model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Contactmessage)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Contactmessage)) filter?: Filter<Contactmessage>,
  ): Promise<Contactmessage[]> {
    return this.contactmessageRepository.find(filter);
  }

  @patch('/contactmessages', {
    responses: {
      '200': {
        description: 'Contactmessage PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Contactmessage, {partial: true}),
        },
      },
    })
    contactmessage: Contactmessage,
    @param.query.object('where', getWhereSchemaFor(Contactmessage)) where?: Where<Contactmessage>,
  ): Promise<Count> {
    return this.contactmessageRepository.updateAll(contactmessage, where);
  }

  @get('/contactmessages/{id}', {
    responses: {
      '200': {
        description: 'Contactmessage model instance',
        content: {'application/json': {schema: getModelSchemaRef(Contactmessage)}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Contactmessage> {
    return this.contactmessageRepository.findById(id);
  }

  @patch('/contactmessages/{id}', {
    responses: {
      '204': {
        description: 'Contactmessage PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Contactmessage, {partial: true}),
        },
      },
    })
    contactmessage: Contactmessage,
  ): Promise<void> {
    await this.contactmessageRepository.updateById(id, contactmessage);
  }

  @put('/contactmessages/{id}', {
    responses: {
      '204': {
        description: 'Contactmessage PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() contactmessage: Contactmessage,
  ): Promise<void> {
    await this.contactmessageRepository.replaceById(id, contactmessage);
  }

  @del('/contactmessages/{id}', {
    responses: {
      '204': {
        description: 'Contactmessage DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.contactmessageRepository.deleteById(id);
  }



}
