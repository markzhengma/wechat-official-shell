import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component {
    constructor(){
        super();
        this.state = {
            isShowContact: false,
        }
    }
    switchContactShow = () => {
        this.setState({
            isShowContact: !this.state.isShowContact,
        })
    }
    render(){
        return (
            <footer>
                <div className = "contact-box" style = {this.state.isShowContact ? {maxHeight: '300px', border: 'grey solid 0px'} : {maxHeight: '0px', border: 'grey solid 0px'}}>
                    <b><a href = 'tel:+86-0470-8223779' className = "store-name">海拉尔河东店：</a></b>
                    <a href = 'tel:+86-0470-8223779' className = "store-num">0470-8223779</a>
                    <b><a href = 'tel:+86-0470-8307711' className = "store-name">海拉尔河西店：</a></b>
                    <a href = 'tel:+86-0470-8307711' className = "store-num">0470-8307711</a>
                    <b><a href = 'tel:+86-0470-2205900' className = "store-name">满洲里四道街店：</a></b>
                    <a href = 'tel:+86-0470-2205900' className = "store-num">0470-2205900</a>
                    <b><a href = 'tel:+86-0470-6221541' className = "store-name">满洲里粮库综合楼店：</a></b>
                    <a href = 'tel:+86-0470-6221541' className = "store-num">0470-6221541</a>
                    <b><a href = 'tel:+86-0470-7379457' className = "store-name">牙克石光明南路店：</a></b>
                    <a href = 'tel:+86-0470-7379457' className = "store-num">0470-7379457</a>
                    <b><a href = 'tel:+86-13088520439' className = "store-name">牙克石一道街店：</a></b>
                    <a href = 'tel:+86-13088520439' className = "store-num">13088520439</a>
                    <Link to = "/maps"><button className = "map-page-btn" onClick = {this.switchContactShow}><b>门店地址</b></button></Link>
                </div>
                <div className = "app-footer">
                    <button className = "footer-btn" onClick = {this.switchContactShow}>联系我们</button>
                </div>
                <div className = "header-logo"/>
                <div>
                    {this.props.auth ? 
                        <b>管理员已登录</b>
                        :
                        <Link to = "/login"><button className = "footer-btn">管理员登录</button></Link>
                    }
                </div>
            </footer>
        )
    }
}

export default Footer;