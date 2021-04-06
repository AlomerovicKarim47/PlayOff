import Sequelize from 'sequelize'
const Op = Sequelize.Op
let baza = null

class PorukeData{
    static postaviBazu(db){
        baza = db
    }
}

export default PorukeData