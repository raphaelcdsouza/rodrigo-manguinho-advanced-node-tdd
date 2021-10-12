import { IMemoryDb, newDb } from 'pg-mem'
import { Connection } from 'typeorm'

export const makeFakeDb = async (entities?: any[]): Promise<IMemoryDb> => {
  const db = newDb({
    autoCreateForeignKeyIndices: true
  })
  const connection: Connection = await db.adapters.createTypeormConnection({
    type: 'postgres',
    entities: entities ?? ['src/infra/postgres/entities/index.ts']
  })
  await connection.synchronize()
  return db
}
