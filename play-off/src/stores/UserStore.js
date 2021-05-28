import { observable } from 'mobx'

let UserStore = observable({
    token:null,
    user:null
})

export default UserStore