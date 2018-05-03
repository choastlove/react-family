import React from 'react';

import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

//改造路由，实现按需加载相应资源
import Bundle from './Bundle'

//..pages/Home/Home 绝对路径
//pages/Home/Home 相对路径 
import Home from 'bundle-loader?lazy&name=home!pages/Home/Home';
import Foo from 'bundle-loader?lazy&name=foo!pages/Foo/Foo';
import Bar from 'bundle-loader?lazy&name=bar!pages/Bar/Bar';
import UserInfo from 'bundle-loader?lazy&name=userinfo!pages/UserInfo/UserInfo';
import List from 'bundle-loader?lazy&name=list!pages/List/List';
//加载
const Loading = function(){
    return <div>Laoding...</div>
}

//创建组件
const createComponent = (component) => (props) => (
    <Bundle load={component}>
        {
            (Component) => Component ? <Component {...props} /> : <Loading/>
        }
    </Bundle>
);

const getRouter = () => (
    <Router>
        <div>
            
            <Switch>
                <Route exact path="/" component={createComponent(Home)}/>
                <Route path="/foo" component={createComponent(Foo)}/>
                <Route path="/bar" component={createComponent(Bar)}/>
                <Route path="/userinfo" component={createComponent(UserInfo)}/>
                <Route path="/list" component={createComponent(List)}/>
            </Switch>
        </div>
    </Router>
);

export default getRouter;