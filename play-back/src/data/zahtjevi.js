import Sequelize, { BelongsTo } from 'sequelize'
const Op = Sequelize.Op
let baza = null

class ZahtjeviData{
    static postaviBazu(db){
        baza = db
    }
	
	static async posaljiZahtjevTim(zahtjev){
        try {

            await baza.ZahtjevTim.create(zahtjev)
        } catch (error) {
            throw error
        }
	}
	
	static async posaljiZahtjevMec(zahtjev){
        try {
            await baza.ZahtjevMec.create(zahtjev)
        } catch (error) {
            throw error
        }
	}
	
	static async posaljiZahtjevMecBezTimova(zahtjev){
        try {
            await baza.ZahtjevMecBezTimova.create(zahtjev)
        } catch (error) {
            throw error
        }
	}
	
	static async dobaviZahtjeveZaTim(timID) {
        try {
            let zahtjevi = await baza.ZahtjevTim.findAll(
                { where: { tim: timID },
                    include: baza.Korisnik,
                    order: [['id', 'desc']]  }
            )
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

	static async dobaviZahtjeveZaMecBezTimova(korisnikID, mec) {
        try {
            let rez = await baza.ZahtjevMecBezTimova.findAll(
                {
                    where: korisnikID?{primaoc:korisnikID}:{mec:mec},
                    include:baza.Korisnik,
                    order: [['id', 'desc']]     
                }  
                )
            return rez.map(r => r.dataValues)
        } catch (error) {
            throw error
        }
    }

    static async azurirajZahtjevZaMecBezTimova(id, data){
        try {
            let zahtjev = await baza.ZahtjevMecBezTimova.findOne({where:{id}})
            Object.keys(data).map(p => zahtjev[p] = data[p])
            await zahtjev.save()
        } catch (error) {
            throw error
        }
    }

    static async dobaviKorisnikoveZahtjeveZaTim(korisnik){
        try {
            let rez = await baza.ZahtjevTim.findAll({
                where:{primaoc: korisnik},
                include:baza.Tim,
                order: [['id', 'desc']] 
            })
            return rez.map(r=>r.dataValues)
        } catch (error) {
            throw error
        }
    }

    static async azurirajZahtjevZaTim(id, data){
        try {
            let zahtjev = await baza.ZahtjevTim.findOne({where:{id}})
            Object.keys(data).map(p=>zahtjev[p] = data[p])
            await zahtjev.save()
        } catch (error) {
            throw error
        }
    }

    static async dobaviKorisnikoveZahtjeveZaMec(korisnik){
        try {
            let res = await baza.ZahtjevMec.findAll({
                include:[
                    {
                        model: baza.Tim,
                        as: 'drugiTim',
                        where:{
                            kapiten: korisnik
                        } 
                    },
                    {
                    model: baza.Tim,
                    as: 'prviTim'
                }],
                order: [['id', 'desc']]
            })
            
            return res.map(r=>r.dataValues)
        } catch (error) {
            throw error
        }
    }

    static async azurirajZahtjevZaTim(id, data){
        try {
            let zahtjev = await baza.ZahtjevTim.findOne({where:{id:id}})
            Object.keys(data).map(p => zahtjev[p] = data[p])
            await zahtjev.save()
        } catch (error) {
            throw error
        }
    }

    static async posaljiZahtjevPridruzivanje(zahtjev){
        try {
            await baza.ZahtjevPridruzivanje.create(zahtjev)
        } catch (error) {
            throw error
        }
    }

    static async dobaviZahtjeveZaPridruzivanje(korisnik, mec){
        try {
            let rez = await baza.ZahtjevPridruzivanje.findAll(
                {
                    where:korisnik?{primaoc: korisnik}:{mec:mec},
                    include:[{
                        model:baza.Korisnik,
                        as:"korisnikPosiljaoc"
                    }]
                })
            return rez.map(r => r.dataValues)
        } catch (error) {
            throw error
        }
    }

    static async azurirajZahtjevZaPridruzivanje(zahtjev, data){
        try {
            let rez = await baza.ZahtjevPridruzivanje.findOne({where:{id:zahtjev}})
            Object.keys(data).map(p => rez[p] = data[p])
            await rez.save()
        } catch (error) {
            throw error
        }
    }

    static async azurirajZahtjevZaMec(zahtjev, data){
        try {
            let rez = await baza.ZahtjevMec.findOne({where:{id:zahtjev}})
            Object.keys(data).map(p=> rez[p] = data[p])
            await rez.save()
        } catch (error) {
            throw error
        }
    }
}

export default ZahtjeviData