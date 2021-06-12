import React from 'react';
import { SensorListItem } from './SensorListItem';

const SensorsList = ({ sensors }) =>
    <ul>
        <li className="table-header">
            <div className="list-col">EUI</div>
            <div className="list-col">type</div>
            <div className="list-col">desc</div>
        </li>
        {sensors.map(sensor =>
            <SensorListItem
                key={sensor.EUI}
                sensor={sensor}
            />
        )}
    </ul>;
export{SensorsList}