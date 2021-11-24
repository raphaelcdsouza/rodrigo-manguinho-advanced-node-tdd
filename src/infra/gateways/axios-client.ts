import { HttpGetClient } from '@/infra/gateways'

import axios from 'axios'

type Params = HttpGetClient.Params
export class AxiosHttpClient implements HttpGetClient {
  async get ({ params, url }: Params): Promise<any> {
    const result = await axios.get(url, { params })

    return result.data
  }
}
