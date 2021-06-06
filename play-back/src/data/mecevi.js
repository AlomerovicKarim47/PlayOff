import Sequelize from 'sequelize'
const Op = Sequelize.Op
let baza = null

class MeceviData {
    static postaviBazu(db) {
        baza = db
    }

    // Trenutno prikazuje mečeve svih timova u kojim je korisnik, neovisno da li je on igrao ili ne
    // Ovdje se ne sortiraju, sortiraj meceve po datumu na frontu
    static async dobaviMecKorisnik(korisnikID, organizovani) {
        try {
            let options = {}
            if (organizovani) options = {kapiten: korisnikID}
            let res = await baza.ClanoviTima.findAll({ where: { korisnik: korisnikID } })
            let timovi = res.map(r => r.dataValues)
            let mecevi = []
            for (const tim of timovi) {
                let mecs = await baza.Mec.findAll({ 
                    where: { 
                        [Op.or]: [{tim1: tim.id}, {tim2: tim.id} ]
                    },
                    include:[
                        {
                            model: baza.Tim,
                            as: "prviTim",
                            where:options
                        },
                        {
                            model: baza.Tim,
                            as: "drugiTim"
                        }
                    ] 
                })
                let m = mecs.map(m => m.dataValues)
                mecevi = [...mecevi, ...m]
                //mecevi.push(await baza.Mec.findAll({ where: { tim2: tim.id } }))
            }

            return mecevi
        } catch (error) {
            throw error
        }
    }

    static async dobaviMecTim(timID) {
        try {
            let mecevi = []
            mecevi.push(await baza.Mec.findAll({ where: { tim1: timID } }))
            mecevi.push(await baza.Mec.findAll({ where: { tim2: timID } }))

            return mecevi
        } catch (error) {
            throw error
        }
    }

    static async dodajMec(mec) {
        try {
            //console.log(mec)
            await baza.Mec.create(mec)
        } catch (error) {
            throw error
        }
    }

    static async zavrsiMec(mecID, rezultat) {
        try {
            let mec = await baza.Mec.findOne({ where: { id: mecID } })

            if (rezultat.otkazan == 0) {
                mec.rezTim1 = rezultat.rezTim1
                mec.rezTim2 = rezultat.rezTim2
                mec.zavrsen = true
            } else {
                mec.otkazan = true
            }

            await mec.save()
            return mec.dataValues
        } catch (error) {
            throw error
        }
    }

    static async dodajTermin(termin) {
        try {
            //console.log(termin)
            let x = await baza.MecBezTimova.create(termin)
            return x.dataValues
        } catch (error) {
            throw error
        }
    }

    static async dobaviTermine(korisnikID) {
        try {
            let spisak = await baza.UcesniciUMecuBezTimova.findAll({ where: { korisnik: korisnikID } })

            let termini = []
            for (const termin of spisak) {
                termini.push(await baza.MecBezTimova.findOne({ where: { id: termin.mec } }))
            }

            return termini
        } catch (error) {
            throw error
        }
    }

    static async zavrsiTermin(mecID, rezultat) {
        try {
            let mec = await baza.MecBezTimova.findOne({ where: { id: mecID } })

            if (rezultat.otkazan == 0) {
                // Termin je uspješno završen
                mec.rezTim1 = rezultat.rezTim1
                mec.rezTim2 = rezultat.rezTim2
                mec.zavrsen = true
            } else mec.otkazan = true

            await mec.save()
            return mec.dataValues
        } catch (error) {
            throw error
        }
    }

    static async dodajKorisnikaTermin(unos) {
        try {
            //console.log(unos)
            await baza.UcesniciUMecuBezTimova.create(unos)
        } catch (error) {
            throw error
        }
    }

    static async izbaciKorisnikaTermin(data) {
        try {
            let obrisano = await baza.UcesniciUMecuBezTimova.destroy({ where: { korisnik: data.korisnikID, mec: data.mecID } })
            return obrisano
        } catch (error) {
            throw error
        }
    }

    static async dobaviOrganizovaneTermine(korisnik){
        try {
            let rez = await baza.MecBezTimova.findAll({where:{organizator:korisnik}})
            return rez.map(r=>r.dataValues)
        } catch (error) {
            throw error
        }
    }

    static async pretraziTerminePoMjestu(query){
        try {
            let rez = await baza.MecBezTimova.findAll({where:{
                mjesto: {
                    [Op.like]: `%${query}%`
                }
            }})
            return rez.map(r => r.dataValues)
        } catch (error) {
            throw error
        }
    }
}

export default MeceviData
