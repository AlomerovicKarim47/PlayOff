import Sequelize from 'sequelize'
const Op = Sequelize.Op
let baza = null

class TimData{
    static postaviBazu(db){
        baza = db
    }
}

export default TimData