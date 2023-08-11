'use strict'
module.exports = (sequelize, DataTypes) => {
  const Pessoas = sequelize.define('Pessoas', {
    nome: {
      type: DataTypes.STRING,
      valifate: {
        functionValidateName: function(name){
          if (name.length < 3 ){
            throw new Error('O campo deve possuir 3 ou mais letras')
          }
        }
      }
    },
    ativo: DataTypes.BOOLEAN,
    email: { types: DataTypes.STRING,
      validate:{
        isEmail: {
          args: true,
          msg: 'Email address invalid'
        },
        unique: {
          args : true,
          msg: 'email address all ready'
        }
      }
    },
    role: DataTypes.STRING
  }, { paranoid: true,
    defaultScope: {where:{ativo:true}},
    scopes:{ todos: {where:{}} }
  }
  )
  Pessoas.associate = function(models) {
    Pessoas.hasMany(models.Turmas, {
      foreignKey: 'docente_id'
    })
    Pessoas.hasMany(models.Matriculas, {
      foreignKey: 'estudante_id',
      scope: {status: 'confirmado'},
      as: 'matriculadas'
    })

  }
  return Pessoas
}