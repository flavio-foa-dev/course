module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Pessoas', [
      {
        nome: 'Flavio Oliveira',
        ativo: true,
        email: 'flavio@uol.com',
        role: 'estudante',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Flavio Andrade',
        ativo: true,
        email: 'flavio@hotmail.com.com',
        role: 'estudante',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Renata Brito',
        ativo: true,
        email: 'Renata@uol.com',
        role: 'estudante',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Sandra Gomes',
        ativo: false,
        email: 'sandra@sandra.com',
        role: 'estudante',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Paula Morais',
        ativo: true,
        email: 'paula@paula.com',
        role: 'docente',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Erick',
        ativo: true,
        email: 'Erick@uol.com',
        role: 'docente',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Pessoas', null, {})
  }
}
