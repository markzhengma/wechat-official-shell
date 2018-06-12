import React, { Component } from 'react';
import {
    Link,
    Redirect,
} from 'react-router-dom';
import CreateRecord from './CreateRecord';

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
            search_name: '',
            search_phone: '',
            search_plate: '',
            search_service: '',
            isInputNew: false,
        }
    }
    componentDidMount(){
        this.props.resetRedirect();
        this.props.resetCreateCompleted();
        this.props.resetRecordData();
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
    }
    switchInputNew = () => {
        this.setState({
            isInputNew: !this.state.isInputNew,
        })
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
                    <select name = "admin_selection" onChange = {this.handleInputChange} value = {this.state.admin_selection}>
                        <option>查找老客户</option>
                        <option>创建新客户</option>
                        <option>创建换油记录</option>
                    </select>
                </div>
                <div className = "admin-box">
                    {this.state.admin_selection === "查找老客户" ?
                        <select name = "search_selection" onChange = {this.handleInputChange} value = {this.state.search_selection}>
                            <option>使用换油证号查找</option>
                            <option>使用手机号查找</option>
                            <option>使用车牌号查找</option>
                        </select>
                    : ""}
                    {this.state.admin_selection === "查找老客户" ?
                        this.state.search_selection === "使用换油证号查找" ?
                        <form onSubmit ={(e) => this.props.getRecordByService(e, this.state.search_service)}>
                            <input name = "search_service" placeholder = "请输入换油证号" onChange = {this.handleInputChange}/>
                            <button className = "newrecord-btn" type = "submit">查找</button>
                        </form>
                        : ""
                    : ""}
                    {this.state.admin_selection === "查找老客户" ?
                        this.state.search_selection === "使用手机号查找" ?
                        <form onSubmit ={(e) => this.props.getRecordByPhone(e, this.state.search_phone)}>
                            <input name = "search_phone" placeholder = "请输入手机号" onChange = {this.handleInputChange}/>
                            <button className = "newrecord-btn" type = "submit">查找</button>
                        </form>
                        : ""
                    : ""}
                    {this.state.admin_selection === "查找老客户" ?
                        this.state.search_selection === "使用车主姓名查找" ?
                        <form onSubmit ={(e) => this.props.getRecordByName(e, this.state.search_name)}>
                            <input name = "search_name" placeholder = "请输入车主姓名" onChange = {this.handleInputChange}/>
                            <button className = "newrecord-btn" type = "submit">查找</button>
                        </form>
                        : ""
                    : ""}
                    {this.state.admin_selection === "查找老客户" ?
                        this.state.search_selection === "使用车牌号查找" ?
                        <form onSubmit ={(e) => this.props.getRecordByPlate(e, this.state.search_plate)}>
                            <input name = "search_plate" placeholder = "请输入车牌号" onChange = {this.handleInputChange}/>
                            <button className = "newrecord-btn" type = "submit">查找</button>
                        </form>
                        : ""
                    : ""}
                    {this.props.userData != null && this.props.userData.length >= 1 ? 
                    this.state.admin_selection === "查找老客户" ?
                        <div>
                            <div className = "record-table">
                                <div className = "record-table-head">
                                    <div className = "record-table-head-single">换油证号</div>
                                    <div className = "record-table-head-single">车型</div>
                                    <div className = "record-table-head-single">车牌号码</div>
                                    <div className = "record-table-head-single">车主姓名</div>
                                    <div className = "record-table-head-single">联系方式</div>
                                </div>
                                <div className = "record-single">
                                    <div className = "record-single-detail">{this.props.userData[0].service_num ? this.props.userData[0].service_num : "无记录"}</div>
                                    <div className = "record-single-detail">{this.props.userData[0].make ? this.props.userData[0].make : "无记录"}</div>
                                    <div className = "record-single-detail">{this.props.userData[0].plate ? this.props.userData[0].plate : "无记录"}</div>
                                    <div className = "record-single-detail">{this.props.userData[0].driver_name ? this.props.userData[0].driver_name : "无记录"}</div>
                                    <div className = "record-single-detail">{this.props.userData[0].phone_num ? this.props.userData[0].phone_num : "无记录"}</div>
                                </div>
                            </div>
                        </div>
                    : ""
                    : ""}
                    {this.props.recordData != null && this.props.recordData.length >= 1 ? 
                    this.state.admin_selection === "查找老客户" ?
                        <div className = "record-table">
                            <div className = "record-table-head">
                                <div className = "record-table-head-single">日期</div>
                                <div className = "record-table-head-single">产品<br/>名称</div>
                                <div className = "record-table-head-single">表示<br/>里程</div>
                                <div className = "record-table-head-single">操作人</div>
                                <div className = "record-table-head-single">赠品<br/>情况</div>
                                <div className = "record-table-head-single">备注</div>
                            </div>
                            {this.props.recordData.map(record => {
                                var date = new Date(record.record_time);
                                var month = ((date.getMonth() + 1) < 10) ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
                                return (
                                    <div className = "record-single" key = {this.props.recordData.indexOf(record)} style = {this.props.recordData.indexOf(record) % 2 == 0 ? {backgroundColor: 'white'} : {backgroundColor: '#faefc9'}}>
                                        <div className = "record-single-detail">{date.getFullYear()}年<br/>{month}月{date.getDate()}日</div>
                                        <div className = "record-single-detail">{record.record_name}</div>
                                        <div className = "record-single-detail">{record.record_milage}</div>
                                        <div className = "record-single-detail">{record.record_operator}</div>
                                        <div className = "record-single-detail">{record.record_gift}</div>
                                        <div className = "record-single-detail">{record.record_detail}</div>
                                    </div>
                                )
                            })}
                        </div>
                    :""
                    : ""}
                    {this.state.admin_selection === "查找老客户" && this.props.recordData != null ?
                        this.state.isInputNew ? 
                            <CreateRecord 
                                service_num = {this.props.userData[0].service_num}
                                handleNewRecordSubmit = {this.props.handleNewRecordSubmit}
                                getRecordByService = {this.props.getRecordByService}
                            />
                        :""
                    : ""}
                    {this.state.admin_selection === "查找老客户" && this.props.recordData != null ? 
                        this.state.isInputNew === false ?
                            <button className = "add-btn" onClick = {this.switchInputNew}>add</button>
                        :
                            <button className = "delete-btn" onClick = {this.switchInputNew}>delete</button>
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