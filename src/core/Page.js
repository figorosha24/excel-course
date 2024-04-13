export class Page {
  constructor(params) {
    this.params = params
  }

  getRoot() {
    throw new Error('Get root not implemented')
  }

  afterRender() {}

  destroy() {}
}
