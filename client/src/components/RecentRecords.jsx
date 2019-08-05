import React, { Component } from 'react';
import axios from 'axios';

class RecentRecords extends Component {
    constructor() {
        super();
        this.state = {
            recentRecords: null,
            recordSelection: '',
        }
    }
    componentWillUnmount(){
        this.setState({
            recentRecords: null,
        })
    }
    handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value,
        });
    }

    searchRecentRecords = (location_char) => {
        if(location_char){
            axios.get(`/record/recent/${location_char}`, {
                location_char: location_char,
            })
            .then(res => {
                this.setState({
                    recentRecords: res.data,
                })
            })
        }
    }
    
    render(){
        return (
            <div className = "recent-record-box">
                <select className = "admin-select" name = "recordSelection" value = {this.state.recordSelection} onChange = {this.handleInputChange}>
                    <option value = "">-请选择门店地区-</option>
                    <option value = "HD">海拉尔河东</option>
                    <option value = "H">海拉尔河西</option>
                    <option value = "M">满洲里</option>
                    <option value = "Y">牙克石</option>
                </select>
                <button className = "admin-page-btn" onClick = {() => this.searchRecentRecords(this.state.recordSelection)}>查询</button>
                {this.state.recentRecords != null && this.state.recentRecords.length >= 1 ?
                    <div className = "table-container">
                        <h5>以下显示的是该地区所有门店最近十个养护记录</h5>
                        <div className = "recent-record-table">
                            <div className = "recent-record-head">
                                <div className = "recent-record-head-single">日期</div>
                                <div className = "recent-record-head-single">产品名称</div>
                                <div className = "recent-record-head-single">表示里程</div>
                                <div className = "recent-record-head-single">操作人</div>
                                <div className = "recent-record-head-single">赠品情况</div>
                                <div className = "recent-record-head-single">备注</div>
                                <div className = "recent-record-head-single">换油证号</div>
                            </div>
                            {this.state.recentRecords.map(record => {
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
                                return(
                                    <div className = "recent-record-detail" key = {record.id} onClick = {(e) => this.props.redirectToRecordPageAndSearch(e, record.record_id)}>
                                        <div className = "recent-record-detail-single">{formattedDate}</div>
                                        <div className = "recent-record-detail-single">{record.record_name}</div>
                                        <div className = "recent-record-detail-single">{record.record_milage}</div>
                                        <div className = "recent-record-detail-single">{record.record_operator}</div>
                                        <div className = "recent-record-detail-single">{record.record_gift}</div>
                                        <div className = "recent-record-detail-single">{record.record_detail}</div>
                                        <div className = "recent-record-detail-single">{record.record_id}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                : ""}
            </div>
        )
    }
}

export default RecentRecords;