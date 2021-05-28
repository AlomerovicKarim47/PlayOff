import React, { Component, useState } from 'react'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import { observer } from 'mobx-react'
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Select from 'react-select';
import TimePicker from 'react-time-picker';
import Text from 'react-text'



import KorisnikService from '../services/KorisnikService'
import registerSchema from '../validation/RegisterValidation'


const data = [
    {
      value: 1,
      label: "cerulean"
    },
    {
      value: 2,
      label: "fuchsia rose"
    },
    {
      value: 3,
      label: "true red"
    },
    {
      value: 4,
      label: "aqua sky"
    },
    {
      value: 5,
      label: "tigerlily"
    },
    {
      value: 6,
      label: "blue turquoise"
    }
  ];

export default class HomePage extends Component {
	
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
        invalid: false,
		display: false
		
    }
	constructor(){
		super();

	}

    changeAttribute = (att, val) => {
        this.setState({ [att]: val, [att + "Error"]: "", invalid: false })
    }

	

    render() {
        return (
			<div className="">
                <div className="card mx-auto" style={{ width: "40rem" }}>
					<h2>PLAYOFF</h2>
                    <input type="text" className="form-control" placeholder="Search..." onChange={(e) => this.changeAttribute("username", e.target.value)} />
					
                </div>
				<div classname="container-fullwidth left">
					<button className="btn btn-primary" >Organizacija</button>
					<button className="btn btn-primary" >Timovi</button>
					<button className="btn btn-primary" >Zahtjevi</button>
				</div>
			<div classname="left">
				<div className="card " style={{ width: "20rem" }}>
					<button className="btn btn-primary " >Organizuj</button>
					<button className="btn btn-primary" >U toku</button>
					<button className="btn btn-primary" >Zakazano</button>	
				</div>
				<div className="card2 " style={{ width: "20rem" }}>
					<input type="text" className="form-control" placeholder="Mjesto" onChange={(e) => this.changeAttribute("username", e.target.value)} />
					<div className="dropdown " style={{ width: "20rem" }}>
					<Select
						placeholder="Akcija"
						value="test" 
						options={data} 
					/>
					</div>
					<div className="dropdown " style={{ width: "20rem" }}>
					<Select
						placeholder="Sport"
						value="test" 
						options={data} 
					/>
					</div>
					<div className="dropdown " style={{ width: "20rem" }}>
					<Select
						placeholder="Vrijeme"
						value="test" 
						options={data} 
					/>
					</div>
					<button className="btn btn-primary" >Spasi</button>
					<button className="btn btn-primary" >Zakazano</button>
				</div>
			</div>
            </div>
        )
    }
}
