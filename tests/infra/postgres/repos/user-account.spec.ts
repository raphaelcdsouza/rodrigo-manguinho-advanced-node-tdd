import { LoadUserAccountRepository } from '@/data/contracts/repos'

import { newDb } from 'pg-mem'
import { Entity, PrimaryGeneratedColumn, Column, getRepository, Connection } from 'typeorm'

@Entity({ name: 'usuarios' })
class PgUser {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ name: 'nome', nullable: true })
  name?: string

  @Column()
  email!: string

  @Column({ name: 'id_facebook', nullable: true })
  facebookId?: string
}

class PgUserAccountRepository implements LoadUserAccountRepository {
  async load (params: LoadUserAccountRepository.Params): Promise<LoadUserAccountRepository.Result> {
    const pgUserRepo = getRepository(PgUser)
    const pgUser = await pgUserRepo.findOne({ email: params.email })
    if (pgUser !== undefined) {
      return {
        id: pgUser.id.toString(),
        name: pgUser.name ?? undefined
      }
    }
  }
}

describe('PgUserAccountRepository', () => {
  describe('load', () => {
    it('should return an account if email exists', async () => {
      const db = newDb({
        autoCreateForeignKeyIndices: true
      })
      const connection: Connection = await db.adapters.createTypeormConnection({
        type: 'postgres',
        entities: [PgUser]
      })
      await connection.synchronize()
      const pgUserRepo = getRepository(PgUser)
      await pgUserRepo.save({ email: 'existing_email' })
      const sut = new PgUserAccountRepository()

      const account = await sut.load({ email: 'existing_email' })

      expect(account).toEqual({ id: '1' })
      await connection.close()
    })

    it('should return undefined if email does not exists', async () => {
      const db = newDb({
        autoCreateForeignKeyIndices: true
      })
      const connection: Connection = await db.adapters.createTypeormConnection({
        type: 'postgres',
        entities: [PgUser]
      })
      await connection.synchronize()
      const sut = new PgUserAccountRepository()

      const account = await sut.load({ email: 'new_email' })

      expect(account).toBeUndefined()
      await connection.close()
    })
  })
})
