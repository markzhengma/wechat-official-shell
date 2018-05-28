import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    componentDidMount(){
        console.log(window.innerWidth);
    }
    render(){
        return (
            <header>
                <div className = "app-header">
                    <div className = "header-logo"/>
                    <div className = "header-title"><b><small>呼伦贝尔市壳牌{window.innerWidth <= 400 ? <br/> : ''}汽车养护中心</small><br/>保养查询系统</b></div>
                </div>
            </header>
        )
    }
}

export default Header;