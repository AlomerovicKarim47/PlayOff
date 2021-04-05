import Sequelize from 'sequelize'

export default (sequelize) => {
    return sequelize.define('ProsliTimovi', {
        korisnik:{
            type: Sequelize.INTEGER,
            unique: false,
            allowNull:false
        },
        naziv:{
            type: Sequelize.STRING,
            unique: true,
            allowNull:false
        },
        datumUlaska:{
            type: Sequelize.STRING,
            unique: false,
            allowNull:false
        },
        datumIzlaska:{
            type: Sequelize.STRING,
            unique: false,
            allowNull:false
        },
        sport:{
            type: Sequelize.INTEGER,
            unique: false,
            allowNull:false
        },
        najveciRank:{
            type: Sequelize.INTEGER,
            unique: false,
            allowNull:false
        }
    })
}