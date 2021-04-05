import Sequelize from 'sequelize'

export default (sequelize)=>{
    return sequelize.define('TimPozicije',{
        tim:{
            type:Sequelize.INTEGER,
            unique:false,
            allowNull:false
        },
        korisnik:{
            type:Sequelize.INTEGER,
            unique:false,
            allowNull:false
        },
        pozicija:{
            type:Sequelize.INTEGER,
            unique:false,
            allowNull:true
        }
    })
}