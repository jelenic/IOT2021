import React from 'react';

const SensorListItem = ({ sensor }) =>{

    const onClick = () =>{
        window.location.assign(`/display`);
        localStorage.setItem("EUI", sensor.EUI);
        localStorage.setItem("sensor", JSON.stringify(sensor));
        //console.log(sensor);
        if (sensor.type!== 'undefined' ){
            localStorage.setItem("type", sensor.type);
        }
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