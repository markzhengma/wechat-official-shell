import React, { Component } from 'react';
import {
    Link,
    Redirect,
} from 'react-router-dom';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            startDate: '',
            endDate: '',
        }
    }
    render(){
        return (
            <div className = "export-browse-page">
                <h3>下载记录</h3> 
                <button onClick = {this.props.exportBetweenDates()}>export</button>
            </div>
        )
    }
}

export default Login;