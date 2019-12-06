import React, { Component } from 'react';
import axios from 'axios';
import { CSVLink } from 'react-csv';

class BrowseAndExport extends Component {
    constructor() {
        super();
        this.state = {
            start_date: '',
            end_date: '',
            location_char: '',
            user_location_char: '',
            dataToBeExported: null,
            userToBeExported: null,
            userToBeDisplayed: null,
            browse_selection: '',
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value,
        });
    }
    selectRecordBetweenDates = (e, start_date, end_date, location_char) => {
        e.preventDefault();
        if(!start_date){
            alert("请输入起始日期");
        }else if(!end_date){
            alert("请输入截止日期");
        }else if(Date.parse(start_date) >= Date.parse(end_date)){
            alert("请选择在截止日期之前的起始日期")
        }else{
            axios.get(`/record/browse/between-dates/${start_date}/${end_date}/${location_char}`)
            .then(res => {
                if(!res.data || res.data.length <= 1){
                    alert("未找到记录");
                }else{
                    console.log(res.data);
                    const formattedRecord = res.data.map(record =>{
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
                        return ({
                            id: record.id,
                            record_time: formattedDate,
                            record_name: record.record_name,
                            record_milage: record.record_milage,
                            record_operator: record.record_operator,
                            record_gift: record.record_gift,
                            record_detail: record.record_detail,
                            record_id: record.record_id,
                        })
                    });
                    this.setState({
                        dataToBeExported: formattedRecord,
                        start_date: '',
                        end_date: '',
                        location_char: '',
                    })
                }
            })
            .catch(err => {
                console.log(err);
            })
        }
    }
    findUserByLocation = (e, user_location_char) => {
        e.preventDefault();
        if(!user_location_char){
            alert("请选择门店")
        }else{
            axios.get(`/record/user-location/${user_location_char}`)
            .then(res => {
                if(!res.data || res.data.length <= 1){
                    alert("未找到记录");
                }else{
                    this.setState({
                        userToBeExported: res.data,
                        user_location_char: '',
                    })
                    console.log(this.state.userToBeDisplayed);
                }
            })
        }
    }
    render(){
        const recordHeaders = [
            {label: 'webid', key: 'id'},
            {label: 'date', key: 'record_time'},
            {label: 'product_name', key: 'record_name'},
            {label: 'milage', key: 'record_milage'},
            {label: 'operator', key: 'record_operator'},
            {label: 'gift', key: 'record_gift'},
            {label: 'detail', key: 'record_detail'},
            {label: 'record_num', key: 'record_id'}
        ];
        const userHeaders = [
            {label: 'id', key: 'id'},
            {label: 'record_num', key: 'service_num'},
            {label: 'make', key: 'make'},
            {label: 'plate', key: 'plate'},
            {label: 'user_name', key: 'driver_name'},
            {label: 'phone', key: 'phone_num'},
            {label: 'detail', key: 'detail'}
        ];

        const recordData = this.state.dataToBeExported;
        const userData = this.state.userToBeExported;
        return (
            <div className = "export-browse-page">
                <select className = "browse-input-select" name = "browse_selection" onChange = {this.handleInputChange}>
                    <option value = "">-浏览类型-</option>
                    <option value = "客户信息">客户信息</option>
                    <option value = "保养记录">保养记录</option>
                </select>
                {this.state.browse_selection === "客户信息" ?
                    <div className = "export-browse-box">
                        <form className = "browse-form" onSubmit = {(e) => this.findUserByLocation(e, this.state.user_location_char)}>
                            <select className = "browse-input-select" name = "user_location_char" onChange = {this.handleInputChange}>
                                <option value = "">-请选择门店地区-</option>
                                <option value = "H">海拉尔</option>
                                <option value = "M">满洲里</option>
                                <option value = "Y">牙克石</option>
                            </select>
                            <button className = "admin-page-btn" type = "submit">浏览</button>
                        </form>
                        {this.state.userToBeExported != null && this.state.userToBeExported.length >= 1 ? 
                            <div className = "browse-table">
                                <CSVLink data = {userData} headers = {userHeaders}><button className = "admin-page-btn">下载全部</button></CSVLink>
                                <h5>以下显示的是近十个该门店的新建用户</h5>
                                <div className = "browse-table-head">
                                    <div className = "record-table-head-single-admin">换油证号</div>
                                    <div className = "record-table-head-single-admin">车型</div>
                                    <div className = "record-table-head-single-admin">车牌号码</div>
                                    <div className = "record-table-head-single-admin">车主姓名</div>
                                    <div className = "record-table-head-single-admin">联系方式</div>
                                    <div className = "record-table-head-single-admin">备注</div>
                                </div>
                                {this.state.userToBeExported.map(user => {
                                    if(this.state.userToBeExported.indexOf(user) >= (this.state.userToBeExported.length - 11))
                                    return (
                                        <div className = "browse-single" key = {this.state.userToBeExported.indexOf(user)} style = {this.state.userToBeExported.indexOf(user) % 2 === 0 ? {backgroundColor: 'white'} : {backgroundColor: '#faefc9'}}>
                                            <div className = "browse-single-detail">{user.service_num}</div>
                                            <div className = "browse-single-detail">{user.make}</div>
                                            <div className = "browse-single-detail">{user.plate}</div>
                                            <div className = "browse-single-detail">{user.driver_name}</div>
                                            <div className = "browse-single-detail">{user.phone_num}</div>
                                            <div className = "browse-single-detail">{user.detail}</div>
                                        </div>
                                    );
                                    else
                                    return "";
                                })}
                            </div>
                        : ""}
                    </div>
                : ""}
                {this.state.browse_selection === "保养记录" ?
                    <div className = "export-browse-box">
                        <form className = "browse-form" onSubmit = {(e) => this.selectRecordBetweenDates(e, this.state.start_date, this.state.end_date, this.state.location_char)}>
                            <input className = "browse-input" name = "start_date" type = "date" placeholder = "请输入起始日期" value = {this.state.start_date} onChange = {this.handleInputChange}/>
                            <input className = "browse-input" name = "end_date" type = "date" placeholder = "请输入截止日期" value = {this.state.end_date} onChange = {this.handleInputChange}/>
                            <select className = "browse-input-select" name = "location_char" onChange = {this.handleInputChange}>
                                <option value = "">-请选择门店地区-</option>
                                <option value = "H">海拉尔</option>
                                <option value = "M">满洲里</option>
                                <option value = "Y">牙克石</option>
                            </select>
                            <button className = "admin-page-btn" type = "submit">浏览</button>
                        </form>
                        {this.state.dataToBeExported != null && this.state.dataToBeExported.length >= 1 ? 
                            <div className = "browse-table">
                                <CSVLink data = {recordData} headers = {recordHeaders}><button className = "admin-page-btn">下载</button></CSVLink>
                                <div className = "browse-table-head">
                                    <div className = "browse-table-head-single">日期</div>
                                    <div className = "browse-table-head-single">产品<br/>名称</div>
                                    <div className = "browse-table-head-single">表示<br/>里程</div>
                                    <div className = "browse-table-head-single">赠品<br/>情况</div>
                                    <div className = "browse-table-head-single">备注</div>
                                    <div className = "browse-table-head-single">操作人</div>
                                    <div className = "browse-table-head-single">换油<br/>证号</div>
                                </div>
                                {this.state.dataToBeExported.map(record => {
                                    return (
                                        <div className = "browse-single" key = {this.state.dataToBeExported.indexOf(record)} style = {this.state.dataToBeExported.indexOf(record) % 2 === 0 ? {backgroundColor: 'white'} : {backgroundColor: '#faefc9'}}>
                                            <div className = "browse-single-detail">{record.record_time}</div>
                                            <div className = "browse-single-detail">{record.record_name}</div>
                                            <div className = "browse-single-detail">{record.record_milage}</div>
                                            <div className = "browse-single-detail">{record.record_gift}</div>
                                            <div className = "browse-single-detail">{record.record_detail}</div>
                                            <div className = "browse-single-detail">{record.record_operator}</div>
                                            <div className = "browse-single-detail">{record.record_id}</div>
                                        </div>
                                    )
                                })}
                            </div>
                        : ""}
                    </div>
                : ""}
            </div>
        )
    }
}

export default BrowseAndExport;