import React, { Component } from 'react';
import {
    Link,
    Redirect,
} from 'react-router-dom';
import axios from 'axios';
import { CSVLink } from 'react-csv';

class BrowseAndExport extends Component {
    constructor() {
        super();
        this.state = {
            start_date: '',
            end_date: '',
            location_char: '',
            dataToBeExported: null,
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.exportData = this.exportData.bind(this);
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
    exportData = () => {
        // const json2csv = require('json2csv').parse;
        // const fields = ['id', 'record_time', 'record_name', 'record_milage', 'record_operator', 'record_gift', 'record_id'];
        // const opts = { fields };
        // const csv = json2csv(this.state.dataToBeExported, opts);
        // fs.writeFile('保养记录.csv', csv)
        // .then(function(){
        //     console.log("export successed!");
        // })
    }
    render(){
        const headers = [
            {label: '序号', key: 'id'},
            {label: '日期', key: 'record_time'},
            {label: '产品名称', key: 'record_name'},
            {label: '表示里程', key: 'record_milage'},
            {label: '操作人', key: 'record_operator'},
            {label: '赠品情况', key: 'record_gift'},
            {label: '换油证号', key: 'record_id'}
        ];

        const data = this.state.dataToBeExported;
        return (
            <div className = "export-browse-page">
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
                        {/* <button className = "admin-page-btn" onClick = {this.exportData}>下载该记录</button> */}
                        <CSVLink data = {data} headers = {headers}><button className = "admin-page-btn">下载</button></CSVLink>
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
                                <div className = "browse-single" key = {this.state.dataToBeExported.indexOf(record)} style = {this.state.dataToBeExported.indexOf(record) % 2 == 0 ? {backgroundColor: 'white'} : {backgroundColor: '#faefc9'}}>
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
        )
    }
}

export default BrowseAndExport;