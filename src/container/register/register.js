import React from 'react';
import {List, InputItem,Radio, WhiteSpace, Button} from 'antd-mobile';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {register} from '../../redux/user.redux';
import imoocForm from '../../component/imooc-form/imooc-form';


import Logo from '../../component/logo/logo';

@connect(
    state => state.user,
    {register}
)
@imoocForm

class Register extends React.Component {
    constructor(props) {
        super(props);
        /*this.state = {
            user: '',
            pwd: '',
            repeatpwd: '',
            type: 'genius', // 或者boss
        }*/

        this.handleRegister=this.handleRegister.bind(this);
    }
    componentDidMount() {
        this.props.handleChange('type', 'genius');
    }
    // 移至imooc-form高阶组件中去了
    /*handleChange(key, val) {
        this.setState({
            [key]: val
        })
    }*/

    handleRegister() {
        console.log('handleRegister----->', this.props.state);
        this.props.register(this.props.state);
    }

    render() {
        const RadioItem = Radio.RadioItem;

        return (
            <div>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
                <Logo />
                <h2>注册页</h2>
                <List>
                    {this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null}
                    <InputItem
                        onChange={v=>this.props.handleChange('user', v)}
                    >用户名</InputItem>
                    <WhiteSpace/>
                    <InputItem
                        type='password'
                        onChange={v=>this.props.handleChange('pwd', v)}
                    >密码</InputItem>
                    <WhiteSpace/>
                    <InputItem
                        type='password'
                        onChange={v=>this.props.handleChange('repeatpwd', v)}
                    >确认密码</InputItem>
                    <WhiteSpace/>
                    <RadioItem
                        checked={this.props.state.type === 'genius'}
                        onChange={() => this.props.handleChange('type', 'genius')}
                    >
                        牛人
                    </RadioItem>
                    <RadioItem
                        checked={this.props.state.type === 'boss'}
                        onChange={() => this.props.handleChange('type', 'boss')}
                    >
                        老板
                    </RadioItem>
                    <WhiteSpace/>
                    <Button type="primary" onClick={this.handleRegister}>注册</Button>
                </List>
            </div>
        )
    }
}

export default Register;