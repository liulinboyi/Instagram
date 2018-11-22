import React from 'react'
import { Icon } from 'antd';
import Style from './index.scss'
import { withRouter } from 'react-router'
import { connect } from "react-redux";

@connect(
    store => {
        return {
            userInfo: store.userInfo
        }
    }
)
class UserInfos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            topicCounts: 0,
            fansCounts: 20,
            followCounts: 100,
            avator: '',
            // 本人相关
            isSelf: true,
            hasAttention: false
        }
    }

    goEditAccounts = () => {
        const { history } = this.props;
        history.push('/accounts')
    }

    attentionUser = () => {
        this.setState({
            hasAttention: !this.state.hasAttention
        })
    }

    render() {
        let {userInfo} = this.props
        return (
            <main>
                <div className={Style['user-infos']}>
                    <div className="avator" style={{'backgroundImage': `url(${userInfo.avatarUrl})`}}></div>
                    <div className="user-infos">

                    {
                        this.state.isSelf?
                        <p className="operate">
                            <span className="user-account">{userInfo.account}</span>
                            <span className="modify" onClick={this.goEditAccounts}>编辑个人主页</span>
                            <Icon className="icon" type="setting" theme="filled"  onClick={this.goEditAccounts}/>
                        </p>
                        :
                        <p className="operate">
                            <span className="user-account">{userInfo.account}</span>
                            <span className={`modify ${!this.state.hasAttention && 'blue'}`} onClick={this.attentionUser}>
                                {this.state.hasAttention?'已关注': '关注'}
                            </span>
                        </p>
                    }

                    <p className="attention-status">
                        <span><b>{this.props.personalInfo.topicCounts}</b>帖子</span>
                        <span><b>{this.props.personalInfo.fansCounts}</b>粉丝</span>
                        <span><b>正在关注</b>{this.props.personalInfo.followCounts}</span>
                    </p>
                    <p className="user-name">
                        <b>{userInfo.abstract}</b>
                    </p>
                    </div>     
                </div>
            </main>
        )
    }
}

export default withRouter(UserInfos)