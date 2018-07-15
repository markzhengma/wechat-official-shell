import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class RecordList extends Component {
    constructor(){
        super();
        this.state = {
            isShowRecord: false,
        }
    }
    componentDidMount(){
        this.props.resetRedirect();
    }

    switchShowRecord = () => {
        this.props.switchShowHeader();
        this.setState({
            isShowRecord: !this.state.isShowRecord,
        });
    }

    render(){
        return (
            <div className = "records-content">
                    <div>
                        {this.props.userData ? 
                            <div className = "record-title">
                                <div className = "user-info-table"  style = {this.state.isShowRecord ? {maxHeight: '0px'}: {maxHeight: '300px'}}>
                                    <div className = "user-info-title">
                                        <div><h4>欢迎 {this.props.userData.driver_name}</h4></div>
                                        <div>积分：{this.props.userData.point ? this.props.userData.point : "无记录"}</div>
                                    </div>
                                    <div className = "user-info-head">
                                        <div className = "user-info-head-single">
                                            车牌号码
                                        </div>
                                        <div className = "user-info-head-single">
                                            车型
                                        </div>
                                    </div>
                                    <div className = "user-info-detail">
                                        <div className = "user-info-detail-single">
                                            {this.props.userData.plate}
                                        </div>
                                        <div className = "user-info-detail-single">
                                            {this.props.userData.make ? this.props.userData.make : "无记录"}
                                        </div>
                                    </div>
                                    <div className = "user-info-head">
                                        <div className = "user-info-head-single">
                                            电话号码
                                        </div>
                                        <div className = "user-info-head-single">
                                            换油证号
                                        </div>
                                    </div>
                                    <div className = "user-info-detail">
                                        <div className = "user-info-detail-single">
                                            {this.props.userData.phone_num}
                                        </div>
                                        <div className = "user-info-detail-single">
                                            {this.props.userData.service_num ? this.props.userData.service_num : "无记录"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        : <h5>暂无客户信息</h5>}
                        {this.props.recordData != null && this.props.recordData.length >= 1 ? 
                            <div>
                                <div className = "record-table-box" style = {this.state.isShowRecord ? {maxHeight: '800px'}: {maxHeight: '0px'}}>
                                    {this.props.recordData != null && this.props.recordData.length >= 3 ?
                                        <p><i className="fas fa-angle-double-right"></i> 向右滑动查看更多保养记录历史 <i className="fas fa-angle-double-right"></i></p>
                                    : ''}
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
                                                <div className = "record-single" key = {this.props.recordData.indexOf(record)}>
                                                    <div className = "record-single-detail" style = {{backgroundColor: '#faefc9'}}>{date.getFullYear()}年<br/>{month}月{date.getDate()}日</div>
                                                    <div className = "record-single-detail" style = {{backgroundColor: 'white'}}>{record.record_name}</div>
                                                    <div className = "record-single-detail" style = {{backgroundColor: '#faefc9'}}>{record.record_milage}</div>
                                                    <div className = "record-single-detail" style = {{backgroundColor: 'white'}}>{record.record_gift}</div>
                                                    <div className = "record-single-detail" style = {{backgroundColor: '#faefc9'}}>{record.record_detail}</div>
                                                    <div className = "record-single-detail" style = {{backgroundColor: 'white'}}>{record.record_operator}</div>
                                                </div>
                                            )
                                        })}
                                        <div className = "record-single">
                                            <div className = "record-single-detail" style = {{backgroundColor: '#faefc9'}}/>
                                            <div className = "record-single-detail" style = {{backgroundColor: 'white'}}/>
                                            <div className = "record-single-detail" style = {{backgroundColor: '#faefc9'}}/>
                                            <div className = "record-single-detail" style = {{backgroundColor: 'white'}}/>
                                            <div className = "record-single-detail" style = {{backgroundColor: '#faefc9'}}/>
                                            <div className = "record-single-detail" style = {{backgroundColor: 'white'}}/>
                                        </div>
                                        <div className = "record-single">
                                            <div className = "record-single-detail" style = {{backgroundColor: '#faefc9'}}/>
                                            <div className = "record-single-detail" style = {{backgroundColor: 'white'}}/>
                                            <div className = "record-single-detail" style = {{backgroundColor: '#faefc9'}}/>
                                            <div className = "record-single-detail" style = {{backgroundColor: 'white'}}/>
                                            <div className = "record-single-detail" style = {{backgroundColor: '#faefc9'}}/>
                                            <div className = "record-single-detail" style = {{backgroundColor: 'white'}}/>
                                        </div>
                                    </div>
                                </div>
                                <button className = "admin-page-btn" onClick = {this.switchShowRecord}>{this.state.isShowRecord ? "查看客户信息" : "查看保养记录"}</button>
                                <p className = "record-page-text">若以上记录有任何疑问，欢迎联系我们核实或更新信息</p>
                            </div>
                        : <h5>暂无保养记录</h5>}
                    </div>
                <Link to = "/"><button className = "back-btn" onClick = {this.props.showHeader}>返回首页</button></Link>
            </div>
        )
    }
}

export default RecordList;