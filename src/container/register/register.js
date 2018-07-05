import React from 'react';
import {List, InputItem,Radio, WingBlank, WhiteSpace, Button} from 'antd-mobile';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {register} from '../../redux/user.redux';

import Logo from '../../component/logo/logo';

@connect(
    state => state.user,
    {register}
)


class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            pwd: '',
            repeatpwd: '',
            type: 'genius', // 或者boss
        }

        this.handleRegister=this.handleRegister.bind(this);
    }
    handleChange(key, val) {
        this.setState({
            [key]: val
        })
    }

    handleRegister() {
        console.log('handleRegister----->', this.state);
        this.props.register(this.state);
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
                        onChange={v=>this.handleChange('user', v)}
                    >用户名</InputItem>
                    <WhiteSpace/>
                    <InputItem
                        type='password'
                        onChange={v=>this.handleChange('pwd', v)}
                    >密码</InputItem>
                    <WhiteSpace/>
                    <InputItem
                        type='password'
                        onChange={v=>this.handleChange('repeatpwd', v)}
                    >确认密码</InputItem>
                    <WhiteSpace/>
                    <RadioItem
                        checked={this.state.type == 'genius'}
                        onChange={() => this.handleChange('type', 'genius')}
                    >
                        牛人
                    </RadioItem>
                    <RadioItem
                        checked={this.state.type == 'boss'}
                        onChange={() => this.handleChange('type', 'boss')}
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