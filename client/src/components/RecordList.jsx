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
                        <p>{this.props.recordData.length}</p>
                        {this.props.recordData.map(record => {
                            return <div className = "record-single" key = {this.props.recordData.indexOf(record)}>
                                    <p>{record.record_time}</p>
                                    <p>{record.record_name}</p>
                                    <p>{record.record_detail}</p>
                                    <p>{record.record_location}</p>
                                </div>
                        })}
                    </div>
                : <h5>正在努力获取您的养护记录...</h5>}
            </div>
        )
    }
}

export default RecordList;