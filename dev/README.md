
# Development environment

## Store realtime samples

Setup the TTN application and token in the `telegraf.env` file.

```bash
docker-compose up
```

# Import example database

Example database:

Timeset: 1/3/2019 until 27/2/2020

```bash
docker-compose exec influxdb influxd restore -portable -db smart-campus -newdb smart-campus-samples /tmp/samples/
```
