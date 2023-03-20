import React, { Component } from 'react';
import { Buffer } from 'buffer';

class Scoreboard extends Component {
    render() {
        return (
            <div>
                <div class = "container-fluid">
                        <br/>
                        <div class = "row">
                            <div class = "col">
                                Tim1:
                                <input type = "text" class = "form-control" value = {this.props.dogadjaj.prviTim.ime} disabled = {true}/>
                            </div>
                            <div class = "col">
                                Tim2:
                                <input type = "text" class = "form-control" value = {this.props.dogadjaj.drugiTim.ime} disabled = {true}/>
                            </div>
                        </div><br/>
                        <div class = "row">
                            <div class = "col">
                                <img alt = "" src={`data:${"image/png"};base64,${Buffer.from(this.props.dogadjaj.prviTim.slika.data).toString('base64')}`} 
                                        class="rounded mx-auto d-block img-thumbnail" style = {{width:'300px', height:'300px'}}/>
                            </div>
                            <div class = "col">
                               <div class = "row">
                                    <div class = "col">
                                        <input type = "number" class = "form-control" 
                                                style = {{height:'300px', fontSize:'200px', textAlign:'center'}} 
                                                defaultValue={this.props.rezTim1} min={0}
                                                onChange = {(e) => this.props.changeScoreTim1(e.target.value)}
                                                disabled = {this.props.dogadjaj.zavrsen || this.props.zavrsen}/>
                                    </div>
                                    <div class = "col">
                                        <input type = "number" class = "form-control" 
                                                style = {{height:'300px', fontSize:'200px', textAlign:'center'}} 
                                                defaultValue={this.props.rezTim2} min={0}
                                                onChange = {(e) => this.props.changeScoreTim2(e.target.value)}
                                                disabled = {this.props.dogadjaj.zavrsen || this.props.zavrsen}/>
                                    </div>
                                </div>
                            </div>
                            <div class = "col">
                                <img alt = "" src={`data:${"image/png"};base64,${Buffer.from(this.props.dogadjaj.drugiTim.slika.data).toString('base64')}`} 
                                        class="rounded mx-auto d-block img-thumbnail" style = {{width:'300px', height:'300px'}}/>
                            </div>
                        </div><br/>
                        <div class = "row">
                            <button class = "btn btn-danger btn-lg" onClick = {() => this.props.zavrsiMec()} 
                                disabled = {this.props.dogadjaj.zavrsen || this.props.zavrsen}>Završi meč</button>
                        </div>
                    </div>
            </div>
        );
    }
}

export default Scoreboard;
