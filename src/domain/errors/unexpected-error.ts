export class UnexpectedError extends Error {
  constructor () {
    super('Algo de errado aconteceu. Tenth novamente em breve')
    this.name = 'UnexpectedError'
  }
}
