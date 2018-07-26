import React from 'react';
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {login} from '../../redux/user.redux';
import imoocForm from '../../component/imooc-form/imooc-form';

import Logo from '../../component/logo/logo';

/*function hello() {
    console.log('hello imooc I love React');
}
function WrapperHello(fn) {
   return function(){
       console.log('before say hello');
       fn();
       console.log('after say hello');
   }
}
hello = WrapperHello(hello);
hello();*/
/*
// 属性代理
function WrapperHello(Comp) {
    class WrapComp extends Comp {
        componentDidMount() {
            console.log('高阶组件新增的生命周期，加载完成')
        }
        render() {
            return <Comp></Comp>
        }
    }

   /!* class WrapComp extends React.Component {
        render() {
            return (<div>
                <p>这是HOC告诫组件特有的元素</p>
                <Comp name='text' {...this.props}></Comp>
            </div>)
        }
    }*!/
    return WrapComp;
}

@WrapperHello
class Hello extends React.Component {
    render() {
        return <h2>hello imooc I love React&Redux</h2>
    }
}*/


@connect(
    state => state.user,
    {login}
)
@imoocForm
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            user: '',
            pwd: '',
        }
        this.register = this.register.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    register() {
        console.log(this.props);
        this.props.history.push('/register');
    }

    // 移至imooc-form高阶组件中去了
    /*handleChange(key, val) {
        this.setState({
            [key]: val
        })
    }*/

    handleLogin() {
        this.props.login(this.props.state);// 换成高阶组件后，this.state换成this.props.state这样
    }

    render() {
        return (
            <div>
                {/*<Hello />*/}
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
                <Logo />
                <h2>登录页</h2>
                <WingBlank>
                    <List>
                        {this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null}
                        <InputItem
                            onChange={v=>this.props.handleChange('user', v)}
                        >用户</InputItem>
                        <WhiteSpace/>
                        <InputItem
                            type='password'
                            onChange={v=>this.props.handleChange('pwd', v)}
                        >密码</InputItem>
                    </List>
                    <Button type="primary"
                        onClick={this.handleLogin}
                    >登录</Button>
                    <WhiteSpace/>
                    <Button onClick={this.register} type="primary">注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Login;