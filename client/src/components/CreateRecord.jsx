import React, { Component } from 'react';

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
                    <input className = "create-record-input" type = 'text' name = 'record_milage' placeholder = "表示里程" onChange = {this.handleInputChange} value = {this.state.record_milage}/>
                    <select className = "create-record-input" name = "record_operator" onChange = {this.handleInputChange} value = {this.state.record_operator}>
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
                    <select className = "create-record-input" name = "record_gift" onChange = {this.handleInputChange} value = {this.state.record_gift}>
                        <option value = "">-赠品情况-</option>
                        {this.props.gift_list.map(gift => {
                            return <option key = {gift.id}>{gift.record_gift}</option>
                        })}
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