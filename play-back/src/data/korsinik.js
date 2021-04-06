import Sequelize from 'sequelize'
const Op = Sequelize.Op
let baza = null

class KorisnikData{
    static postaviBazu(db){
        baza = db
    }

    static async dodajKorisnika(korisnik){
        try {
            await baza.Korisnik.create(korisnik)    
        } catch (error) {
            throw error
        }
    }

    static async traziKorisnikaPoUsername(username, gledajCijelo){
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
}

export default KorisnikData