import Sequelize from 'sequelize'

export default (sequelize) => {
    return sequelize.define('UcesniciUMecuBezTimova',{
        korisnik:{
            type: Sequelize.INTEGER,
            unique: false,
            allowNull:false
        },
        mec:{
            type: Sequelize.INTEGER,
            unique: false,
            allowNull:false
        }
    })
}