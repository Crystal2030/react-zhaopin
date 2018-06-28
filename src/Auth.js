import React from 'react';
import {connect} from 'react-redux';
import {login, getUserData} from './Auth.redux';
import {Redirect} from 'react-router-dom';
// import axios from 'axios';

// 两个reducers 每个reducers都有一个state
// 合并reducer
@connect(
    state => state.auth,
    {login, getUserData}
)

class Auth extends React.Component {
    // 没有redux配合
    /*constructor(props) {
        super(props);
        this.state = {
            data: {}
        };
    }
    componentDidMount() {
        axios.get('/data')
            .then(res => {
                console.log(res);
                if(res.status == 200) {
                    this.setState({data: res.data});
                }
            })
    }*/
    componentDidMount() {
        this.props.getUserData();
    }

    render() {
        return (
            <div>
                <h2>我的名字是 {this.props.user}, 年龄 {this.props.age}</h2>
                {this.props.isAuth ? <Redirect to='/dashboard' /> : null}
                <h2>您还没有权限，需要登录才能看</h2>
                <button onClick={this.props.login}>登录</button>
            </div>
        )
    }
}

export default Auth;