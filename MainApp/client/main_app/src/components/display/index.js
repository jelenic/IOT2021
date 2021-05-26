import React from 'react';


export class Display extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: localStorage.getItem("JWT")
        }
    }
    render(){
        return(
        <div>
            <h4>{this.state.token}</h4>
        </div>
        )
    }
}