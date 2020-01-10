import {Model, model, property} from '@loopback/repository';

@model({settings: {}})
export class TenantDto extends Model {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  type: string;

  constructor(data?: Partial<TenantDto>) {
    super(data);
  }
}
