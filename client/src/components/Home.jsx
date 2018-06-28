import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Home extends Component {
    componentDidMount(){
        this.props.resetRedirect();
    }
    render(){
        if(this.props.fireRedirect === true){
            return <Redirect to = {this.props.redirect}/>
        }
        return (
            <div className = "home-content">
                <h5>请使用车牌号和您的手机号码查询爱车的保养记录</h5>
                {!this.props.plateMatchesPhoneNum ? 
                    <h5 className = "banner">车牌号和手机号不符，<br/>请重新输入或联系我们更新您的信息。</h5>
                    : ''}
                {!this.props.phoneExists ? 
                    <h5 className = "banner">未能找到与您的手机号对应的记录，<br/>请重新输入或联系我们更新您的信息。</h5>
                    : ''}
                <form onSubmit = {this.props.submitForm}>
                    <input type = "text" name = "phone_num" value = {this.props.phone_num} placeholder = "请输入手机号码" onChange = {this.props.handleInputChange}/>
                    <input type = "text" name = "plate" value = {this.props.plate} placeholder = "请输入车牌号" onChange = {this.props.handleInputChange}/>
                    <button type = "submit">查询</button>
                </form>
            </div>
        )
    }
}

export default Home;