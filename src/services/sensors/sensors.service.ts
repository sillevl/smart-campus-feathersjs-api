import { ServiceAddons } from '@feathersjs/feathers';
import { Sensors } from './sensors.class';
import { Application } from '../../declarations';
import createModel from '../../models/sensors.model';
import hooks from './sensors.hooks';



declare module '../../declarations' {
  interface ServiceTypes {
    'sensors': Sensors & ServiceAddons<any>;
  }
}

export default function (app: Application) {

  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  }

  app.use('/sensors', new Sensors(options, app))

  const service = app.service('sensors')
  service.hooks(hooks);
}