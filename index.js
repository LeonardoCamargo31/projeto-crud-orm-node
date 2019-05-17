const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')

//esse model tem uma instacia de sequelize
const model = require('./models/index')
const pessoas = require('./routes/pessoas')

app.use(bodyParser.urlencoded({ extended: true }))
//os arquivos estáticos
app.use(express.static('public'))

app.get('/', (req, res) => res.render('home'))
app.use('/pessoas', pessoas)

//setando o ejs como minha view engine, as minhas views estão em /views
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//Banco de dados sincronizado com model
//sync({ force: true })
model.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log('Rodando na porta: ' + port)
    })
})