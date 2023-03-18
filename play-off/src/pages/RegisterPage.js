import React, { Component } from 'react'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import { observer } from 'mobx-react'
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import KorisnikService from '../services/KorisnikService'
import registerSchema from '../validation/RegisterValidation'

class RegisterPage extends Component {
    state = {
        username: "",
        password: "",
        email: "",
        ime: "",
        prezime: "",
        rodjendan: null,
        drzava: "",
        grad: "",
        spol: true,
        radioSpol: "",
        invalid: false
    }

    register = async (e) => {
        e.target.disabled = true;
        e.target.innerHTML = "Pričekajte..."
        try {
            let spol = null;
            if (this.state.radioSpol === "Muško") spol = true
            else if (this.state.radioSpol === "Žensko") spol = false

            await registerSchema.validate({
                username: this.state.username, password: this.state.password,
                email: this.state.email, ime: this.state.ime, prezime: this.state.prezime,
                rodjendan: this.state.rodjendan, drzava: this.state.drzava,
                grad: this.state.grad
            }, { abortEarly: false })

            let res = await KorisnikService.register({
                username: this.state.username, password: this.state.password,
                email: this.state.email, ime: this.state.ime, prezime: this.state.prezime,
                rodjendan: this.state.rodjendan, drzava: this.state.drzava,
                grad: this.state.grad, spol: spol
            })
            if (res.code === 201) 
                this.props.history.push("/")
            else{ 
                e.target.disabled = false;
                e.target.innerHTML = "Registruj se"
                this.setState({ invalid: true });
            }
        } catch (error) {
            if (error.name === "ValidationError") {
                e.target.disabled = false;
                e.target.innerHTML = "Registruj se"
                let errors = {}
                error.inner.map(i => errors[i.path + "Error"] = i.message)
                this.setState({ ...this.state, ...errors })
            }
            else
                throw error
        }
    }

    redirectLogin = () => {
        this.props.history.push("/")
    }

    changeAttribute = (att, val) => {
        this.setState({ [att]: val, [att + "Error"]: "", invalid: false })
    }

    render() {
        return (
            <div className="container-fullwidth  vertical-center">
                <div className="card mx-auto bg-light" style={{ width: "20rem" }}>
                    <input type="text" className="form-control" placeholder="Korisničko ime" onChange={(e) => this.changeAttribute("username", e.target.value)} />
                    <div className="validation-msg">{this.state.usernameError}</div>

                    <input type="password" className="form-control" placeholder="Lozinka" onChange={(e) => this.changeAttribute("password", e.target.value)} />
                    <div className="validation-msg">{this.state.passwordError}</div>

                    <input type="text" className="form-control" placeholder="Email" onChange={(e) => this.changeAttribute("email", e.target.value)} />
                    <div className="validation-msg">{this.state.emailError}</div>

                    <input type="text" className="form-control" placeholder="Ime" onChange={(e) => this.changeAttribute("ime", e.target.value)} />
                    <div className="validation-msg">{this.state.imeError}</div>

                    <input type="text" className="form-control" placeholder="Prezime" onChange={(e) => this.changeAttribute("prezime", e.target.value)} />
                    <div className="validation-msg">{this.state.prezimeError}</div>

                    <div className="form-control">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DatePicker
                                format="dd/MM/yyyy"
                                //margin="normal"
                                label="Datum rođenja"
                                value={this.state.rodjendan}
                                onChange={date => this.changeAttribute("rodjendan", date)}
                            />
                            <div className="validation-msg">{this.state.rodjendanError}</div>
                        </MuiPickersUtilsProvider>
                    </div>

                    <input type="text" className="form-control" placeholder="Država" onChange={(e) => this.changeAttribute("drzava", e.target.value)} />
                    <div className="validation-msg">{this.state.drzavaError}</div>

                    <input type="text" className="form-control" placeholder="Grad" onChange={(e) => this.changeAttribute("grad", e.target.value)} />
                    <div className="validation-msg">{this.state.gradError}</div>

                    <div className="form-control">
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Spol</FormLabel>
                            <RadioGroup aria-label="radioSpol" name="radioSpol" value={this.state.radioSpol} onChange={(e) => this.changeAttribute("radioSpol", e.target.value)} row>
                                <FormControlLabel value="Muško" control={<Radio />} label="Muško" />
                                <FormControlLabel value="Žensko" control={<Radio />} label="Žensko" />
                            </RadioGroup>
                        </FormControl>
                    </div>

                    <button className="btn btn-success" onClick={(e) => this.register(e)}>Registruj se</button>
                    <div className="validation-msg">{this.state.invalid ? "Provjerite unesene podatke." : ""}</div>

                    <button className="btn btn-success" onClick={() => this.redirectLogin()}>Povratak na Login</button>
                </div>
            </div>
        )
    }
}
export default observer(RegisterPage)
