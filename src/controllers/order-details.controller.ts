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
import {OrderDetails} from '../models';
import {OrderDetailsRepository} from '../repositories';

export class OrderDetailsController {
  constructor(
    @repository(OrderDetailsRepository)
    public orderDetailsRepository : OrderDetailsRepository,
  ) {}

  @post('/order-details', {
    responses: {
      '200': {
        description: 'OrderDetails model instance',
        content: {'application/json': {schema: getModelSchemaRef(OrderDetails)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderDetails, {
            title: 'NewOrderDetails',
            exclude: ['_id'],
          }),
        },
      },
    })
    orderDetails: Omit<OrderDetails, '_id'>,
  ): Promise<OrderDetails> {
    return this.orderDetailsRepository.create(orderDetails);
  }

  @get('/order-details/count', {
    responses: {
      '200': {
        description: 'OrderDetails model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(OrderDetails)) where?: Where<OrderDetails>,
  ): Promise<Count> {
    return this.orderDetailsRepository.count(where);
  }

  @get('/order-details', {
    responses: {
      '200': {
        description: 'Array of OrderDetails model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(OrderDetails)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(OrderDetails)) filter?: Filter<OrderDetails>,
  ): Promise<OrderDetails[]> {
    return this.orderDetailsRepository.find(filter);
  }

  @patch('/order-details', {
    responses: {
      '200': {
        description: 'OrderDetails PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderDetails, {partial: true}),
        },
      },
    })
    orderDetails: OrderDetails,
    @param.query.object('where', getWhereSchemaFor(OrderDetails)) where?: Where<OrderDetails>,
  ): Promise<Count> {
    return this.orderDetailsRepository.updateAll(orderDetails, where);
  }

  @get('/order-details/{id}', {
    responses: {
      '200': {
        description: 'OrderDetails model instance',
        content: {'application/json': {schema: getModelSchemaRef(OrderDetails)}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<OrderDetails> {
    return this.orderDetailsRepository.findById(id);
  }

  @patch('/order-details/{id}', {
    responses: {
      '204': {
        description: 'OrderDetails PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderDetails, {partial: true}),
        },
      },
    })
    orderDetails: OrderDetails,
  ): Promise<void> {
    await this.orderDetailsRepository.updateById(id, orderDetails);
  }

  @put('/order-details/{id}', {
    responses: {
      '204': {
        description: 'OrderDetails PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() orderDetails: OrderDetails,
  ): Promise<void> {
    await this.orderDetailsRepository.replaceById(id, orderDetails);
  }

  @del('/order-details/{id}', {
    responses: {
      '204': {
        description: 'OrderDetails DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.orderDetailsRepository.deleteById(id);
  }
}
