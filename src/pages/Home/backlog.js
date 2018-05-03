import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import './backlog.css'

export default class Backlog extends Component {
    constructor(props) {
        super(props);
        
    }

    handleClick() {
        const name = "驿阳指";
        console.log(name)
    }

    render() {
        return (
            <div>
                <ul className='List'>
                    <li><Link to=''>
                        <div>
                            <p>快捷开单</p>
                            <p className='small-font'>Fast Billing</p>
                        </div>
                    </Link></li>
                    <li><Link to=''>办卡续费</Link></li>
                    <li><Link to=''>预约登记</Link></li>

                </ul>
            </div>
        )
    }
}