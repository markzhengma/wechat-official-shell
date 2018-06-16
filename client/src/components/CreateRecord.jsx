import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CreateRecord extends Component {
    constructor() {
        super();
        var today = new Date();
        var month = ((today.getMonth() + 1) < 10) ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1);
        this.state = {
            record_time: today.getFullYear() + "-" + month + "-" + today.getDate(),
            record_name: '',
            record_milage: '', 
            record_operator: '', 
            record_gift: '', 
            record_detail: '', 
            record_id: '',
        }
    }
    handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value,
        });
    }
    submitAndClearState(e, record_time, record_name, record_milage, record_operator, record_gift, record_detail, record_id){
        this.props.handleNewRecordSubmit(e, record_time, record_name, record_milage, record_operator, record_gift, record_detail, record_id);
        this.setState({
            record_time: '',
            record_name: '',
            record_milage: '', 
            record_operator: '', 
            record_gift: '', 
            record_detail: '', 
            record_id: '',
        })
    }
    render(){
        return (
            <form className = "create-record-form" onSubmit = {(e) => this.submitAndClearState(e, this.state.record_time, 
                                                                                                    this.state.record_name, 
                                                                                                    this.state.record_milage, 
                                                                                                    this.state.record_operator, 
                                                                                                    this.state.record_gift, 
                                                                                                    this.state.record_detail, 
                                                                                                    this.props.service_num)}>
                <div className = "create-record-group">
                    <input className = "create-record-input" type = "date" name = "record_time" placeholder = "日期" onChange = {this.handleInputChange} value = {this.state.record_time}/>
                    <select className = "create-record-input" name = "record_name" onChange = {this.handleInputChange} value = {this.state.record_name}>
                        <option value = "">-产品名称-</option>
                        <option value = "">**汽机油**</option>
                        <option>HX2</option>
                        <option>HX3(10W-30)</option>
                        <option>HX3(5W-30)</option>
                        <option>HX5(10W-40)</option>
                        <option>HX5(5W-30)</option>
                        <option>HX6(10W-40)</option>
                        <option>HX6(5W-30)</option>
                        <option>HX7(5W-40)</option>
                        <option>HX7(5W-30)</option>
                        <option>HX8(0W-40)</option>
                        <option>HX8(0W-30)</option>
                        <option>超凡5W</option>
                        <option>极净超凡-40</option>
                        <option>极净超凡-30</option>
                        <option>极净超凡-20</option>
                        <option value = "">**柴机油**</option>
                        <option>4LR2E</option>
                        <option>4LR3</option>
                        <option>4LR4</option>
                        <option>4LR5E</option>
                        <option>18LR2E</option>
                        <option>18LR3</option>
                        <option>18LR4</option>
                        <option>18LR5E</option>
                        <option>18LR6</option>
                        <option value = "">**附属品**</option>
                        <option>壳牌防冻液</option>
                        <option>4L齿轮油</option>
                        <option>18L齿轮油</option>
                        <option>20L海加力</option>
                        <option>余油</option>
                        <option>自带油品</option>
                        <option>1LS6</option>
                        <option>CVT变速箱油</option>
                        <option>DCTF变速箱油</option>
                        <option value = "">**中华产品**</option>
                        <option>中华9900</option>
                        <option>18L中华CF-4</option>
                        <option>3.8L中华1000</option>
                        <option>蓝中华CD</option>
                        <option>红中华CF</option>
                        <option>2L齿油</option>
                        <option>16L液压油</option>
                        <option>16L液力油</option>
                        <option>18KG防冻液</option>
                    </select>
                    <input className = "create-record-input" type = 'text' name = 'record_milage' placeholder = "表示里程" onChange = {this.handleInputChange} value = {this.state.record_milage}/>
                    <select className = "create-record-input" name = "record_operator" onChange = {this.handleInputChange} value = {this.state.record_operator}>
                        <option value = "">-操作人-</option>
                        <option>外购</option>
                        <option value = "">**海拉尔**</option>
                        <option>赵德军</option>
                        <option>王洪彬</option>
                        <option>朱汨龙</option>
                        <option>杜军</option>
                        <option>马燕龙</option>
                        <option>张拓</option>
                        <option>杨超</option>
                        <option>姜国财</option>
                        <option value = "">**满洲里**</option>
                        <option>逯新勇</option>
                        <option>杨德超</option>
                        <option>刘明</option>
                        <option>程顺发</option>
                        <option value = "">**牙克石**</option>
                        <option>顾丛刚</option>
                        <option>陈海林</option>
                        <option>何志平</option>
                    </select>
                    <select className = "create-record-input" name = "record_gift" onChange = {this.handleInputChange} value = {this.state.record_gift}>
                        <option value = "">-赠品情况-</option>
                        <option>四轮定位</option>
                        <option>倒胎</option>
                        <option>电瓶连接线</option>
                        <option>LED手电</option>
                        <option>工装</option>
                        <option>保温杯</option>
                        <option>劲霸水杯</option>
                        <option>急救包</option>
                        <option>BMW车衣</option>
                        <option>钓鱼保温箱</option>
                        <option>行车记录仪</option>
                        <option>泡茶壶</option>
                        <option>茶杯4件套</option>
                        <option>车载充电器</option>
                        <option>洗发香波</option>
                        <option>蓝牙耳机</option>
                        <option>车载充电套装</option>
                        <option>车载吸尘器</option>
                        <option>毛巾包</option>
                        <option>手机架</option>
                        <option>油路清洁剂</option>
                        <option>雨伞</option>
                        <option>足球</option>
                    </select>
                    <input className = "create-record-input" type = "text" name = "record_detail" placeholder = "备注" onChange = {this.handleInputChange} value = {this.state.record_detail}/>
                    <div className = "create-record-input"><button className = "form-btn" type = "submit">提交</button></div>
                </div>
                <div className = "create-record-btn-group">
                    <button id = "delete-btn" onClick = {this.props.switchInputNew}/>
                </div>
            </form>
        )
    }
}

export default CreateRecord;