'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Turmas', "deleteAt", {
        allowNull: true,
        type: Sequelize.DATE
      })
  },
  down: (queryInterface) => {
    return queryInterface.removeColumn('Turmas', "deleteAt")
  }
}