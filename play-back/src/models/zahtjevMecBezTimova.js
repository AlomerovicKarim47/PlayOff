import Sequelize from 'sequelize'

export default (sequelize)=>{
    return sequelize.define('ZahtjevMecBezTimova',{
        korisnik:{
            type:Sequelize.INTEGER,
            unique:false,
            allowNull:false
        },
        vidjenost:{
            type:Sequelize.BOOLEAN,
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