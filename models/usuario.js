const UsuarioModel = (sequelize, DataTypes) => {
    const Usuario = sequelize.define('Usuario', {
        usuario: DataTypes.STRING,
        senha: DataTypes.STRING
    })
    return Usuario
}


module.exports = UsuarioModel