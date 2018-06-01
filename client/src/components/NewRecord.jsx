import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NewRecord extends Component {
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
        }
    }

    componentDidMount(){
        this.props.resetRedirect();
        this.props.resetCreateCompleted();
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

    handleLogIn = (e) => {
        e.preventDefault();
        this.setState({
            admin: this.state.inputAdmin,
            pass: this.state.inputPass,
        })
        if(this.state.inputAdmin == "ShellHulunbuir" && this.state.inputPass == "Cheers!"){
            this.props.setAuthState(true);
        }
    }

    render() {
        // if(this.props.fireRedirect){
        //     return <Redirect to = {this.props.redirect}/>
        // }
        return (
            <div className = "create-page">
                {this.props.createCompleted != null ? 
                    this.props.createCompleted == true ?
                    <h5 className = "banner">创建成功</h5>
                    :
                    <h5 className = "banner">创建失败</h5>
                : ''}
                {this.state.admin === "ShellHulunbuir" ? 
                    this.state.pass === "Cheers!" ?
                    this.state.userOrRecord === "保养记录" ?
                    <form className = "create-form" onSubmit = {(e) => this.props.handleNewRecordSubmit(e, this.state.record_time, 
                                                                                                            this.state.record_name, 
                                                                                                            this.state.record_milage, 
                                                                                                            this.state.record_operator, 
                                                                                                            this.state.record_gift, 
                                                                                                            this.state.record_detail, 
                                                                                                            this.state.record_id)}>
                        <select name = "userOrRecord" onChange = {this.handleInputChange}>
                            <option>用户</option>
                            <option>保养记录</option>
                        </select>
                        <h3>创建新保养记录（若有新用户请先创建用户后再创建保养记录）</h3>
                        <input className = "newrecord-input" type = "date" name = "record_time" placeholder = "日期" onChange = {this.handleInputChange}/>
                        <input className = "newrecord-input" type = "text" name = "record_name" placeholder = "产品名称" onChange = {this.handleInputChange}/>
                        <input className = "newrecord-input" type = 'text' name = 'record_milage' placeholder = "表示里程" onChange = {this.handleInputChange}/>
                        <input className = "newrecord-input" type = 'text' name = 'record_operator' placeholder = "操作人" onChange = {this.handleInputChange}/>
                        <input className = "newrecord-input" type = "text" name = "record_gift" placeholder = "赠品情况" onChange = {this.handleInputChange}/>
                        <input className = "newrecord-input" type = "text" name = "record_detail" placeholder = "备注" onChange = {this.handleInputChange}/>
                        <input className = "newrecord-input" type = "text" name = "record_id" placeholder = "换油证号" onChange = {this.handleInputChange}/>
                        <button className = "newrecord-btn" type = "submit">创建保养记录</button>
                        <button className = "newrecord-btn" type = "reset">清空输入框</button>
                    </form>
                    :
                    <form className = "create-form" onSubmit = {(e) => this.props.handleNewUserSubmit(e, this.state.service_num,
                                                                                                            this.state.make,
                                                                                                            this.state.plate,
                                                                                                            this.state.driver_name,
                                                                                                            this.state.phone_num)}>
                        <select name = "userOrRecord" onChange = {this.handleInputChange}>
                            <option>用户</option>
                            <option>保养记录</option>
                        </select>
                        <h3>创建新用户（若有新用户请先创建用户再创建保养记录）</h3>
                        <input className = "newrecord-input" type = "text" name = "service_num" placeholder = "换油证号（唯一）" onChange = {this.handleInputChange}/>
                        <input className = "newrecord-input" type = "text" name = "make" placeholder = "车型" onChange = {this.handleInputChange}/>
                        <input className = "newrecord-input" type = 'text' name = 'plate' placeholder = "车牌号" onChange = {this.handleInputChange}/>
                        <input className = "newrecord-input" type = 'text' name = 'driver_name' placeholder = "车主姓名" onChange = {this.handleInputChange}/>
                        <input className = "newrecord-input" type = "text" name = "phone_num" placeholder = "联系方式" onChange = {this.handleInputChange}/>
                        <button className = "newrecord-btn" type = "submit">创建新用户</button>
                        <button className = "newrecord-btn" type = "reset">清空输入框</button>
                    </form>
                    :
                    <div className = "login-box">
                        <h3>请以管理员身份登录</h3> 
                        <form className = "login-form" onSubmit = {(e) => this.handleLogIn(e, this.state.inputAdmin, this.state.inputPass)}>
                            <input className = "login-input" type = "text" name = "inputAdmin" placeholder = "管理员" onChange = {this.handleInputChange}/>
                            <input className = "login-input" type = "password" name = "inputPass" placeholder = "密码" onChange = {this.handleInputChange}/>
                            <button className = "login-btn" type = "submit">登录</button>
                        </form>
                    </div>
                    :
                    <div className = "login-box">
                        <h3>请以管理员身份登录</h3> 
                        <form className = "login-form" onSubmit = {(e) => this.handleLogIn(e, this.state.inputAdmin, this.state.inputPass)}>
                            <input className = "login-input" type = "text" name = "inputAdmin" placeholder = "管理员" onChange = {this.handleInputChange}/>
                            <input className = "login-input" type = "password" name = "inputPass" placeholder = "密码" onChange = {this.handleInputChange}/>
                            <button className = "login-btn" type = "submit">登录</button>
                        </form>
                    </div>
                }
                <Link to = "/"><button>返回首页</button></Link>
                
            </div>
        )
    }
}

export default NewRecord;