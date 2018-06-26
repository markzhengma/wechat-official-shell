import React, { Component } from 'react';

class Header extends Component {
    render(){
        return (
            <header style = {this.props.isShowHeader ? {maxHeight: '300px'} : {maxHeight: '0px'}}>
                <div className = "app-header">
                    <div className = "header-title"><b><small>呼伦贝尔市壳牌汽车养护中心</small></b></div>
                    <div className = "header-logo"/>
                    <div className = "header-title"><b>保养查询系统</b></div>
                </div>
            </header>
        )
    }
}

export default Header;