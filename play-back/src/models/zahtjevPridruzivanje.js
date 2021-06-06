import Sequelize from 'sequelize'

export default (sequelize)=>{
    return sequelize.define('ZahtjevPridruzivanje',{
        primaoc:{
            type:Sequelize.INTEGER,
            unique:false,
            allowNull:false,
            foreignKey:true
        },
        posiljaoc:{
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
        },
        sport:{
            type:Sequelize.INTEGER,
            unique:false,
            allowNull:false
        },
        mec:{
            type:Sequelize.INTEGER,
            unique:false,
            allowNull:false
        }
    })
}