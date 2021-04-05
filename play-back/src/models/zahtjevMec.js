import Sequelize from 'sequelize'

export default (sequelize)=>{
    return sequelize.define('ZahtjevMec', {
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
        timPosiljaoc:{
            type:Sequelize.INTEGER,
            unique:false,
            allowNull:false
        },
        timPrimaoc:{
            type:Sequelize.INTEGER,
            unique:false,
            allowNull:false
        },
        vrijemeOdrzavanja:{
            type:Sequelize.STRING,
            unique:false,
            allowNull:false
        },
        mjesto:{
            type:Sequelize.STRING,
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