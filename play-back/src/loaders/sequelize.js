import Sequelize from 'sequelize'
import config from '../config'
import models from '../models'

const loadSequelize = async() => {
    const connection = new Sequelize(`postgres://${config.db.USER}:${config.db.PASS}@${config.db.HOST}:${config.db.PORT}/template1`, {logging:false})
    const sequelize = new Sequelize(`postgres://${config.db.USER}:${config.db.PASS}@${config.db.HOST}:${config.db.PORT}/playoff`, {logging: false})
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
        db.ZahtjecMec = models.ZahtjevMec(sequelize)
        db.Mec = models.Mec(sequelize)
        db.MecBezTimova = models.MecBezTimova(sequelize)

        await sequelize.authenticate()
        await sequelize.sync()
        console.log('Connected to database.')
        return db
    } catch (error) {
        console.log('Unable to connect to database.', error)
    }
    return null
}

export default loadSequelize

