// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';
import { NotFound, GeneralError, BadRequest } from '@feathersjs/errors';
import { hooks } from '@feathersjs/authentication/lib';

import { Sensor, Period } from '../lib/measurements/parameters'

export default (options = {}): Hook => {
  return async (context: HookContext) => {

    const params = context.params

    const periods = Object.values(Period).filter( value => typeof(value) === 'string' )
    const sensors = Object.values(Sensor).filter( value => typeof(value) === 'string' )


    if ( !params || !params.query ) {
       context.result = new BadRequest('Invalid query parameters', {
        message: "no query parameters where given"
      });
      return context;
    }
    if ( !periods.includes(params.query.period) ) {
      context.result =  new BadRequest('Invalid query parameters', {
        message: "invalid periods query parameter",
        given: params.query.period,
        expected: periods
      });
      return context;
    }
    if ( !sensors.includes(params.query.sensor) ) {
      context.result =  new BadRequest('Invalid query parameters', {
        message: "invalid sensor query parameter",
        given: params.query.sensor,
        expected: sensors
      });
      return context;
    }

    return context;
  };
}
