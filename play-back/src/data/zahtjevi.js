import Sequelize from 'sequelize'
const Op = Sequelize.Op
let baza = null

class ZahtjeviData{
    static postaviBazu(db){
        baza = db
    }
	
	static async PosaljiZahtjevTim(zahtjev){
        try {
            await baza.ZahtjevTim.create(zahtjev)
        } catch (error) {
            throw error
        }
	}
	
	static async PosaljiZahtjevMec(zahtjev){
        try {
            await baza.ZahtjevMec.create(zahtjev)
        } catch (error) {
            throw error
        }
	}
	
	static async PosaljiZahtjevMecBezTimova(zahtjev){
        try {
            await baza.ZahtjevMecBezTimova.create(zahtjev)
        } catch (error) {
            throw error
        }
	}
	
	static async dobaviZahtjeveZaTim(timID) {
        try {
            let zahtjevi = await baza.ZahtjevTim.findAll({ where: { tim: timID } })
            return zahtjevi
        } catch (error) {
            throw error
        }
    }
	
	static async dobaviZahtjeveZaMec(timID) {
        try {
            let zahtjevi = await baza.ZahtjevMec.findAll({ where: { timPrimaoc: timID } })
            return zahtjevi
        } catch (error) {
            throw error
        }
    }
	/* nema nacina za pretragu kome se šalje zahtjev 
	static async dobaviZahtjeveZaMecBezTimova(korisnikID) {
        try {
            let zahtjevi = await baza.zahtjevMecBezTimova.findAll({ where: { timPrimaoc: timID } })
            return zahtjevi
        } catch (error) {
            throw error
        }
    }*/
}

export default ZahtjeviData