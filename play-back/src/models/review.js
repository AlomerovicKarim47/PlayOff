import Sequelize from 'sequelize'

export default (sequelize) => {
    return sequelize.define('Review',{
        komentar:{
            type: Sequelize.STRING,
            unique: false,
            allowNull:false
        },
        ocjena:{
            type: Sequelize.INTEGER,
            unique: false,
            allowNull:false
        },
        tim:{
            type: Sequelize.INTEGER,
            unique: false,
            allowNull:false
        },
        reviewer:{
            type: Sequelize.INTEGER,
            unique: false,
            allowNull: false
        }
    })
}