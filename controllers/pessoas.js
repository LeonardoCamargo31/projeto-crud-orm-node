//com uso do bind envio model.models que tem minhas models
//então desestruturo para pegar apenas pessoa
const index = async ({ Pessoa }, req, res) => {
    const pessoas = await Pessoa.findAll()
    res.render('pessoas',{
        pessoas
    })
}

const createForm =  ( req, res) => {
    res.render('pessoas/create')
}
const createProcess = async ({ Pessoa }, req, res) => {
    let { nome, nascimento, cargo } = req.body

    //formatar data dd/mm/aaaa para aaaa-mm-dd
    let dateSplit = nascimento.split("/");
    nascimento = dateSplit[2] + '-' + dateSplit[1] + '-' + dateSplit[0]

    await Pessoa.create({ nome, nascimento, cargo })
    res.redirect('/pessoas')
}

const updateForm = async ({ Pessoa }, req, res) => {
    const pessoa = await Pessoa.findByPk(req.params.id)

    const dia = ("0" + pessoa.nascimento.getDate()).substr(-2)
    const mes = ("0" + (pessoa.nascimento.getMonth() + 1)).substr(-2)
    const ano = pessoa.nascimento.getFullYear();
    const dateString = dia + '/' + mes + '/' + ano

    res.render('pessoas/update', {
        pessoa:{
            id: pessoa.id,
            nome: pessoa.nome,
            cargo: pessoa.cargo,
            nascimento: dateString
        }
    })
}
const updateProcess = async ({ Pessoa }, req, res) => {
    let { nome, nascimento, cargo } = req.body

    //formatar data dd/mm/aaaa para aaaa-mm-dd
    let dateSplit = nascimento.split("/");
    nascimento = dateSplit[2] + '-' + dateSplit[1] + '-' + dateSplit[0]

    await Pessoa.update({ nome, nascimento, cargo },{
        where:{
            id: req.params.id
        }
    })

    res.redirect('/pessoas')
}

const remove = async ({ Pessoa }, req, res) => {
    await Pessoa.destroy({
        where:{
            id: req.params.id
        }
    })
    res.redirect('/pessoas')
}

module.exports = {
    index,
    createForm,
    createProcess,
    remove,
    updateForm,
    updateProcess
}