import Sequelize from 'sequelize'

export default (sequelize) => {
    return sequelize.define('MecBezTimova', {
        organizator: {
            type: Sequelize.INTEGER,
            unique: false,
            allowNull: false
        },
        sport: {
            type: Sequelize.INTEGER,
            unique: false,
            allowNull: false
        },
        vrijemeOdrzavanja: {
            type: Sequelize.STRING,
            unique: false,
            allowNull: false
        },
        mjesto: {
            type: Sequelize.STRING,
            unique: false,
            allowNull: false
        },
        zavrsen: {
            type: Sequelize.BOOLEAN,
            unique: false,
            allowNull: false
        },
        rezTim1: {
            type: Sequelize.INTEGER,
            unique: false,
            allowNull: true
        },
        rezTim2: {
            type: Sequelize.INTEGER,
            unique: false,
            allowNull: true
        },
        otkazan: {
            type: Sequelize.BOOLEAN,
            unique: false,
            allowNull: false
        }
    })
}
