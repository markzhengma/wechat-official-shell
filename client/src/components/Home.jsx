import React, { Component } from 'react';
import {
    Link,
    Redirect,
} from 'react-router-dom';

class Home extends Component {
    componentDidMount(){
        this.props.resetRedirect();
    }
    render(){
        if(this.props.fireRedirect == true){
            return <Redirect to = '/record'/>
        }
        return (
            <div className = "home-content">
                <h5>使用车牌号查询爱车的保养记录</h5>
                <form onSubmit = {this.props.submitForm}>
                    <input type = "text" name = "plate" value = {this.props.plate} placeholder = "请输入车牌号" onChange = {this.props.handleInputChange}/>
                    <button type = "submit">查询</button>
                </form>
            </div>
        )
    }
}

export default Home;