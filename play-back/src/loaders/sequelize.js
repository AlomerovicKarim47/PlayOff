import Sequelize from 'sequelize'
import config from '../config'
import models from '../models'
import {postaviBazu} from '../data'

const loadSequelize = async() => {
    const connection = new Sequelize(`postgres://${config.db.USER}:${config.db.PASS}@${config.db.HOST}:${config.db.PORT}/template1`, {logging:false})
    const sequelize = new Sequelize(`postgres://${config.db.USER}:${config.db.PASS}@${config.db.HOST}:${config.db.PORT}/${config.db.NAME}`, {logging: false})
    try {    
        try{   
            await connection.query(`CREATE DATABASE ${config.db.NAME} WITH OWNER = ${config.db.USER} ENCODING = 'UTF8'`)
        }catch{
            //DO NOTHING
        }
        const db = {}

        db.Korisnik = models.Korisnik(sequelize)
        db.Review = models.Review(sequelize)
        db.ClanoviTima = models.ClanoviTima(sequelize)
        db.ProsliTimovi = models.ProsliTimovi(sequelize)
        db.PreferiranePozicije = models.PreferiranePozicije(sequelize)
        db.Poruka = models.Poruka(sequelize)
        db.Tim = models.Tim(sequelize)
        db.ZahtjevTim = models.ZahtjevTim(sequelize)
        db.TimPozicije = models.TimPozicije(sequelize)
        db.ZahtjevMecBezTimova = models.ZahtjevMecBezTimova(sequelize)
        db.UcesniciUMecuBezTimova = models.UcesniciUMecuBezTimova(sequelize)
        db.ZahtjevMec = models.ZahtjevMec(sequelize)
        db.Mec = models.Mec(sequelize)
        db.MecBezTimova = models.MecBezTimova(sequelize)
        db.ZahtjevPridruzivanje = models.ZahtjevPridruzivanje(sequelize)

        db.ZahtjevMecBezTimova.belongsTo(db.Korisnik, {foreignKey: 'primaoc'})
        db.ZahtjevTim.belongsTo(db.Korisnik, {foreignKey:'primaoc'})
        db.ZahtjevTim.belongsTo(db.Tim, {foreignKey:'tim'})
        db.ZahtjevMec.belongsTo(db.Tim, {foreignKey: 'timPosiljaoc', as: 'prviTim'})
        db.ZahtjevMec.belongsTo(db.Tim, {foreignKey: 'timPrimaoc', as: 'drugiTim'})
        db.Mec.belongsTo(db.Tim, {foreignKey: "tim1", as: "prviTim"})
        db.Mec.belongsTo(db.Tim, {foreignKey: "tim2", as: "drugiTim"})
        db.ZahtjevPridruzivanje.belongsTo(db.Korisnik, {foreignKey:"posiljaoc", as:"korisnikPosiljaoc"})
        
        await sequelize.authenticate()
        await sequelize.sync()
        console.log('Connected to database.')
        postaviBazu(db)
    } catch (error) {
        console.log('Unable to connect to database.', error)
    }
}

export default loadSequelize

