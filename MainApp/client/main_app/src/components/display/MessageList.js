import React from 'react';
import { MessageListItem } from './MessageListItem';

const MessageList = ({ messages }) =>
    <ul>
        <li className="table-header">
            <div className="list-col">EUI</div>
            <div className="list-col">ts</div>
            <div className="list-col">port</div>
            <div className="list-col">data</div>
        </li>
        {messages.map(message =>
            <MessageListItem
                key={message.ts}
                message={message}
            />
        )}
    </ul>;
export{MessageList}