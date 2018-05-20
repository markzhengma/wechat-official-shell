import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
    constructor(){
        super();
        this.state = {
            phone_num: '',
        }
    }

    handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value,
        });
    }

    render(){
        return (
            <div className = "home-content">
                <h5>使用手机号查询爱车的保养记录</h5>
                <form>
                    <input type = "text" name = "phone_num" value = {this.state.phone_num} placeholder = "请输入手机号" onChange = {this.handleInputChange}/>
                    <button type = "submit">查询</button>
                </form>
            </div>
        )
    }
}

export default Home;