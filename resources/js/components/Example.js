import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TransferForm from './TransferForm';
import TransferList from './TransferList';

import url from '../url'

export default class Example extends Component {

    constructor(props){
        super(props)
        this.state = {
            money: 0.0,
            transfers: [],
            error: null,
            form:{
                description:'',
                amount:'',
                wallet_id:5
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    //metodo para el submit
    async handleSubmit(e){
        e.preventDefault();
        try{
            let config = {
                method: 'POST',
                headers: {
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(this.state.form)
            }
            //interpolar concatenar varables con string
            let res = await fetch(`${url}/api/transfer`,config)
            // almacenamos la respeusta en data
            let data = await res.json()

            this.setState({
                transfers: this.state.transfers.concat(data),
                money: this.state.money + (parseFloat(data.amount))
            })
        }catch (error) {
            this.setState({
                error
            })
        }
    }

    //metodo que conytrole los eventos
    handleChange(e){
        //console.log(e.target.value)
        this.setState({
            form:{
                //parametros res mantener lo que habia
                ...this.state.form,
                [e.target.name]:e.target.value
            }
        })
    }

    //llamados al Api
    async componentDidMount(){
        try{
            let res = await fetch(`${url}/api/wallet`)
            // almacenamos la respeusta en data
            let data = await res.json()
            // actualizamos el state
            this.setState({
                money: data.money,
                transfers: data.transfers
            })
        } catch (e) {
            this.setState({
                error: e
            })
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-12 m-t-md">
                        <p className="title"> $ {this.state.money} </p>
                    </div>
                    <div className="col-md-12">
                        <TransferForm
                            form={this.state.form}
                            onChange={this.handleChange}
                            onSubmit={this.handleSubmit}
                        />
                    </div>
                </div>
                <div className="m-t-md">
                    <TransferList
                        transfers={this.state.transfers}
                    />
                </div>
            </div>
        );
    }
}

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
