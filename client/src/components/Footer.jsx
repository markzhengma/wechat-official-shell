import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component {
    render(){
        return (
            <footer>
                <div className = "app-footer">
                    <a href = 'tel:+86-0470-8223779'>海拉尔河东：0470-8223779</a>
                    <a href = 'tel:+86-0470-8307711'>海拉尔河西：0470-8307711</a>
                    <a href = 'tel:+86-0470-2205900'>满洲里四道街：0470-2205900</a>
                    <a href = 'tel:+86-0470-6221541'>满洲里粮库综合楼：0470-6221541</a>
                    <a href = 'tel:+86-0470-7379457'>牙克石光明南路：0470-7379457</a>
                </div>
                <div>
                    {this.props.auth ? 
                        <b>管理员已登录</b>
                        :
                        <Link to = "/login"><button>管理员登录</button></Link>
                    }
                </div>
            </footer>
        )
    }
}

export default Footer;