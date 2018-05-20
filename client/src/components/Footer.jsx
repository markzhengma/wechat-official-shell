import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component {
    render(){
        return (
            <footer>
                <div className = "app-footer">
                    <a href = 'tel:+86-0470-8223776'>联系电话：0470-8223776</a>
                </div>
            </footer>
        )
    }
}

export default Footer;