import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class RecordList extends Component {
    componentDidMount(){
        this.props.resetRedirect();
        this.props.getRecord(this.props.phone_num);
    }

    render(){
        return (
            <div className = "records-content">
                {this.props.recordData ? 
                    <div>
                        <h5>欢迎，{this.props.recordData[0].driver_name}</h5>
                        <p>您的车牌号码：{this.props.recordData[0].plate}</p>
                        <p>您的电话：{this.props.recordData[0].phone_num}</p>
                        <div className = "record-table">
                            <div className = "record-table-head">
                                <div className = "record-table-head-single">养护时间</div>
                                <div className = "record-table-head-single">项目名称</div>
                                <div className = "record-table-head-single">详细内容</div>
                                <div className = "record-table-head-single">养护地址</div>
                            </div>
                            {this.props.recordData.map(record => {
                                var date = new Date(record.record_time);
                                return (
                                    <div className = "record-single" key = {this.props.recordData.indexOf(record)}>
                                        <div className = "record-single-detail">{date.getFullYear()}年{date.getMonth()}月{date.getDate()}日</div>
                                        <div className = "record-single-detail">{record.record_name}</div>
                                        <div className = "record-single-detail">{record.record_detail}</div>
                                        <div className = "record-single-detail">{record.record_location}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                : <h5>正在努力获取您的养护记录...</h5>}
            </div>
        )
    }
}

export default RecordList;