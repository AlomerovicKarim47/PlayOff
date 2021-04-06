import Sequelize from 'sequelize'
const Op = Sequelize.Op
let baza = null

class MeceviData{
    static postaviBazu(db){
        baza = db
    }
}

export default MeceviData