//estrutura para conectar com sequelize
const Sequelize = require('sequelize')
const sequelize = new Sequelize('cadastro-orm', 'root', '', {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: '3307'
})
const models = {}
const fs = require('fs')
const path = require('path')
//usamos ele sincrono pois só vamos usar no inicio do projeto, então não ira prejudicar a performace
fs.readdirSync(__dirname)
    .filter((file) => file != 'index.js')//tem que ser diferente de index.js
    .forEach((file) => {//para cada arquivo ex pessoa.js, projeto.js
        //funcionalidade do sequelize que ele consegue importar esse arquivo
        const model = sequelize.import(path.join(__dirname, file))//o path para gerar um caminho absoluto, caminho/arquivo.js
        //models[pessoa] = modelo
        models[model.name] = model
    })
//retorna um array de propriedades do objeto, no caso models
Object.keys(models).map(modelName=>{
    if('associate' in models[modelName]){
        //models => { Pessoa: Pessoa, Usuario: Usuario }
        //models[Pessoa] 
        //vou chamar esse associate, e vou vincular esses dois models
        models[modelName].associate(models)
    }
})

//precisamos retornar o sequelize e os models
module.exports = {
    sequelize,
    models
}