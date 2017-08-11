import './Header.scss'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Icon, Layout, Menu, Dropdown, message, Tooltip } from 'antd'
import { checkLoginState, logoutActions, loginTypeAction} from '../../reducer/modules/user'
import { changeMenuItem } from '../../reducer/modules/menu'
import { withRouter } from 'react-router';
import Srch from './Search/Search'
const { Header } = Layout;

const headerStyle = {
  'height': '.56rem',
  'lineHeight': '.56rem',
  'padding': 0
};

const MenuUser = (props) => (
  <Menu
  style={{
    "boxShadow":"0 1px 6px rgba(0, 0, 0, 0.3)"
  }}
  >
    <Menu.Item key="0">
      <Link to={`/user/profile/${props.uid}`} onClick={props.relieveLink}><Icon type="user"/>个人中心</Link>
    </Menu.Item>
    <Menu.Item key="1">
      <a onClick={props.logout}><Icon type="logout" />退出</a>
    </Menu.Item>
  </Menu>
);

MenuUser.propTypes={
  user: PropTypes.string,
  msg: PropTypes.string,
  uid: PropTypes.number,
  relieveLink: PropTypes.func,
  logout: PropTypes.func
}

const ToolUser = (props)=> (
  <ul>
    <li className="toolbar-li item-search">
      <Srch groupList={props.groupList}/>
    </li>
    <Link to="/add-project">
      <Tooltip placement="bottom" title={'新建项目'}>
        <li className="toolbar-li">
          <Icon className="dropdown-link" style={{ fontSize: 16 }} type="plus-circle" />
        </li>
      </Tooltip>
    </Link>
    <Tooltip placement="bottom" title={'使用文档'}>
      <li className="toolbar-li">
        <a target="_blank" href="./doc/index.html"><Icon className="dropdown-link" style={{ fontSize: 16 }} type="question-circle" /></a>
      </li>
    </Tooltip>
    <li className="toolbar-li">
      <Dropdown
        placement = "bottomRight"
        overlay={
          <MenuUser
            user={props.user}
            msg={props.msg}
            uid={props.uid}
            relieveLink={props.relieveLink}
            logout={props.logout}
          />
      }>
        <a className="dropdown-link">
          <img style={{width:24,height:24}} src={`/user/avatar?uid=${props.uid}`} /><span className="name">{props.user}</span>
        </a>
      </Dropdown>
    </li>
  </ul>
);
ToolUser.propTypes={
  user: PropTypes.string,
  msg: PropTypes.string,
  uid: PropTypes.number,
  relieveLink: PropTypes.func,
  logout: PropTypes.func,
  groupList: PropTypes.array
};



@connect(
  (state) => {
    return{
<<<<<<< HEAD
      avatar: state.login.avatar,
      user: state.login.userName,
      uid: state.login.uid,
=======
      user: state.user.userName,
      uid: state.user.uid,
>>>>>>> 8c04198eb2dd2e6ddae9b815cc9a21b6436d8c76
      msg: null,
      login:state.user.isLogin
    }
  },
  {
    loginTypeAction,
    logoutActions,
    checkLoginState,
    changeMenuItem
  }
)
@withRouter
export default class HeaderCom extends Component {
  constructor(props) {
    super(props);
  }
  static propTypes ={
    router: PropTypes.object,
    user: PropTypes.string,
    msg: PropTypes.string,
    uid: PropTypes.number,
    login:PropTypes.bool,
    relieveLink:PropTypes.func,
    logoutActions:PropTypes.func,
    checkLoginState:PropTypes.func,
    loginTypeAction:PropTypes.func,
    changeMenuItem:PropTypes.func,
    history: PropTypes.object,
    location: PropTypes.object
  }
  linkTo = (e) =>{
    if(e.key != '/doc'){
      this.props.changeMenuItem(e.key);
      if(!this.props.login){
        message.info('请先登录',1);
      }
    }
  }
  relieveLink = () => {
    this.props.changeMenuItem("");
  }
  logout = (e) => {
    e.preventDefault();
    this.props.logoutActions().then((res) => {
      if (res.payload.data.errcode == 0) {
        this.props.history.push('/');
        this.props.changeMenuItem("/");
        message.success('退出成功! ');
      } else {
        message.error(res.payload.data.errmsg);
      }
    }).catch((err) => {
      message.error(err);
    });
  }
  handleLogin = (e) => {
    e.preventDefault();
    this.props.loginTypeAction("1");
  }
  handleReg = (e)=>{
    e.preventDefault();
    this.props.loginTypeAction("2");
  }
  checkLoginState = () => {
    this.props.checkLoginState.then((res) => {
      if (res.payload.data.errcode !== 0) {
        this.props.history.push('/');
      }
    }).catch((err) => {
      console.log(err);
    })
  }



  render () {
    const { login, user, msg, uid } = this.props;
    return (
      <Header className="header-box" style={headerStyle}>
        <div className="content g-row">
          <div className="logo">
            <Link to="/" onClick={this.relieveLink} className="href">
              <img className="img" src="./image/logo_header@1x.png" /><span className="logo-name">YAPI<span className="ui-badge"></span></span>
            </Link>
          </div>
          <div className="user-toolbar">
            {login?
              <ToolUser
                user = { user }
                msg = { msg }
                uid = { uid }
                relieveLink = { this.relieveLink }
                logout = { this.logout }
              />
              :""}
          </div>
        </div>
      </Header>
    )
  }
}
