import React, { Component } from 'react';
import {
    Link,
    Redirect,
} from 'react-router-dom';
import CreateRecord from './CreateRecord';
import BrowseAndExport from './BrowseAndExport';

class AdminPage extends Component {
    constructor(){
        super();
        this.state = {
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
            selectRecordId: '',
            selectUserId: '',
            updateMake: '',
            updatePlate: '',
            updateDriverName: '',
            updatePhone: '',
            updateDate: '',
            updateRecordName: '',
            updateMilage: '',
            updateOperator: '',
            updateGift: '',
            updateDetail: '',
            isUserUpdating: false,
            isRecordUpdating: false,
            manager_selection: '产品名称',
            isNameListUpdating: false,
            isOpListUpdating: false,
            isGiftListUpdating: false,
            selectNameListId: '',
            updateNameList: '',
            updateType: '',
            newNameInput: '',
            newTypeInput: '',
            selectOpListId: '',
            updateOpList: '',
            updateLocation: '',
            newOpInput: '',
            newLocationInput: '',
            selectGiftListId: '',
            updateGiftList: '',
            newGiftInput: '',
        }
    }
    componentDidMount(){
        this.props.resetRedirect();
        this.props.resetCreateCompleted();
        this.props.resetRecordData();
        if(this.props.location === "海拉尔河东门店"){
            this.props.getNewHD();
        }
        if(this.props.location === "海拉尔河西门店"){
            this.props.getNewH();
        }
        if(this.props.location === "满洲里老店"){
            this.props.getNewM();
        }
        if(this.props.location === "满洲里新店"){
            this.props.getNewM8();
        }
        if(this.props.location === "牙克石门店"){
            this.props.getNewY();
        }
        this.props.getServiceNameList();
        this.props.getOpList();
        this.props.getGiftList();
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
        if(this.state.service_num && this.state.make && this.state.plate && this.state.driver_name && this.state.phone_num){
            this.setState({
                service_num: '',
                make: '',
                plate: '',
                driver_name: '',
                phone_num: '',
                admin_selection: "查找老客户",
            });
        }
    }
    switchInputNew = () => {
        this.setState({
            isInputNew: !this.state.isInputNew,
        })
    }
    selectUserUpdate = (id, make, plate, name, phone) => {
        this.setState({
            isUserUpdating: true,
            selectUserId: id,
            updateMake: make,
            updatePlate: plate,
            updateDriverName: name,
            updatePhone: phone,
        })
    }
    completeUserUpdate = (e, updateMake, updatePlate, updateDriverName, updatePhone, selectUserId) => {
        this.props.updateUser(e, updateMake, updatePlate, updateDriverName, updatePhone, selectUserId);
        if(this.state.updateMake && this.state.updatePlate && this.state.updateDriverName && this.state.updatePhone){
            this.setState({
                selectUserId: '',
                updateMake: '',
                updatePlate: '',
                updateDriverName: '',
                updatePhone: '',
                isUserUpdating: false,
            })
        }
    }
    selectRecordUpdate = (id, record_time, record_name, record_milage, record_operator, record_gift, record_detail) => {
        this.setState({
            isRecordUpdating: true,
            selectRecordId: id,
            updateDate: record_time,
            updateRecordName: record_name,
            updateMilage: record_milage,
            updateOperator: record_operator,
            updateGift: record_gift,
            updateDetail: record_detail,
        })
    }
    completeRecordUpdate = (e, updateDate, updateRecordName, updateMilage, updateOperator, updateGift, updateDetail, selectRecordId) => {
        this.props.updateRecord(e, updateDate, updateRecordName, updateMilage, updateOperator, updateGift, updateDetail, selectRecordId);
        if(this.state.updateDate && this.state.updateRecordName && this.state.updateMilage && this.state.updateOperator && this.state.updateGift && this.state.updateDetail){
            this.setState({
                selectRecordId: '',
                updateDate: '',
                updateRecordName: '',
                updateMilage: '',
                updateOperator: '',
                updateGift: '',
                updateDetail: '',
                isRecordUpdating: false,
            })
        }
    }

