import React, { Component } from 'react';
import {
    Link,
    Redirect,
} from 'react-router-dom';

class AdminPage extends Component {
    constructor() {
        super();
        this.state = {
            record_time: '',
            record_name: '',
            record_milage: '', 
            record_operator: '', 
            record_gift: '', 
            record_detail: '', 
            record_id: '',
            service_num: '',
            make: '',
            plate: '',
            driver_name: '',
            phone_num: '',
            admin: '',
            pass: '',
            inputAdmin: '',
            inputPass: '',
            userOrRecord: '用户',
            isNewUser: true,
            location: '',
        }
    }
    componentDidMount(){
        this.props.resetRedirect();
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