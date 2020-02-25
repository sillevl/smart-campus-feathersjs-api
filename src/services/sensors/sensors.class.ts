import { Service, NedbServiceOptions } from 'feathers-nedb';
import { Application } from '../../declarations';

interface Sensor {
  id: number
  room: string
  location: string
  description: string
  dev_eui: string
}

export class Sensors extends Service {
  // sensors: Sensor[] = []

  constructor(options: Partial<NedbServiceOptions>, app: Application) {
    super(options);
  }

  // async find() {
  //   return this.sensors
  // }

  // async create(data: any) {
  //   const sensor = {
  //     id: this.sensors.length,
  //     room: data.room,
  //     location: data.location,
  //     description: data.description,
  //     dev_eui: data.dev_eui
  //   }

  //   this.sensors.push(sensor)
  //   return sensor
  // }
}