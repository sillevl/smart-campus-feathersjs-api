import { InfluxDB } from 'influx'
import { Sensor, Period } from './parameters'

export default async (deviceId: string, sensorType: Sensor, period: Period = Period["24h"]) => {

  const influxOptions = {
    host: 'localhost',
    database: 'smart-campus-samples'
  }

  const measurements = 'smart-campus'

  const influx = new InfluxDB(influxOptions)

  // OMG, the following code could be written way better....

  const select = ( (type: Sensor) => {
    const list = []
    switch (type) {
      case Sensor.all:
        list.push('temperature', 'humidity', 'light', 'motion', 'vdd')
        break
      case Sensor.temperature:
        list.push('temperature')
        break
      case Sensor.humidity:
        list.push(' humidity')
        break
      case Sensor.light:
        list.push('light')
        break
      case Sensor.motion:
        list.push('motion')
        break
      case Sensor.battery:
        list.push('vdd')
        break
    }
    return list.map( item => `mean("${item}")`).join(', ')
  })(sensorType)

  const periodFilter = ( (p: Period) => {
    switch (p) {
    case Period["1y"]:
      return `AND time > now() - 365d`
    case Period.all: 
      return ''
    default:
      return `AND time > now() - ${Period[p]}`
    }
  })(period)

  const periodGrouping = ( (p: Period) => {
    let interval = '1m'
    switch (p) {
    case Period["1y"]:
      interval = '24h'
      break
    case Period["30d"]:
      interval = '1h'
      break
    case Period["7d"]:
      interval = '30m'
      break
    case Period["24h"]:
      interval = '5m'
      break
    case Period["1h"]:
      interval = '30s'
      break
    case Period.all: 
      return ''
    }

    return `GROUP BY time(${interval}) fill(null)`
  })(period)

  const query = `
    SELECT ${select}
    FROM "${measurements}" 
    WHERE topic = 'campus-monitor/devices/${deviceId}/up'
    ${periodFilter}
    ${periodGrouping}
    ORDER BY time
  `

  // return query

   const rows = await influx.query(query)

  return { rows, query }
}
