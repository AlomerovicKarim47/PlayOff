import Sequelize from 'sequelize'
const Op = Sequelize.Op
let baza = null

class ZahtjeviData{
    static postaviBazu(db){
        baza = db
    }
}

export default ZahtjeviData