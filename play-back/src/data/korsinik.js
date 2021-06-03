import Sequelize from 'sequelize'
const Op = Sequelize.Op
let baza = null

class KorisnikData{
    static postaviBazu(db){
        baza = db
    }

    static async dodaj(korisnik){
        try {
            await baza.Korisnik.create(korisnik)    
        } catch (error) {
            throw error
        }
    }

    static async uploadSliku(id, slika){
        try {
            let korisnik = await baza.Korisnik.findOne({where:{id}})
            korisnik.slika = slika
            await korisnik.save()
        } catch (error) {
            throw error
        }
    }

    static async traziPoUsername(username, gledajCijelo){
        try {
            let data = await baza.Korisnik.findAll({where:{
                username:
                    gledajCijelo?
                    username:
                    {[Op.like]:`%${username}%`}
                }})
            let korisnici = data.map(d => d.dataValues)
            return korisnici
        } catch (error) {
            throw error
        }
    }

    static async provjeriLogin(creds){
        try {
            let data = await baza.Korisnik.findOne({where:{username:creds.username, password: creds.password}})
            if (!data)
                return null
            return data.dataValues
        } catch (error) {
            throw error
        }
    }

    static async traziPoId(korisnikID){
        try {
            let korisnik = await baza.Korisnik.findOne({where:{id:korisnikID}})
            if (!korisnik)
                return korisnik
            else
                return korisnik.dataValues
        } catch (error) {
            throw error
        }
    }

    static async izmjeni(korisnikID, data){
        try {
            let korisnik = await baza.Korisnik.findOne({where:{id:korisnikID}})
            if (!korisnik)
                return null
            Object.keys(data).map(p=>korisnik[p] = data[p])
            await korisnik.save()
            return korisnik.dataValues
        } catch (error) {
            throw error
        }
    }
}

export default KorisnikData