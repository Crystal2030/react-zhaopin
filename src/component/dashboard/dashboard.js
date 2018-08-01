import React from 'react';
import {connect} from 'react-redux';
import {NavBar} from 'antd-mobile';
import {Switch, Route} from 'react-router-dom';
import NavLinkBar from '../navlink/navlink';
import Boss from '../../component/boss/boss';
import Genius from '../../component/genius/genius';
import User from '../../component/user/user';
import Msg from '../../component/msg/msg';
import {getMsgList, receiveMsg} from '../../redux/chat.redux';

@connect (
    state => state,
    {getMsgList, receiveMsg}
)
class Dashboard extends React.Component {
    componentDidMount() {
        console.log('Dashboard component did mount--->', this.props.chat.chatmsg.length)
        if(!this.props.chat.chatmsg.length) {
            this.props.getMsgList();
            this.props.receiveMsg();
        }
    }

    render() {
        const pathname = this.props.location.pathname;
        const user = this.props.user;
        const navList = [
            {
                path: '/boss',
                text: '牛人',
                icon: 'boss',
                title: '牛人列表',
                component: Boss,
                hide: user.type === 'genius'
            },
            {
                path: '/genius',
                text: 'boss',
                icon: 'job',
                title: 'BOSS列表',
                component: Genius,
                hide: user.type === 'boss'
            },
            {
                path: '/msg',
                text: '消息',
                icon: 'msg',
                title: '消息列表',
                component: Msg
            },
            {
                path: '/me',
                text: '我',
                icon: 'user',
                title: '个人中心',
                component: User
            }

        ];
        return (
            <div>
                <NavBar className='fixd-header' mode='dard' >
                    {navList.filter(v=>v.path===pathname)[0].title}
                </NavBar>

                <div style={{marginTop: 45}}>
                    <Switch>
                        {
                            navList.map(v=>{
                               return (<Route key={v.path} path={v.path} component={v.component}/>);
                            })
                        }

                    </Switch>
                </div>

                <NavLinkBar data={navList}></NavLinkBar>
            </div>

        )
    }
}

export default Dashboard