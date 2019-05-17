const express = require('express')

const pessoasController = require('../controllers/pessoas')

//lá exportamos sequelize e os modelos
const model = require('../models/index')


//criar uma rota
const router = express.Router()

router.get('/', pessoasController.index.bind(null, model.models))//agora na função index, crio uma nova função injetando model

router.get('/create', pessoasController.createForm)
router.post('/create', pessoasController.createProcess.bind(null, model.models))

router.get('/update/:id', pessoasController.updateForm.bind(null, model.models))
router.post('/update/:id', pessoasController.updateProcess.bind(null, model.models))

router.delete('/delete/:id', pessoasController.remove.bind(null, model.models))

module.exports = router