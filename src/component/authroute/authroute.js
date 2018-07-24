import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom'; // AuthRoute并不是路由组件，它并没有操作路由的方法，所以需要借助withRouter来操作路由
import {connect} from 'react-redux';
import {loadData} from '../../redux/user.redux';
@withRouter
@connect(
    state => state.user,
    {loadData}
)
class AuthRoute extends React.Component {
    componentDidMount() {
        const publicList = ['/login', '/register'];
        const pathname = this.props.location.pathname;
        console.log('pathname--->', pathname);
        // 如果pathname在publicList里面就不用获取用户信息
        if(publicList.indexOf(pathname) > -1) {
            return null;
        }
        // 获取用户信息
        axios.get('/user/info')
            .then(res => {
                if(res.status === 200) {
                    if(res.data.code=== 0) {
                        // 有登陆信息
                        console.log('authroute--->',  res.data.data)
                        this.props.loadData(res.data.data);
                    } else {
                        // 没有登录信息，就跳转到登录页面
                        this.props.history.push('/login');
                    }
                }
        })

        // 是否登录
        // 现在的url地址 login是不是需要跳转的
        // 用户的type 身份是boss还是牛人
        // 用户是否完善信息（选择头像 个人简介）
    }

    render() {
        return null;
    }
}

export default AuthRoute;