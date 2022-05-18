export class NotFound extends Error {
  constructor() {
    super()

    this.name = 'Not Found'
  }
}