    selectNameListUpdate = (id, record_name, type) => {
        this.setState({
            isNameListUpdating: true,
            selectNameListId: id,
            updateNameList: record_name,
            updateType: type,
        })
    }
    completeNameListUpdate = (e, record_name, type, id) => {
        this.props.updateServiceNameList(e, record_name, type, id);
        if(this.state.updateNameList && this.state.updateType){
            this.setState({
                isNameListUpdating: false,
                selectNameListId: '',
                updateNameList: '',
                updateType: '',
            })
        }
    }
    completeNameListAdd = (e, record_name, type) => {
        this.props.addServiceNameList(e, record_name, type);
        if(this.state.newNameInput && this.state.newTypeInput){
            this.setState({
                newNameInput: '',
                newTypeInput: '',
            })
        }
    }
    selectOpListUpdate = (id, record_operator, location) => {
        this.setState({
            isOpListUpdating: true,
            selectOpListId: id,
            updateOpList: record_operator,
            updateLocation: location,
        })
    }
    completeOpListUpdate = (e, record_operator, location, id) => {
        this.props.updateOpList(e, record_operator, location, id);
        if(this.state.updateOpList && this.state.updateLocation){
            this.setState({
                isOpListUpdating: false,
                selectOpListId: '',
                updateOpList: '',
                updateLocation: '',
            })
        }
    }
    completeOpListAdd = (e, record_operator, location) => {
        this.props.addOpList(e, record_operator, location);
        if(this.state.newOpInput && this.state.newLocationInput){
            this.setState({
                newOpInput: '',
                newLocationInput: '',
            })
        }
    }
    selectGiftListUpdate = (id, record_gift) => {
        this.setState({
            isGiftListUpdating: true,
            selectGiftListId: id,
            updateGiftList: record_gift,
        })
    }
    completeGiftListUpdate = (e, record_gift, id) => {
        this.props.updateGiftList(e, record_gift, id);
        if(this.state.updateGiftList){
            this.setState({
                isGiftListUpdating: false,
                selectGiftListId: '',
                updateGiftList: '',
            })
        }
    }
    completeGiftListAdd = (e, record_gift) => {
        this.props.addGiftList(e, record_gift);
        if(this.state.newGiftInput){
            this.setState({
                newGiftInput: '',
            })
        }
    }
    render(){
        if(this.props.fireRedirect === true){
            return <Redirect to = {this.props.redirect}/>
        }
        if(!this.props.auth){
            return <Redirect to = '/login'/>
        }
        return (
            <div className = "admin-page">
                <h3>管理员登录：{this.props.location}</h3> 
                <div>
                    {this.props.location === "总管理员" ?
                        <select name = "admin_selection" className = "admin-select" onChange = {this.props.handleInputChange} value = {this.props.admin_selection}>
                            <option>查找老客户</option>
                            <option>管理基本信息</option>
                            <option>浏览和下载记录</option>
                        </select>
                        :
                        <select name = "admin_selection" className = "admin-select" onChange = {this.props.handleInputChange} value = {this.props.admin_selection}>
                            <option>查找老客户</option>
                            <option>创建新客户</option>
                        </select>}
                </div>
                <div className = "admin-box">
                    {this.props.admin_selection === "查找老客户" ?
                        <select name = "search_selection" className = "admin-select" onChange = {this.handleInputChange} value = {this.state.search_selection}>
                            <option>使用换油证号查找</option>
                            <option>使用手机号查找</option>
                            <option>使用车牌号查找</option>
                        </select>
                    : ""}
                    {this.props.admin_selection === "查找老客户" ?
                        this.state.search_selection === "使用换油证号查找" ?
                        <form className = "search-form" onSubmit ={(e) => this.props.getRecordByService(e, this.state.search_service)}>
                            <input name = "search_service" placeholder = "请输入换油证号" onChange = {this.handleInputChange}/>
                            <button className = "admin-page-btn" type = "submit">查找</button>
                        </form>
                        : ""
                    : ""}
                    {this.props.admin_selection === "查找老客户" ?
                        this.state.search_selection === "使用手机号查找" ?
                        <form className = "search-form" onSubmit ={(e) => this.props.getRecordByPhone(e, this.state.search_phone)}>
                            <input name = "search_phone" placeholder = "请输入手机号" onChange = {this.handleInputChange}/>
                            <button className = "admin-page-btn" type = "submit">查找</button>
                        </form>
                        : ""
                    : ""}
                    {this.props.admin_selection === "查找老客户" ?
                        this.state.search_selection === "使用车主姓名查找" ?
                        <form className = "search-form" onSubmit ={(e) => this.props.getRecordByName(e, this.state.search_name)}>
                            <input name = "search_name" placeholder = "请输入车主姓名" onChange = {this.handleInputChange}/>
                            <button className = "admin-page-btn" type = "submit">查找</button>
                        </form>
                        : ""
                    : ""}
                    {this.props.admin_selection === "查找老客户" ?
                        this.state.search_selection === "使用车牌号查找" ?
                        <form className = "search-form" onSubmit ={(e) => this.props.getRecordByPlate(e, this.state.search_plate)}>
                            <input name = "search_plate" placeholder = "请输入车牌号" onChange = {this.handleInputChange}/>
                            <button className = "admin-page-btn" type = "submit">查找</button>
                        </form>
                        : ""
                    : ""}
                    {this.props.admin_selection === "查找老客户" && this.props.userList ? 
                        <div className = "table-container">
                            <h5>找到多于一条记录，请点击选择要浏览或编辑的客户记录</h5>
                            <div className = "user-list-table">
                                <div className = "user-list-head">
                                    <div className = "user-list-head-single">换油证号</div>
                                    <div className = "user-list-head-single">车型</div>
                                    <div className = "user-list-head-single">车牌号码</div>
                                    <div className = "user-list-head-single">车主姓名</div>
                                    <div className = "user-list-head-single">联系方式</div>
                                </div>
                                {this.props.userList.map(user => {
                                    return(
                                        <div className = "user-list-detail" key = {this.props.userList.indexOf(user)} onClick = {() => this.props.selectFromUserList(this.props.userList.indexOf(user), user.service_num)}>
                                            <div className = "user-list-detail-single">{user.service_num ? user.service_num : "无记录"}</div>
                                            <div className = "user-list-detail-single">{user.make ? user.make : "无记录"}</div>
                                            <div className = "user-list-detail-single">{user.plate ? user.plate : "无记录"}</div>
                                            <div className = "user-list-detail-single">{user.driver_name ? user.driver_name : "无记录"}</div>
                                            <div className = "user-list-detail-single">{user.phone_num ? user.phone_num : "无记录"}</div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    : ""}
                    {this.props.userData ? 
                        this.props.admin_selection === "查找老客户" ?
                                <div className = "table-container">
                                    <div className = "record-table-admin">
                                        <div className = "record-table-head-admin">
                                            <div className = "record-table-head-single-admin">换油证号</div>
                                            <div className = "record-table-head-single-admin">车型</div>
                                            <div className = "record-table-head-single-admin">车牌号码</div>
                                            <div className = "record-table-head-single-admin">车主姓名</div>
                                            <div className = "record-table-head-single-admin">联系方式</div>
                                            <div className = "record-table-head-single-admin"/>
                                            <div className = "record-table-head-single-admin">编辑</div>
                                        </div>
                                        {this.state.selectUserId !== this.props.userData.id ?
                                            <div className = "record-single-admin">
                                                <div className = "record-single-detail-admin">{this.props.userData.service_num ? this.props.userData.service_num : "无记录"}</div>
                                                <div className = "record-single-detail-admin">{this.props.userData.make ? this.props.userData.make : "无记录"}</div>
                                                <div className = "record-single-detail-admin">{this.props.userData.plate ? this.props.userData.plate : "无记录"}</div>
                                                <div className = "record-single-detail-admin">{this.props.userData.driver_name ? this.props.userData.driver_name : "无记录"}</div>
                                                <div className = "record-single-detail-admin">{this.props.userData.phone_num ? this.props.userData.phone_num : "无记录"}</div>
                                                <div className = "record-single-detail-admin"/>
                                                {!this.state.isUserUpdating ? 
                                                    <div className = "record-single-detail-admin">
                                                        <button className = "admin-edit-btn" onClick = {() => this.selectUserUpdate(this.props.userData.id,
                                                                                                                                        this.props.userData.make,
                                                                                                                                        this.props.userData.plate,
                                                                                                                                        this.props.userData.driver_name,
                                                                                                                                        this.props.userData.phone_num,
                                                                                                                                    )}/>
                                                        {this.props.recordData === null || this.props.recordData.length < 1 ?
                                                            <button className = "admin-delete-btn" onClick = {() => this.props.deleteUser(this.props.userData.id)}/>
                                                        : ""}
                                                    </div>
                                                : ""}
                                            </div>
                                        : 
                                            <form onSubmit = {(e) => this.completeUserUpdate(e, this.state.updateMake,
                                                                                                this.state.updatePlate,
                                                                                                this.state.updateDriverName,
                                                                                                this.state.updatePhone,
                                                                                                this.state.selectUserId
                                                                                            )}>
                                                <div className = "record-single-admin">
                                                    <div className = "record-single-detail-admin">{this.props.userData.service_num ? this.props.userData.service_num : "无记录"}</div>
                                                    <input className = "record-single-detail-admin-edit" name = "updateMake" defaultValue = {this.state.updateMake} onChange = {this.handleInputChange}/>
                                                    <input className = "record-single-detail-admin-edit" name = "updatePlate" defaultValue = {this.state.updatePlate} onChange = {this.handleInputChange}/>
                                                    <input className = "record-single-detail-admin-edit" name = "updateDriverName" defaultValue = {this.state.updateDriverName} onChange = {this.handleInputChange}/>
                                                    <input className = "record-single-detail-admin-edit" name = "updatePhone" defaultValue = {this.state.updatePhone} onChange = {this.handleInputChange}/>
                                                    <div className = "record-single-detail-admin"/>
                                                    <div className = "record-single-detail-admin"><button className = "form-btn" type = "submit">确定</button></div>
                                                </div>
                                            </form>
                                        }
                                    </div>
                                </div>
                        : ""
                    : ""}
                    {this.props.recordData != null && this.props.recordData.length >= 1 ? 
                        this.props.admin_selection === "查找老客户" ?
                        <div className = "table-container">
                            <div className = "record-table-admin">
                                <div className = "record-table-head-admin">
                                    <div className = "record-table-head-single-admin">日期</div>
                                    <div className = "record-table-head-single-admin">产品<br/>名称</div>
                                    <div className = "record-table-head-single-admin">表示<br/>里程</div>
                                    <div className = "record-table-head-single-admin">操作人</div>
                                    <div className = "record-table-head-single-admin">赠品<br/>情况</div>
                                    <div className = "record-table-head-single-admin">备注</div>
                                    <div className = "record-table-head-single-admin">编辑</div>
                                </div>
                                {this.props.admin_selection === "查找老客户" && this.props.userData != null ?
                                    this.state.isInputNew ? 
                                        <CreateRecord 
                                            service_num = {this.props.userData.service_num}
                                            handleNewRecordSubmit = {this.props.handleNewRecordSubmit}
                                            getRecordByService = {this.props.getRecordByService}
                                            switchInputNew = {this.switchInputNew}
                                            service_name_list = {this.props.service_name_list}
                                            operator_list = {this.props.operator_list}
                                            gift_list = {this.props.gift_list}
                                        />
                                    : 
                                    <div className = "create-record-btn-group">
                                        <button id = "add-btn" onClick = {this.switchInputNew}/>
                                        <div>添加保养记录</div>
                                    </div>
                                : ""}
                                {this.props.recordData.map(record => {
                                    var date = new Date(record.record_time);
                                    var month = '' + (date.getMonth() + 1);
                                    if(month.length < 2){
                                        month = '0' + month;
                                    }
                                    var day = '' + date.getDate();
                                    if(day.length < 2){
                                        day = '0' + day;
                                    }
                                    var year = date.getFullYear();
                                    var formattedDate = [year, month, day].join('-');
                                    return (
                                        <div key = {record.id}>
                                            {this.state.selectRecordId !== record.id ?
                                                <div className = "record-single-admin" style = {this.props.recordData.indexOf(record) % 2 === 0 ? {backgroundColor: 'white'} : {backgroundColor: '#faefc9'}}>
                                                    <div className = "record-single-detail-admin">{formattedDate}</div>
                                                    <div className = "record-single-detail-admin">{record.record_name}</div>
                                                    <div className = "record-single-detail-admin">{record.record_milage}</div>
                                                    <div className = "record-single-detail-admin">{record.record_operator}</div>
                                                    <div className = "record-single-detail-admin">{record.record_gift}</div>
                                                    <div className = "record-single-detail-admin">{record.record_detail}</div>
                                                    {!this.state.isRecordUpdating ? 
                                                        <div className = "record-single-detail-admin">
                                                            <button className = "admin-edit-btn" onClick = {() => this.selectRecordUpdate(record.id,
                                                                                                                                        formattedDate,
                                                                                                                                        record.record_name,
                                                                                                                                        record.record_milage,
                                                                                                                                        record.record_operator,
                                                                                                                                        record.record_gift,
                                                                                                                                        record.record_detail,
                                                                                                                                    )}/>
                                                            <button className = "admin-delete-btn" onClick = {(e) => this.props.deleteRecord(e, record.id)}/>
                                                        </div>
                                                    : ""}
                                                </div>
                                                :
                                                <form onSubmit = {(e) => this.completeRecordUpdate(e, this.state.updateDate, 
                                                                                                    this.state.updateRecordName, 
                                                                                                    this.state.updateMilage, 
                                                                                                    this.state.updateOperator, 
                                                                                                    this.state.updateGift, 
                                                                                                    this.state.updateDetail, 
                                                                                                    this.state.selectRecordId
                                                                                                    )}>
                                                    <div className = "record-single-admin" style = {this.props.recordData.indexOf(record) % 2 === 0 ? {backgroundColor: 'white'} : {backgroundColor: '#faefc9'}}>
                                                        <input className = "record-single-detail-admin-edit" name = "updateDate" type = "date" defaultValue = {this.state.updateDate} onChange = {this.handleInputChange}/>
                                                        <select className = "record-single-detail-admin-edit" name = "updateRecordName" defaultValue = {this.state.updateRecordName} onChange = {this.handleInputChange}>
                                                            <option value = "">-产品名称-</option>
                                                            <option value = "">**汽机油**</option>
                                                            {this.props.service_name_list.map(service => {
                                                                if (service.type === '汽机油')
                                                                return <option key = {service.id}>{service.record_name}</option>;
                                                                else
                                                                return "";
                                                            })}
                                                            <option value = "">**柴机油**</option>
                                                            {this.props.service_name_list.map(service => {
                                                                if (service.type === '柴机油')
                                                                return <option key = {service.id}>{service.record_name}</option>;
                                                                else
                                                                return "";
                                                            })}
                                                            <option value = "">**附属品**</option>
                                                            {this.props.service_name_list.map(service => {
                                                                if (service.type === '附属品')
                                                                return <option key = {service.id}>{service.record_name}</option>;
                                                                else
                                                                return "";
                                                            })}
                                                            <option value = "">**中华产品**</option>
                                                            {this.props.service_name_list.map(service => {
                                                                if (service.type === '中华产品')
                                                                return <option key = {service.id}>{service.record_name}</option>;
                                                                else
                                                                return "";
                                                            })}
                                                        </select>
                                                        <input className = "record-single-detail-admin-edit" name = "updateMilage" defaultValue = {this.state.updateMilage} onChange = {this.handleInputChange}/>
                                                        <select className = "record-single-detail-admin-edit" name = "updateOperator" defaultValue = {this.state.updateOperator} onChange = {this.handleInputChange}>
                                                            <option value = "">-操作人-</option>
                                                            {this.props.operator_list.map(operator => {
                                                                if (operator.location === '其他')
                                                                return <option key = {operator.id}>{operator.record_operator}</option>;
                                                                else
                                                                return "";
                                                            })}
                                                            <option value = "">**海拉尔**</option>
                                                            {this.props.operator_list.map(operator => {
                                                                if (operator.location === '海拉尔')
                                                                return <option key = {operator.id}>{operator.record_operator}</option>;
                                                                else
                                                                return "";
                                                            })}
                                                            <option value = "">**满洲里**</option>
                                                            {this.props.operator_list.map(operator => {
                                                                if (operator.location === '满洲里')
                                                                return <option key = {operator.id}>{operator.record_operator}</option>;
                                                                else
                                                                return "";
                                                            })}
                                                            <option value = "">**牙克石**</option>
                                                            {this.props.operator_list.map(operator => {
                                                                if (operator.location === '牙克石')
                                                                return <option key = {operator.id}>{operator.record_operator}</option>;
                                                                else
                                                                return "";
                                                            })}
                                                        </select>
                                                        <select className = "record-single-detail-admin-edit" name = "updateGift" defaultValue = {this.state.updateGift} onChange = {this.handleInputChange}>
                                                            <option value = "">-赠品情况-</option>
                                                            {this.props.gift_list.map(gift => {
                                                                return <option key = {gift.id}>{gift.record_gift}</option>
                                                            })}
                                                        </select>
                                                        <input className = "record-single-detail-admin-edit" name = "updateDetail" defaultValue = {this.state.updateDetail} onChange = {this.handleInputChange}/>
                                                        <div className = "record-single-detail-admin"><button className = "form-btn" type = "submit">确定</button></div>
                                                    </div>
                                                </form>
                                            }
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        :""
                    : ""}
                    
                    {this.props.admin_selection === "创建新客户" ?
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
                            <button className = "admin-page-btn" type = "submit">创建新客户</button>
                        </form>
                    : ""}
                    {this.props.admin_selection === "管理基本信息" ?
                        <div>
                            <select name = "manager_selection" className = "admin-select" onChange = {this.handleInputChange}>
                                <option>产品名称</option>
                                <option>操作人</option>
                                <option>赠品情况</option>
                            </select>
                            {this.state.manager_selection === "产品名称" ?
                                <div className = "manager_table">
                                    <div className = "manager_table_head">
                                        <div className = "manager_table_head_single">产品名称</div>
                                        <div className = "manager_table_head_single">分类</div>
                                        <div className = "manager_table_head_single">编辑</div>
                                    </div>
                                    {this.props.service_name_list.map(service_name => {
                                        return(
                                                <div key = {service_name.id}>
                                                    {this.state.selectNameListId !== service_name.id ?
                                                        <div className = "manager_table_single">
                                                            <div className = "manager_table_single_detail">{service_name.record_name}</div>
                                                            <div className = "manager_table_single_detail">{service_name.type}</div>
                                                            {!this.state.isNameListUpdating ? 
                                                                <div className = "manager_table_single_detail">
                                                                    <button className = "admin-edit-btn" onClick = {() => this.selectNameListUpdate(service_name.id, service_name.record_name, service_name.type)}/>
                                                                    <button className = "admin-delete-btn" onClick = {() => this.props.deleteServiceNameList(service_name.record_name, service_name.id)}/>
                                                                </div>
                                                            : ""}
                                                        </div>
                                                    : 
                                                        <form className = "manager_table_single" 
                                                                onSubmit = {(e) => this.completeNameListUpdate(e, this.state.updateNameList, this.state.updateType, this.state.selectNameListId)}
                                                            >
                                                            <div className = "manager_table_single_detail"><input defaultValue = {service_name.record_name} name = "updateNameList" onChange = {this.handleInputChange}/></div>
                                                            <div className = "manager_table_single_detail"><input defaultValue = {service_name.type} name = "updateType" onChange = {this.handleInputChange}/></div>
                                                            <div className = "manager_table_single_detail"><button className = "form-btn" type = "submit">确定</button></div>
                                                        </form>
                                                    }
                                                </div>
                                            )
                                    })}
                                    {this.state.isInputNew ? 
                                        <form className = "create-name-form" onSubmit = {(e) => this.completeNameListAdd(e, this.state.newNameInput, this.state.newTypeInput)}>
                                            <div className = "create-name-group">
                                                <input name = "newNameInput" className = "create-name-input" placeholder = "产品名称" value = {this.state.newNameInput} onChange = {this.handleInputChange}/>
                                                <input name = "newTypeInput" className = "create-name-input" placeholder = "分类" value = {this.state.newTypeInput} onChange = {this.handleInputChange}/>
                                                <div className = "create-name-input"><button className = "form-btn" type = "submit">提交</button></div>
                                            </div>
                                            <div className = "create-record-btn-group">
                                                <button id = "delete-btn" onClick = {this.switchInputNew}/>
                                            </div>
                                        </form>
                                    : 
                                    <div className = "create-record-btn-group">
                                        <button id = "add-btn" onClick = {this.switchInputNew}/>
                                        <div>添加产品</div>
                                    </div>}
                                </div>
                            : ""}
                            {this.state.manager_selection === "操作人" ?
                                <div className = "manager_table">
                                    <div className = "manager_table_head">
                                        <div className = "manager_table_head_single">操作人</div>
                                        <div className = "manager_table_head_single">门店地区</div>
                                        <div className = "manager_table_head_single">编辑</div>
                                    </div>
                                    {this.props.operator_list.map(operator => {
                                        return(
                                                <div key = {operator.id}>
                                                    {this.state.selectOpListId !== operator.id ?
                                                        <div className = "manager_table_single">
                                                            <div className = "manager_table_single_detail">{operator.record_operator}</div>
                                                            <div className = "manager_table_single_detail">{operator.location}</div>
                                                            {!this.state.isOpListUpdating ? 
                                                                <div className = "manager_table_single_detail">
                                                                    <button className = "admin-edit-btn" onClick = {() => this.selectOpListUpdate(operator.id, operator.record_operator, operator.location)}/>
                                                                    <button className = "admin-delete-btn" onClick = {() => this.props.deleteOpList(operator.record_operator, operator.id)}/>
                                                                </div>
                                                            : ""}
                                                        </div>
                                                    : 
                                                        <form className = "manager_table_single" 
                                                                onSubmit = {(e) => this.completeOpListUpdate(e, this.state.updateOpList, this.state.updateLocation, this.state.selectOpListId)}
                                                            >
                                                            <div className = "manager_table_single_detail"><input defaultValue = {operator.record_operator} name = "updateOpList" onChange = {this.handleInputChange}/></div>
                                                            <div className = "manager_table_single_detail"><input defaultValue = {operator.location} name = "updateLocation" onChange = {this.handleInputChange}/></div>
                                                            <div className = "manager_table_single_detail"><button className = "form-btn" type = "submit">确定</button></div>
                                                        </form>
                                                    }
                                                </div>
                                            )
                                    })}
                                    {this.state.isInputNew ? 
                                        <form className = "create-name-form" onSubmit = {(e) => this.completeOpListAdd(e, this.state.newOpInput, this.state.newLocationInput)}>
                                            <div className = "create-name-group">
                                                <input name = "newOpInput" className = "create-name-input" placeholder = "操作人" value = {this.state.newOpInput} onChange = {this.handleInputChange}/>
                                                <input name = "newLocationInput" className = "create-name-input" placeholder = "门店地区" value = {this.state.newLocationInput} onChange = {this.handleInputChange}/>
                                                <div className = "create-name-input"><button className = "form-btn" type = "submit">提交</button></div>
                                            </div>
                                            <div className = "create-record-btn-group">
                                                <button id = "delete-btn" onClick = {this.switchInputNew}/>
                                            </div>
                                        </form>
                                    : 
                                    <div className = "create-record-btn-group">
                                        <button id = "add-btn" onClick = {this.switchInputNew}/>
                                        <div>添加操作人</div>
                                    </div>}
                                </div>
                            : ""}
                            {this.state.manager_selection === "赠品情况" ?
                                <div className = "manager_table">
                                    <div className = "manager_table_head">
                                        <div className = "manager_table_head_spacer"/>
                                        <div className = "manager_table_head_single">赠品名称</div>
                                        <div className = "manager_table_head_single">编辑</div>
                                    </div>
                                    {this.props.gift_list.map(gift => {
                                        return(
                                                <div key = {gift.id}>
                                                    {this.state.selectGiftListId !== gift.id ?
                                                        <div className = "manager_table_single">
                                                            <div className = "manager_table_single_spacer"/>
                                                            <div className = "manager_table_single_detail">{gift.record_gift}</div>
                                                            {!this.state.isGiftListUpdating ? 
                                                                <div className = "manager_table_single_detail">
                                                                    <button className = "admin-edit-btn" onClick = {() => this.selectGiftListUpdate(gift.id, gift.record_gift)}/>
                                                                    <button className = "admin-delete-btn" onClick = {() => this.props.deleteGiftList(gift.record_gift, gift.id)}/>
                                                                </div>
                                                            : ""}
                                                        </div>
                                                    : 
                                                        <form className = "manager_table_single" 
                                                                onSubmit = {(e) => this.completeGiftListUpdate(e, this.state.updateGiftList, this.state.selectGiftListId)}
                                                            >
                                                            <div className = "manager_table_single_spacer"/>
                                                            <div className = "manager_table_single_detail"><input defaultValue = {gift.record_gift} name = "updateGiftList" onChange = {this.handleInputChange}/></div>
                                                            <div className = "manager_table_single_detail"><button className = "form-btn" type = "submit">确定</button></div>
                                                        </form>
                                                    }
                                                </div>
                                            )
                                    })}
                                    {this.state.isInputNew ? 
                                        <form className = "create-name-form" onSubmit = {(e) => this.completeGiftListAdd(e, this.state.newGiftInput)}>
                                            <div className = "create-name-group">
                                                <div className = "create-name-input-spacer"/>
                                                <input name = "newGiftInput" className = "create-name-input" placeholder = "赠品名称" value = {this.state.newGiftInput} onChange = {this.handleInputChange}/>
                                                <div  id = "new-gift-input" className = "create-name-input"><button className = "form-btn" type = "submit">提交</button></div>
                                            </div>
                                            <div className = "create-record-btn-group">
                                                <button id = "delete-btn" onClick = {this.switchInputNew}/>
                                            </div>
                                        </form>
                                    : 
                                    <div className = "create-record-btn-group">
                                        <button id = "add-btn" onClick = {this.switchInputNew}/>
                                        <div>添加赠品</div>
                                    </div>}
                                </div>
                            : ""}
                        </div>
                    : ""}
                    {this.props.admin_selection === "浏览和下载记录" ?
                        <BrowseAndExport 
                        />
                    : ""}
                    {this.props.admin_selection === "创建换油记录" ?
                        <form>
                            <input name = "search_service" placeholder = "换油证号"/>
                        </form>
                    : ""}
                </div>
                <div className = "admin-btn-list">
                    <button className = "admin-page-btn" onClick = {this.logOut}>返回登录</button>
                    <Link to = "/"><button className = "admin-page-btn">返回首页</button></Link>
                </div>
            </div>
        )
    }
}

export default AdminPage;