import Sequelize from 'sequelize'
const Op = Sequelize.Op
let baza = null

class MeceviData {
    static postaviBazu(db) {
        baza = db
    }

    // Trenutno prikazuje mečeve svih timova u kojim je korisnik, neovisno da li je on igrao ili ne
    // Ovdje se ne sortiraju, sortiraj meceve po datumu na frontu
    static async dobaviMecKorisnik(korisnikID) {
        try {
            let timovi = await baza.ClanoviTima.findAll({ where: { korisnik: korisnikID } })

            let mecevi = []
            for (const tim of timovi) {
                mecevi.push(await baza.Mec.findAll({ where: { tim1: tim.id } }))
                mecevi.push(await baza.Mec.findAll({ where: { tim2: tim.id } }))
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
            return x
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
}

export default MeceviData
