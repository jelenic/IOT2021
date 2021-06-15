import React from 'react';


export class MessageDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: localStorage.getItem("JWT"),
            data: JSON.parse(localStorage.getItem("data"))
        }
    }
    render(){
        var pairs = [];

        for(var key in this.state.data){
            //console.log(key)
            //console.log(this.state.data[key])
            pairs.push(<p key={key}>{key} : {this.state.data[key]}</p>);
        }
        return (
            <div className="Data-item">{pairs}</div>
        );
    }
    /*render(){
        console.log(this.state.data);
        return(
            <div>
                {this.state.data}
            </div>
        )
    }*/
}