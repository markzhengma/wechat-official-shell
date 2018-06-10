import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component {
    render(){
        return (
            <footer>
                <div className = "app-footer">
                    <a href = 'tel:+86-0470-8223779'>联系电话：0470-8223779</a>
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