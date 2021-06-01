import Sequelize from 'sequelize'
const Op = Sequelize.Op
let baza = null

class TimData{
    static postaviBazu(db){
        baza = db
    }

    static async dodaj(tim){
        try {
            let res = await baza.Tim.create(tim)
            await baza.ClanoviTima.create({korisnik: tim.kapiten, tim: res.dataValues.id})
            return res.dataValues
        } catch (error) {
            throw error
        }
    }

    static async uploadSliku(id, slika){
        try {
            let tim = await baza.Tim.findOne({where:{id}})
            tim.slika = slika
            await tim.save()
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

    static async dobaviOsnovane(korisnik, term, sport){
        let options = {
            kapiten:korisnik,
            ime:{
                [Op.like]:`%${term}%`
            }
        }
        if (sport) options.sport=sport
        try {
            let res = await baza.Tim.findAll({
                where:options})
            return res.map(r => r.dataValues)
        } catch (error) {
            throw error
        }
    }

    static async dobavi(term, sport, kapiten){
        let options = {
            ime:{
                [Op.like]:`%${term}%`
            }
        }
        if (kapiten)
            options.kapiten= {[Op.not]:kapiten}
        if (sport) options.sport=sport
        try {
            let res = await baza.Tim.findAll({
                where:options})
            return res.map(r => r.dataValues)
        } catch (error) {
            throw error
        }
    }

}

export default TimData