import Sequelize from 'sequelize'

export default (sequelize) => {
    return sequelize.define('ClanoviTima', {
        korisnik:{
            type: Sequelize.INTEGER,
            unique: false,
            allowNull: false
        },
        tim:{
            type: Sequelize.INTEGER,
            unique: false,
            allowNull: false
        }
    })
} 