import Sequelize from 'sequelize'
const Op = Sequelize.Op
let baza = null

class TimData{
    static postaviBazu(db){
        baza = db
    }

    static async dodaj(tim){
        try {
            await baza.Tim.create(tim)
        } catch (error) {
            throw error
        }
    }

    static async izmjeni(timID, data){
        try {
            let tim = await baza.Tim.findOne({where:{id:timID}})
            if (!tim)
                return null
            Object.keys(data).map(p => tim[p] = data[p])
            await tim.save()
            return tim.dataValues
        } catch (error) {
            throw error
        }
    }

    static async dodajIgraca(timID, igracID){
        try {
            let dodano = await baza.ClanoviTima.findOrCreate({where:{tim:timID, korisnik:igracID}, defaults : {tim:timID, korisnik:igracID}})
            let kreirano = dodano[1]
            if (!kreirano)
                return null
            return dodano[0]
        } catch (error) {
            throw error
        }
    }

    static async izbaciIgraca(timID, igracID){
        try {
            let obrisano = await baza.ClanoviTima.destroy({where: {tim: timID, korisnik: igracID}})
            return obrisano
        } catch (error) {
            throw error
        }
    }

    static async dobaviProsle(korisnikID){
        try {
            let prosli = await baza.ProsliTimovi.findAll({where:{korisnik: korisnikID}})
            return prosli.map(p=>p.dataValues)
        } catch (error) {
            throw error
        }
    }

    static async dodajProsli(prosliTim){
        try {
            await baza.ProsliTimovi.create(prosliTim)
        } catch (error) {
            throw error
        }
    }

    static async clanovi(timID){
        try {
            let clanoviID = await baza.ClanoviTima.findAll({where:{tim:timID}, attributes:['korisnik']})
            clanoviID = clanoviID.map(p=>p.dataValues.korisnik)
            let clanovi = await baza.Korisnik.findAll({where:{id: clanoviID}, attributes:{exclude:['password']}})
            return clanovi
        } catch (error) {
            throw error
        }
    }

}

export default TimData