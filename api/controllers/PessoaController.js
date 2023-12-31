const database = require('../models')
const Sequelize = require('sequelize')

const Services = require('../services.js')
const pessoasServices = new Services('Pessoas')

class PessoaController {
  static async pegaTodasAsPessoasAtivas(req, res){
    try {
      const todasAsPessoasAtivas = await pessoasServices.pegatodosRegistros()
      return res.status(200).json(todasAsPessoasAtivas)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async pegaTodasAsPessoas(req, res){
    try {
      const todasAsPessoas = await database.Pessoas.scopes('todos').findAll()
      return res.status(200).json(todasAsPessoas)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async pegaUmaPessoa(req, res) {
    const { id } = req.params
    try {
      const umaPessoa = await database.Pessoas.findOne( {
        where: {
          id: Number(id)
        }
      })
      return res.status(200).json(umaPessoa)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async criaPessoa(req, res) {
    const novaPessoa = req.body
    try {
      const novaPessoaCriada = await database.Pessoas.create(novaPessoa)
      return res.status(200).json(novaPessoaCriada)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async atualizaPessoa(req, res) {
    const { id } = req.params
    const novasInfos = req.body
    try {
      await database.Pessoas.update(novasInfos, { where: { id: Number(id) }})
      const pessoaAtualizada = await database.Pessoas.findOne( { where: { id: Number(id) }})
      return res.status(200).json(pessoaAtualizada)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async apagaPessoa(req, res) {
    const { id } = req.params
    try {
      await database.Pessoas.destroy({ where: { id: Number(id) }})
      return res.status(200).json({ mensagem: `id ${id} deletado` })

    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
  static async restauraPessoa(req, res) {
    const {id} = req.params
    try {
      await database.Pessoas.restore({ where: { id: Number(id) }})
      return res.status(200).json(`id ${id} restaurado`)

    } catch (error) {
      return res.status(500).json(error.message)
    }

  }

  static async pegaUmaMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params
    try {
      const umaMatricula = await database.Matriculas.findOne( {
        where: {
          id: Number(matriculaId),
          estudante_id: Number(estudanteId)
        }
      })
      return res.status(200).json(umaMatricula)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async criaMatricula(req, res) {
    const { estudanteId } = req.params
    const novaMatricula = { ...req.body, estudante_id: Number(estudanteId) }
    try {
      const novaMatriculaCriada = await database.Matriculas.create(novaMatricula)
      return res.status(200).json(novaMatriculaCriada)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async atualizaMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params
    const novasInfos = req.body
    try {
      await database.Matriculas.update(novasInfos, {
        where: {
          id: Number(matriculaId),
          estudante_id: Number(estudanteId)
        }})
      const MatriculaAtualizada = await database.Matriculas.findOne( { where: { id: Number(matriculaId) }})
      return res.status(200).json(MatriculaAtualizada)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async apagaMatricula(req, res) {
    const { matriculaId } = req.params
    try {
      await database.Matriculas.destroy({ where: { id: Number(matriculaId) }})
      return res.status(200).json({ mensagem: `id ${matriculaId} deletado` })

    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async restauraMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params
    try {
      await database.Matriculas.restore({
        where: {
          id: Number(matriculaId),
          estudante_id: Number(estudanteId)
        }
      })
      return res.status(200).json({ mensagem: `id ${id} restaurado`})
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async pegaMatriculas(req, res) {
    const { estudanteId } = req.params
    try {
      const pessoa = await database.Pessoas.findOne({ where: { id: Number(estudanteId) }})
      const matriculas = await pessoa.getMatriculas()
      return res.status(200).json(matriculas)

    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async pegaMatriculasPorTurma(req, res) {
    const { turmaId } = req.params
    try {
      const todasAsMatriculasPorTurma = await database.Matriculas.findAndCountAll({
        where:{turma_id: Number(turmaId),
          status: 'confirmado'
        },
        limit: 10,
        order:[['estudante_id', 'desc']]
      })
      return res.status(200).json(todasAsMatriculasPorTurma)

    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async pegaPorTurmaLotadas(req, res) {
    const { turmaId } = req.params
    try {
      const turmaLotadas = 5
      const todasAsMatriculasPorTurma = await database.Matriculas
        .findAndCountAll({
          where: {status: 'confirmado'},
          attributes : ['turma_id'],
          group: ['turma_id'],
          having: Sequelize.literal(`count(turma_id) >= ${turmaLotadas}`)
        })

      return res.status(200).json(todasAsMatriculasPorTurma)

    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async cancelaPessoa(req, res) {
    const { estudanteId } = req.params
    try {
      database.Sequelize.Transaction(async(transaction)=>{
        await database.Pessoas
          .update({ativo:false},
            {where: {id: Number(estudanteId)}},
            {transaction:transaction}
          )

        await database.Matriculas
          .update({status:'cancelado'},
            {where: {esyudante_id: Number(estudanteId)}},
            {transaction:transaction}
          )
        return res.status(200).json({message:`Matriculas ref.${estudanteId} canceladas`})
      })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }


  static async exemple(req, res, next) {
    const transacao = await sequelize.transaction()
    try {
      const personagem = await Personagem.create({
        nome: 'Bart',
        sobrenome: 'Simpson'
      }, { transaction: transacao })
      await personagem.addParente({
        nome: 'Lisa',
        sobrenome: 'Simpson'
      }, { transaction: transacao })
      await transacao.commit()
    } catch (error) {
      await transacao.rollback()
    }
  }

}

module.exports = PessoaController