import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class RecordList extends Component {
    componentDidMount(){
        this.props.resetRedirect();
    }

    render(){
        return (
            <div className = "records-content">
                    <div>
                        {this.props.userData && this.props.userData.length ? 
                            <div className = "record-title">
                                <h4>欢迎 {this.props.userData[0].driver_name}</h4>
                                <p>您的车牌号码：{this.props.userData[0].plate}</p>
                                <p>车型：{this.props.userData[0].make ? this.props.userData[0].make : "无记录"}</p>
                                <p>您的电话：{this.props.userData[0].phone_num}</p>
                                <p>换油证号：{this.props.userData[0].service_num ? this.props.userData[0].service_num : "无记录"}</p>
                            </div>
                        : <h5>暂无客户信息</h5>}
                        {this.props.recordData != null && this.props.recordData.length >= 1 ? 
                            <div className = "record-table">
                                <div className = "record-table-head">
                                    <div className = "record-table-head-single">日期</div>
                                    <div className = "record-table-head-single">产品<br/>名称</div>
                                    <div className = "record-table-head-single">表示<br/>里程</div>
                                    <div className = "record-table-head-single">赠品<br/>情况</div>
                                    <div className = "record-table-head-single">备注</div>
                                    <div className = "record-table-head-single">操作人</div>
                                </div>
                                {this.props.recordData.map(record => {
                                    var date = new Date(record.record_time);
                                    var month = ((date.getMonth() + 1) < 10) ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
                                    return (
                                        <div className = "record-single" key = {this.props.recordData.indexOf(record)} style = {this.props.recordData.indexOf(record) % 2 === 0 ? {backgroundColor: 'white'} : {backgroundColor: '#faefc9'}}>
                                            <div className = "record-single-detail">{date.getFullYear()}年<br/>{month}月{date.getDate()}日</div>
                                            <div className = "record-single-detail">{record.record_name}</div>
                                            <div className = "record-single-detail">{record.record_milage}</div>
                                            <div className = "record-single-detail">{record.record_gift}</div>
                                            <div className = "record-single-detail">{record.record_detail}</div>
                                            <div className = "record-single-detail">{record.record_operator}</div>
                                        </div>
                                    )
                                })}
                                <p>若以上记录有任何疑问，欢迎联系我们核实或更新信息</p>
                            </div>
                        : <h5>暂无保养记录</h5>}
                    </div>
                <Link to = "/"><button className = "back-btn">返回首页</button></Link>
            </div>
        )
    }
}

export default RecordList;