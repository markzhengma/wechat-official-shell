import React, { Component } from 'react';
import {
    Link,
    Redirect,
} from 'react-router-dom';

class AdminPage extends Component {
    constructor(){
        super();
        this.state = {
            admin_selection: '查找老客户',
            search_selection: '使用换油证号查找',
            service_num: '',
            make: '',
            plate: '',
            driver_name: '',
            phone_num: '',
        }
    }
    componentDidMount(){
        this.props.resetRedirect();
        this.props.resetCreateCompleted();
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
    submitAndClearState = (e, service_num, make, plate, driver_name, phone_num) => {
        this.props.handleNewUserSubmit(e, service_num, make, plate, driver_name, phone_num);
        this.setState({
            service_num: '',
            make: '',
            plate: '',
            driver_name: '',
            phone_num: '',
        });
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
                <div>
                    <select name = "admin_selection" onChange = {this.handleInputChange}>
                        <option>查找老客户</option>
                        <option>创建新客户</option>
                        <option>创建换油记录</option>
                    </select>
                </div>
                <div className = "admin-box">
                    {this.state.admin_selection === "查找老客户" ?
                        <select name = "search_selection" onChange = {this.handleInputChange}>
                            <option>使用换油证号查找</option>
                            <option>使用手机号查找</option>
                            <option>使用车主姓名查找</option>
                            <option>使用车牌号查找</option>
                        </select>
                    : ""}
                    {this.state.admin_selection === "查找老客户" ?
                        this.state.search_selection === "使用换油证号查找" ?
                        <form>
                            <input name = "search_service" placeholder = "请输入换油证号"/>
                        </form>
                        : ""
                    : ""}
                    {this.state.admin_selection === "查找老客户" ?
                        this.state.search_selection === "使用手机号查找" ?
                        <form>
                            <input name = "search_service" placeholder = "请输入手机号"/>
                        </form>
                        : ""
                    : ""}
                    {this.state.admin_selection === "查找老客户" ?
                        this.state.search_selection === "使用车主姓名查找" ?
                        <form>
                            <input name = "search_service" placeholder = "请输入车主姓名"/>
                        </form>
                        : ""
                    : ""}
                    {this.state.admin_selection === "查找老客户" ?
                        this.state.search_selection === "使用车牌号查找" ?
                        <form>
                            <input name = "search_service" placeholder = "请输入车牌号"/>
                        </form>
                        : ""
                    : ""}
                    {this.state.admin_selection === "创建新客户" ?
                        <form className = "create-form" onSubmit = {(e) => this.submitAndClearState(e, this.props.newServiceNum,
                                                                                                                this.state.make,
                                                                                                                this.state.plate,
                                                                                                                this.state.driver_name,
                                                                                                                this.state.phone_num)}>
                            <input className = "newrecord-input" value = {this.props.newServiceNum} readOnly = {true}/>
                            <input className = "newrecord-input" type = "text" name = "make" placeholder = "车型" onChange = {this.handleInputChange} value = {this.state.make}/>
                            <input className = "newrecord-input" type = 'text' name = 'plate' placeholder = "车牌号" onChange = {this.handleInputChange} value = {this.state.plate}/>
                            <input className = "newrecord-input" type = 'text' name = 'driver_name' placeholder = "车主姓名" onChange = {this.handleInputChange} value = {this.state.driver_name}/>
                            <input className = "newrecord-input" type = "text" name = "phone_num" placeholder = "联系方式" onChange = {this.handleInputChange} value = {this.state.phone_num}/>
                            <button className = "newrecord-btn" type = "submit">创建新客户</button>
                            <button className = "newrecord-btn" type = "reset">清空输入框</button>
                        </form>
                    : ""}
                    {this.state.admin_selection === "创建换油记录" ?
                        <form>
                            <input name = "search_service" placeholder = "换油证号"/>
                        </form>
                    : ""}
                </div>
                <div className = "admin-btn-list">
                    <button onClick = {this.logOut}>返回登录</button>
                    <Link to = "/"><button>返回首页</button></Link>
                </div>
            </div>
        )
    }
}

export default AdminPage;