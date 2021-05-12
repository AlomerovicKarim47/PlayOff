import { observable } from 'mobx'

let UserStore = observable({
    token:null,
    user:""
})

export default UserStore