import React, { Component } from 'react';
import { Buffer } from 'buffer';
import { Link } from 'react-router-dom';
import sportovi from '../config/sportovi';

class MojTimItem extends Component {
    render() {
        if (this.props.data.sport !== 0)
            return(
                <Link key = {this.props.data.id} to = {`/home/timovi/mojiTimovi/tim/${this.props.data.id}`} style = {{textDecoration:'none', color:'black'}}
                    onClick = {() => this.props.onClick()}>
                    <div  className = "card bg-light" style = {{margin:'5px', cursor:'pointer'}}>
                        <div className = "row">
                        <div className = "col-md-auto">
                            <img src={`data:${"image/png"};base64,${Buffer.from(this.props.data.slika.data).toString('base64')}`} 
                                className="rounded mx-auto d-block img-thumbnail" style = {{width:'80px', height:'80px', float:'left'}}/>
                            </div>
                            <div className = "col">
                                {this.props.data.ime}
                                <br/>
                                {  
                                    sportovi.find(s => s.id === this.props.data.sport).naziv
                                }<br/>
                            </div>
                        </div>
                    </div>
                </Link>)
    }
}

export default MojTimItem;
