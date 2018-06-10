import React, { Component } from 'react';
import {
    Link,
    Redirect,
} from 'react-router-dom';

class AdminPage extends Component {
    componentDidMount(){
        this.props.resetRedirect();
        if(this.props.location == "海拉尔河东门店"){
            this.props.getNewHD();
        }
        if(this.props.location == "海拉尔河西门店"){
            this.props.getNewH();
        }
        if(this.props.location == "满洲里老店"){
            this.props.getNewM();
        }
        if(this.props.location == "满洲里新店"){
            this.props.getNewM8();
        }
        if(this.props.location == "牙克石门店"){
            this.props.getNewY();
        }
    }
    componentWillUnmount(){
        this.props.setAuthState(false);
    }
    handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value,
        });
    }
    logOut = () => {
        this.props.setAuthState(false);
    }
    render(){
        if(this.props.fireRedirect == true){
            return <Redirect to = {this.props.redirect}/>
        }
        if(!this.props.auth){
            return <Redirect to = '/login'/>
        }
        return (
            <div className = "admin-page">
                <h3>管理员登录：{this.props.location}</h3> 
                <button onClick = {this.logOut}>返回登录</button>
                <Link to = "/"><button>返回首页</button></Link>
            </div>
        )
    }
}

export default AdminPage;