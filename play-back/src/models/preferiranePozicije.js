import Sequelize from 'sequelize'

export default (sequelize) => {
    sequelize.define('PreferiranePozicije',{
        sport:{
            type: Sequelize.INTEGER,
            unique:false,
            allowNull:false
        },
        pozicija:{
            type: Sequelize.INTEGER,
            unique:false,
            allowNull:false
        },
        korisnik:{
            type: Sequelize.INTEGER,
            unique:false,
            allowNull:false
        }
    })
}