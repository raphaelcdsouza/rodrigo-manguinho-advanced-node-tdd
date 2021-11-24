import { SaveUserPicture } from '@/domain/contracts/repos'
import { PgUser } from '@/infra/repos/postgres/entities'

import { getRepository } from 'typeorm'

type SaveInput = SaveUserPicture.Input

export class PgUserProfileRepository implements SaveUserPicture {
  async savePicture ({ id, initials, pictureUrl }: SaveInput): Promise<void> {
    const pgUserRepo = getRepository(PgUser)
    await pgUserRepo.update({ id: parseInt(id) }, { pictureUrl, initials })
  }
}
