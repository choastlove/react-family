import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import Backlog from './backlog.js'
//导入css样式
import './Home.css'

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '驿阳指'
        }
    }

    _handleClick() {
        this.setState({
            name: 'app'
        });
    }

    render() {
        return (
            <div>
                <ul className='nav'>
                    <li><Link to="/">大海测试门店</Link></li>
                    <li><Link to="/foo">微信营销</Link></li>
                    <li><Link to="/bar">收银/开单</Link></li>
                    <li><Link to="/list">供应商</Link></li>
                    <li><Link to="/userinfo">办卡续费</Link></li>
                    <li><Link to="/userinfo">入库/库存</Link></li>
                    <li><Link to="/userinfo">财务营收</Link></li>
                    <li><Link to="/userinfo">系统配置</Link></li>
                    <li><Link to="/userinfo">H</Link></li>
                </ul>
                <div>
                    <Backlog/>
                </div>
            </div>
        )
    }
}