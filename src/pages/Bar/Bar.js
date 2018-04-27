import React,{Component} from 'react';
import './Bar.css'
import image from "./images/star01.png"
export default class Bar extends Component {
    render(){
        return (
            <div className='test'>
                这是一个测试
                <img src={image}/>
            </div>
        )

    }
}
