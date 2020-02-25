import { Sensors } from './sensors.class';
import { Application } from '../../declarations';
import createModel from '../../models/sensors.model';


export default function (app: Application) {

  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  }

  app.use('/sensors', new Sensors(options, app))

  const service = app.service('sensors')

}