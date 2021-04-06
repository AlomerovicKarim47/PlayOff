import Sequelize from 'sequelize'
const Op = Sequelize.Op
let baza = null

class PozicijeData{
    static postaviBazu(db){
        baza = db
    }
}

export default PozicijeData