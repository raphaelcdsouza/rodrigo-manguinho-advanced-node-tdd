import { AwsS3FileStorage } from '@/infra/gateways'
import { env } from '@/main/config/env'

import axios from 'axios'

describe('AWS S3 integration Tests', () => {
  let sut: AwsS3FileStorage

  beforeEach(() => {
    sut = new AwsS3FileStorage(
      env.s3.accessKey,
      env.s3.secret,
      env.s3.bucket
    )
  })

  it('should upload and delete image from AWS S3', async () => {
    const onePixelImage = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdjeCi94j8ABikCpCwLe9AAAAAASUVORK5CYII='
    const file = Buffer.from(onePixelImage, 'base64')
    const filename = 'any_key.png'

    const pictureUrl = await sut.upload({ filename, file })

    expect((await axios.get(pictureUrl)).status).toBe(200)

    await sut.delete({ filename })

    await expect(axios.get(pictureUrl)).rejects.toThrow()
  })
})
