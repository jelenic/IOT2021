import React from 'react';

const SensorListItem = ({ sensor }) =>
    <li className="table-row">
        <div className="list-col">
            {sensor.EUI}
        </div>
        <div className="list-col">
            {sensor.type}
        </div>
        <div className="list-col">
             {sensor.desc}
        </div>
    </li>;

export {SensorListItem}