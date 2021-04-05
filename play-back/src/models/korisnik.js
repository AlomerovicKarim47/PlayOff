import Sequelize from 'sequelize'

export default (sequelize) => {
    return sequelize.define('Korisnik', {
        username:{
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        password:{
            type: Sequelize.STRING,
            unique: false,
            allowNull: false
        },
        ime:{
            type: Sequelize.STRING,
            unique: false,
            allowNull: false
        },
        prezime:{
            type: Sequelize.STRING,
            unique: false,
            allowNull: false
        },
        rodjendan:{
            type: Sequelize.STRING,
            unique: false,
            allowNull: false
        },
        drzava:{
            type: Sequelize.STRING,
            unique: false,
            allowNull: false
        },
        grad:{
            type: Sequelize.STRING,
            unique: false,
            allowNull: false
        },
        spol:{
            type: Sequelize.BOOLEAN,
            unique: false,
            allowNull: false
        },
        rank:{
            type: Sequelize.INTEGER,
            unique: false,
            allowNull: true
        }
    })
}