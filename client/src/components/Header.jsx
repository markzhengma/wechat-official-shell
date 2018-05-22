import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    render(){
        return (
            <header>
                <div className = "app-header">
                    <div className = "header-logo"/>
                    <div className = "header-title"><b>呼伦贝尔市壳牌润滑油</b></div>
                </div>
            </header>
        )
    }
}

export default Header;