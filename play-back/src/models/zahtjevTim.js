import Sequelize from 'sequelize'

export default (sequelize) =>{
    return sequelize.define("ZahtjevTim",{
        sadrzaj:{
            type:Sequelize.STRING,
            unique:false,
            allowNull:false
        },
        vidjenost:{
            type:Sequelize.BOOLEAN,
            unique:false,
            allowNull:false
        },
        posiljaoc:{
            type:Sequelize.INTEGER,
            unique:false,
            allowNull:false
        },
        primaoc:{
            type:Sequelize.INTEGER,
            unique:false,
            allowNull:false
        },
        tim:{
            type:Sequelize.INTEGER,
            unique:false,
            allowNull:false
        },
        status:{
            type:Sequelize.BOOLEAN,
            unique:false,
            allowNull:true
        }
    })
}