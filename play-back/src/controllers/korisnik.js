import {KorisnikData} from '../data'

const registracija = async (req, res, next) => {
    let korisnik = {...req.body, dosupnost:false, rank:0}
    try {    
        await KorisnikData.dodajKorisnika(korisnik)
        res.statusCode = 201 
    } catch (error) {
        if (error.name == "SequelizeUniqueConstraintError" && error.errors.length > 0){
            res.statusCode = 409
            let razlog = error.errors[0].path
            res.message = `Zahtjev neuspješno obrađen. Unešeni ${razlog} već postoji.`
        }
        else{
            res.statusCode = 500
            res.message = "Nepoznata greška u bazi: "+ error.message
        }
    }
    next()
}

const KorisnikCtrl = {
    registracija
}

export default KorisnikCtrl