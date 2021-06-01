import Sequelize from 'sequelize'

export default (sequelize) => {
    return sequelize.define('Tim',{
        ime:{
            type:Sequelize.STRING,
            unique:true,
            allowNull:false
        },
        kapiten:{
            type:Sequelize.INTEGER,
            unique:false,
            allowNull:false
        },
        sport:{
            type:Sequelize.INTEGER,
            unique:false,
            allowNull:false
        },
        dostupnost:{
            type:Sequelize.BOOLEAN,
            unique:false,
            allowNull:false
        },
        ELO:{
            type:Sequelize.INTEGER,
            unique:false,
            allowNull:true
        },
        slika:{
            type: Sequelize.BLOB,
            unique:false,
            allowNull: true
        }
    })
}