import { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import database from '../../lib/measurements/database'

import { Sensor, Period } from '../../lib/measurements/parameters'

interface Data {}

interface ServiceOptions {}

export class Measurements implements ServiceMethods<Data> {
  [key: string]: any;

  app: Application;
  options: ServiceOptions;

  constructor (options: ServiceOptions = {}, app: Application) {
    this.options = options;
    this.app = app;
  }

  async get (id: Id, params?: Params): Promise<Data> {
    const sensorType: Sensor = Number.parseInt(Sensor[params!.query!.sensor])
    const period: Period = Number.parseInt(Period[params!.query!.period])
    const deviceId: string = 'sensor-02'

    const results = await database(deviceId, sensorType, period )

    const debug = {
      params,
    }

    return {
      results,
      debug
    };
  }

  find(params?: Params | undefined): Promise<Data | Data[] | Paginated<Data>> {
    throw new Error("Method not implemented.");
  }
  create(data: Partial<Data> | Partial<Data>[], params?: Params | undefined): Promise<Data | Data[]> {
    throw new Error("Method not implemented.");
  }
  update(id: NullableId, data: Data, params?: Params | undefined): Promise<Data | Data[]> {
    throw new Error("Method not implemented.");
  }
  patch(id: NullableId, data: Partial<Data>, params?: Params | undefined): Promise<Data | Data[]> {
    throw new Error("Method not implemented.");
  }
  remove(id: NullableId, params?: Params | undefined): Promise<Data | Data[]> {
    throw new Error("Method not implemented.");
  }
}
