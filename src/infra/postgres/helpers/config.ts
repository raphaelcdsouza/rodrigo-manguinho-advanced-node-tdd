import { ConnectionOptions } from 'typeorm'

export const config: ConnectionOptions = {
  type: 'postgres',
  host: 'fanny.db.elephantsql.com',
  port: 5432,
  username: 'tcrftuye',
  password: 'Nq2uyCXKvlQ_EVQUq295yRNWtO-7-cfg',
  database: 'tcrftuye',
  entities: ['dist/infra/postgres/entities/index.js']
}
