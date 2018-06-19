import React, { Component } from 'react';
import {
    Link,
    Redirect,
} from 'react-router-dom';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            admin: '',
            pass: '',
            inputAdmin: '',
            inputPass: '',
            isNewUser: true,
        }
    }
    componentDidMount(){
        this.props.resetRedirect();
    }
    handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value,
        });
    }

    handleLogIn = (e) => {
        e.preventDefault();
        if(this.state.location != ''){
            this.setState({
                admin: this.state.inputAdmin,
                pass: this.state.inputPass,
            })
        }
        if(this.state.inputAdmin == "ShellHulunbuir" && this.state.inputPass == "Cheers!"){
            this.props.setAuthState(true);
            this.props.setRedirect('/admin');
            this.props.setLocation('总管理员');
        }
        if(this.state.inputAdmin == "shellhd" && this.state.inputPass == "hedong"){
            this.props.setAuthState(true);
            this.props.setRedirect('/admin');
            this.props.setLocation('海拉尔河东门店');
        }
        if(this.state.inputAdmin == "shellh" && this.state.inputPass == "hexi"){
            this.props.setAuthState(true);
            this.props.setRedirect('/admin');
            this.props.setLocation('海拉尔河西门店');
        }
        if(this.state.inputAdmin == "shellm" && this.state.inputPass == "manzhoulilaodian"){
            this.props.setAuthState(true);
            this.props.setRedirect('/admin');
            this.props.setLocation('满洲里老店');
        }
        if(this.state.inputAdmin == "shellm8" && this.state.inputPass == "manzhoulixindian"){
            this.props.setAuthState(true);
            this.props.setRedirect('/admin');
            this.props.setLocation('满洲里新店');
        }
        if(this.state.inputAdmin == "shelly" && this.state.inputPass == "yakeshi"){
            this.props.setAuthState(true);
            this.props.setRedirect('/admin');
            this.props.setLocation('牙克石门店');
        }
    }
    resetLogIn = () => {
        this.setState({
            inputAdmin: '',
            inputPass: '',
            admin: '',
            pass: '',
        })
    }
    render(){
        if(this.props.fireRedirect == true){
            return <Redirect to = {this.props.redirect}/>
        }
        return (
            <div className = "login-box">
                <h3>请以管理员身份登录</h3> 
                <form className = "login-form" onSubmit = {(e) => this.handleLogIn(e, this.state.inputAdmin, this.state.inputPass)}>
                    <input className = "login-input" type = "text" name = "inputAdmin" placeholder = "管理员" onChange = {this.handleInputChange}/>
                    <input className = "login-input" type = "password" name = "inputPass" placeholder = "密码" onChange = {this.handleInputChange}/>
                    <button className = "login-btn" type = "submit">登录</button>
                    <Link to = "/"><button className = "login-btn">返回首页</button></Link>
                </form>
            </div>
        )
    }
}

export default Login;