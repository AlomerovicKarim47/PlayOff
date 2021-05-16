import React, { Component } from 'react'
import { observer } from 'mobx-react'

import KorisnikService from '../services/KorisnikService'
import UserStore from '../stores/UserStore'
import loginSchema from '../validation/LoginValidation'

class LoginPage extends Component {

    state = {
        username: "",
        password: "",
        invalid: false
    }

    login = async () => {
        try {
            await loginSchema.validate({ username: this.state.username, password: this.state.password }, { abortEarly: false })
            let res = await KorisnikService.login({ username: this.state.username, password: this.state.password })
            if (res.code === 200) {
                UserStore.token = res.data.token
                UserStore.user = res.data.korisnik
                this.props.history.push("/home")
            } else {
                this.setState({ invalid: true })
            }
        } catch (error) {
            if (error.name == "ValidationError") {
                let errors = {}
                error.inner.map(i => errors[i.path + "Error"] = i.message)
                this.setState({ ...this.state, ...errors })
            }
            else
                throw error
        }
    }

    register = () => {
        this.props.history.push("/register")
    }

    changeAttribute = (att, val) => {
        this.setState({ [att]: val, [att + "Error"]: "", invalid: false })
    }

    render() {
        return (
            <div className="container-fullwidth  vertical-center">
                <div className="card mx-auto" style={{ width: "20rem" }}>
                    <input type="text" className="form-control" placeholder="Korisničko ime" onChange={(e) => this.changeAttribute("username", e.target.value)} />
                    <div className="validation-msg">{this.state.usernameError}</div>

                    <input type="password" className="form-control" placeholder="Lozinka" onChange={(e) => this.changeAttribute("password", e.target.value)} />
                    <div className="validation-msg">{this.state.passwordError}</div>

                    <button className="btn btn-primary" onClick={() => this.login()}>Log in</button>
                    <div className="validation-msg">{this.state.invalid ? "Neispravni login podaci." : ""}</div>

                    <button className="btn btn-primary" onClick={() => this.register()}>Registracija</button>
                </div>
            </div>
        )
    }
}
export default observer(LoginPage)
