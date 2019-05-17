//injeto a dependencia sequelize
//com import lá na index ele já injeta sequelize e DataTypes (que seria o Sequelize)
const PessoaModel = (sequelize, DataTypes) => {
    const Pessoa = sequelize.define('Pessoa', {
        nome: DataTypes.STRING,
        nascimento:DataTypes.DATE,
        cargo: DataTypes.STRING
    })
    //criamos um metodo associate que recebe todos os models
    //models.Usuario, então já desestrutura
    Pessoa.associate = ({Usuario})=>{
        //pessoa tem um usuario
        Pessoa.hasOne(Usuario)
    }

    return Pessoa
}


module.exports = PessoaModel