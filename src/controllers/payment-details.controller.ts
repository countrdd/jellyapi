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
import {PaymentDetails} from '../models';
import {PaymentDetailsRepository} from '../repositories';

export class PaymentDetailsController {
  constructor(
    @repository(PaymentDetailsRepository)
    public paymentDetailsRepository : PaymentDetailsRepository,
  ) {}

  @post('/payment-details', {
    responses: {
      '200': {
        description: 'PaymentDetails model instance',
        content: {'application/json': {schema: getModelSchemaRef(PaymentDetails)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PaymentDetails, {
            title: 'NewPaymentDetails',
            exclude: ['_id'],
          }),
        },
      },
    })
    paymentDetails: Omit<PaymentDetails, '_id'>,
  ): Promise<PaymentDetails> {
    return this.paymentDetailsRepository.create(paymentDetails);
  }

  @get('/payment-details/count', {
    responses: {
      '200': {
        description: 'PaymentDetails model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(PaymentDetails)) where?: Where<PaymentDetails>,
  ): Promise<Count> {
    return this.paymentDetailsRepository.count(where);
  }

  @get('/payment-details', {
    responses: {
      '200': {
        description: 'Array of PaymentDetails model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PaymentDetails)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(PaymentDetails)) filter?: Filter<PaymentDetails>,
  ): Promise<PaymentDetails[]> {
    return this.paymentDetailsRepository.find(filter);
  }

  @patch('/payment-details', {
    responses: {
      '200': {
        description: 'PaymentDetails PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PaymentDetails, {partial: true}),
        },
      },
    })
    paymentDetails: PaymentDetails,
    @param.query.object('where', getWhereSchemaFor(PaymentDetails)) where?: Where<PaymentDetails>,
  ): Promise<Count> {
    return this.paymentDetailsRepository.updateAll(paymentDetails, where);
  }

  @get('/payment-details/{id}', {
    responses: {
      '200': {
        description: 'PaymentDetails model instance',
        content: {'application/json': {schema: getModelSchemaRef(PaymentDetails)}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<PaymentDetails> {
    return this.paymentDetailsRepository.findById(id);
  }

  @patch('/payment-details/{id}', {
    responses: {
      '204': {
        description: 'PaymentDetails PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PaymentDetails, {partial: true}),
        },
      },
    })
    paymentDetails: PaymentDetails,
  ): Promise<void> {
    await this.paymentDetailsRepository.updateById(id, paymentDetails);
  }

  @put('/payment-details/{id}', {
    responses: {
      '204': {
        description: 'PaymentDetails PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() paymentDetails: PaymentDetails,
  ): Promise<void> {
    await this.paymentDetailsRepository.replaceById(id, paymentDetails);
  }

  @del('/payment-details/{id}', {
    responses: {
      '204': {
        description: 'PaymentDetails DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.paymentDetailsRepository.deleteById(id);
  }
}
