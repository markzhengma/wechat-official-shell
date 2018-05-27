import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    render(){
        return (
            <header>
                <div className = "app-header">
                    <div className = "header-logo"/>
                    <div className = "header-title"><b><small>呼伦贝尔市壳牌汽车养护中心</small><br/>保养查询系统</b></div>
                </div>
            </header>
        )
    }
}

export default Header;