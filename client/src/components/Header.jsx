import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    render(){
        return (
            <header>
                <div className = "app-header">
                    <div className = "header-logo"/>
                    <h1>呼伦贝尔市壳牌润滑油</h1>
                </div>
            </header>
        )
    }
}

export default Header;