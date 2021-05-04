import Sequelize from 'sequelize'
const Op = Sequelize.Op
let baza = null

class PozicijeData{
    static postaviBazu(db){
        baza = db
    }
	
	static async dobaviPreferiranePozicije(korisnikID) {
        try {
            let pozicije = await baza.PreferiranePozicije.findAll({ where: { korisnik: korisnikID } })
            return pozicije
        } catch (error) {
            throw error
        }
    }
	
	static async updatePreferiranePozicije(pozicija) {
		//šta god je ovdje planirano
        /*try {
            let pozicije = await baza.PreferiranePozicije.findAll({ where: { korisnik: korisnikID } })
            return pozicije
        } catch (error) {
            throw error
        }*/
    }
	
	static async postaviPozicije(pozicija) {
        try {
            await baza.TimPozicije.create(pozicija)
        } catch (error) {
            throw error
        }
    }
}

export default PozicijeData