import { FacebookApi, AxiosHttpClient } from '@/infra/gateways'
import { env } from '@/main/config/env'

describe('FacebookApi integration Tests', () => {
  let axiosClient: AxiosHttpClient
  let sut: FacebookApi

  beforeEach(() => {
    axiosClient = new AxiosHttpClient()
    sut = new FacebookApi(
      axiosClient,
      env.facebookApi.clientId,
      env.facebookApi.clientSecret
    )
  })

  it('should return a Facebook User if token is valid', async () => {
    const fbUser = await sut.loadUser({ token: 'EAAILxZAgFJeoBAJBZBAr1ktBJqurlPcYdoc6BpPZCzqjZAHx3KRunYOtnWwAkXqblxpR4IBsZBT1UAEFhmR7nRc58KKlfNiF9XHWUjY67rEtip7G15AiHVbb14A9nRkpe9VZA0sryHjSteHlAFUofhuTEZAE2KYde50SsIkYJHZBwnPeZAeqZBDxLZAMzA5VZBjZBdiH02ZBppv8iNCLVl3Q8BnZAYB' })

    expect(fbUser).toEqual({
      facebookId: '105375675261539',
      email: 'mango_ndcrpvh_teste@tfbnw.net',
      name: 'Mango teste'
    })
  })

  it('should return undefined if token is invvalid', async () => {
    const fbUser = await sut.loadUser({ token: 'invalid' })

    expect(fbUser).toBeUndefined()
  })
})
