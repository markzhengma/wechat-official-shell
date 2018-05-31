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
            admin: '',
            pass: '',
            inputAdmin: '',
            inputPass: '',
        }
    }

    componentDidMount(){
        this.props.resetRedirect();
        this.props.resetCreateCompleted();
    }

    handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value,
        });
    }

    handleLogIn = (e) => {
        this.setState({
            admin: this.state.inputAdmin,
            pass: this.state.inputPass,
        })
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
                {this.state.admin == "ShellHulunbuir" ? 
                    this.state.pass == "Cheers!" ?
                    <form className = "create-form" onSubmit = {(e) => this.props.handleNewRecordSubmit(e, this.state.record_time, 
                                                                                                            this.state.record_name, 
                                                                                                            this.state.record_milage, 
                                                                                                            this.state.record_operator, 
                                                                                                            this.state.record_gift, 
                                                                                                            this.state.record_detail, 
                                                                                                            this.state.record_id)}>
                        <h3>创建新保养记录</h3>
                        <input className = "newrecord-input" type = "date" name = "record_time" placeholder = "日期" onChange = {this.handleInputChange}/>
                        <input className = "newrecord-input" type = "text" name = "record_name" placeholder = "产品名称" onChange = {this.handleInputChange}/>
                        <input className = "newrecord-input" type = 'number' name = 'record_milage' placeholder = "表示里程" onChange = {this.handleInputChange}/>
                        <input className = "newrecord-input" type = 'text' name = 'record_operator' placeholder = "操作人" onChange = {this.handleInputChange}/>
                        <input className = "newrecord-input" type = "text" name = "record_gift" placeholder = "赠品情况" onChange = {this.handleInputChange}/>
                        <input className = "newrecord-input" type = "text" name = "record_detail" placeholder = "备注" onChange = {this.handleInputChange}/>
                        <input className = "newrecord-input" type = "text" name = "record_id" placeholder = "换油证号" onChange = {this.handleInputChange}/>
                        <button className = "newrecord-btn" type = "submit">创建保养记录</button>
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
                <Link to = "/">返回首页</Link>
                
            </div>
        )
    }
}

export default NewRecord;