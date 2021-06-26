import React from 'react';

const SensorListItem = ({ sensor }) =>{

    const onClick = () =>{
        window.location.assign(`/display`);
        localStorage.setItem("EUI", sensor.EUI);
    }
    return(
    <li className="table-row" onClick = {onClick}>
        <div className="list-col">
            {sensor.EUI}
        </div>
        <div className="list-col">
            {sensor.type}
        </div>
        <div className="list-col">
             {sensor.desc}
        </div>
    </li>);
}

export {SensorListItem}