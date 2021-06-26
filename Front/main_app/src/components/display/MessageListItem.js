import React from 'react';
import {TimeConverter} from "../../helpers/time-converter";

const MessageListItem = ({ message }) =>{

    const onClick = () =>{
        if (message.data !== null){
            window.location.assign(`/details`);
            localStorage.setItem("data", JSON.stringify(message.data));
        }
    }
    //console.log('state')
    console.log(typeof message.data)
    if (!(typeof message.data === 'string') && message.data != null){
        var pairs = [];

        for(var key in message.data){
            //console.log(key)
            //console.log(this.state.data[key])
            pairs.push(<p key={key}>{key} : {message.data[key]}</p>);
        }
        return(
            <li className="table-row" onClick = {onClick}>
                <div className="list-col">
                    {message.EUI}
                </div>
                <div className="list-col">
                    {TimeConverter(message.ts)}
                </div>
                <div className="list-col">
                    {message.port}
                </div>
                <div className="list-col">
                     {pairs}
                </div>
            </li>);
    }
    else{
        return(
            <li className="table-row">
                <div className="list-col">
                    {message.EUI}
                </div>
                <div className="list-col">
                    {TimeConverter(message.ts)}
                </div>
                <div className="list-col">
                    {message.port}
                </div>
                <div className="list-col">
                     {message.data}
                </div>
            </li>);
    }
}

export {MessageListItem}