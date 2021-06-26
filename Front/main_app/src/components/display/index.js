import React from 'react';
import {MessageList} from './MessageList';


export class Display extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: localStorage.getItem("JWT"),
            username: localStorage.getItem("username"),
            sensors : [],
            messages : []
        }
    }

    componentDidMount(){
        //console.log('I was triggered during componentDidMount');
        const requestOptions = {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem("JWT") }
        };
        var urlReq = "http://127.0.0.1:4000/api/getData/EUI/" + localStorage.getItem("EUI");
        //console.log(urlReq);

        fetch(urlReq, requestOptions)
            .then(res =>
                res.json())
                //console.log(res.json().data))
            .then(data => this.setState({ messages: data.data }))
            .catch();
    }


    render(){

        console.log("in render");
        console.log(this.state.messages);

        if (this.state.messages.length === 0){
            console.log('empty');
            return(
                <div>
                    <h4>displayUplinkMessages</h4>
                </div>
                )
        }
        else{
            const {messages} = this.state;
            console.log(messages)
            return (
                <div className="smarthome">
                    <MessageList messages={messages} />
                </div>
                )
        }
    }
}