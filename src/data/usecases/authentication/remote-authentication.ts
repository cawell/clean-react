import { type HttpPostClient } from '@/data/protocols/http/http-post-client'
import { type HttpResponse, HttpStatusCode } from '@/data/protocols/http/http-response'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error'
import { type AuthenticationParams } from '@/domain/userscases/authentication'
import { UnexpectedError } from '@/domain/errors/unexpected-error'

export class RemoteAuthentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) {}

  async auth (params: AuthenticationParams): Promise<void> {
    const httpResponse: HttpResponse = await this.httpPostClient.post({ url: this.url, body: params })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: break
      case HttpStatusCode.unauthorized: throw new InvalidCredentialsError()
      default: throw new UnexpectedError()
    }
  }
}
