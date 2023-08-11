const database = require('../models')

class  Services {
  constructor(model) {
    this.model = model
  }

  async pegatodosRegistros(){
    return database[this.model].findAll()
  }
}

module.exports = Services