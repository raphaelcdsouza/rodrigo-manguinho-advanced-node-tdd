import { app } from '@/main/config/app'
import { env } from '@/main/config/env'
import { PgUser } from '@/infra/repos/postgres/entities'
import { makeFakeDb } from '@/tests/infra/repos/postgres/mocks'

import request from 'supertest'
import { IBackup } from 'pg-mem'
import { getConnection, getRepository, Repository } from 'typeorm'
import { sign } from 'jsonwebtoken'

describe('User Routes', () => {
  let backup: IBackup
  let pgUserRepo: Repository<PgUser>

  beforeAll(async () => {
    const db = await makeFakeDb([PgUser])
    backup = db.backup()
    pgUserRepo = getRepository(PgUser)
  })

  afterAll(async () => {
    await getConnection().close()
  })

  beforeEach(() => {
    backup.restore()
  })

  describe('DELETE /users/picture', () => {
    it('should return 403 if no authorization header is present', async () => {
      const { status } = await request(app)
        .delete('/api/users/picture')
        .send({ token: 'valid_token' })

      expect(status).toBe(403)
    })

    it('should return 200 with valid data', async () => {
      const { id } = await pgUserRepo.save({ email: 'any_email', name: 'Rodrigo manguinho' })
      const authorization = sign({ key: id }, env.jwtSecret)

      const { status, body } = await request(app)
        .delete('/api/users/picture')
        .set({ authorization })

      expect(status).toBe(200)
      expect(body).toEqual({ pictureUrl: undefined, initials: 'RM' })
    })
  })

  describe('PUT /users/picture', () => {
    it('should return 403 if no authorization header is present', async () => {
      const { status } = await request(app)
        .put('/api/users/picture')
        .send({ token: 'valid_token' })

      expect(status).toBe(403)
    })
  })
})
