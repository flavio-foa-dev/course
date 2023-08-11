'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Niveis', "deleteAt", {
        allowNull: true,
        type: Sequelize.DATE
      })
  },
  down: (queryInterface) => {
    return queryInterface.removeColumn('Niveis', "deleteAt")
  }
}