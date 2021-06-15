import React from 'react';
import {TimeConverter} from "../../helpers/time-converter";

const MessageListItem = ({ message }) =>{

    /*const onClick = () =>{
        window.location.assign(`/display`);
        localStorage.setItem("EUI", sensor.EUI);
    }*/
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
             link to data
        </div>
    </li>);
}

export {MessageListItem}