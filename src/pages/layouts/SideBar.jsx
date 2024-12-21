import { Button, Layout, Menu, theme } from 'antd';
import routes from '../../router'
import {Link} from "react-router-dom";
import {useContext} from "react";
import AuthContext from "../../contexts/AuthContext";
const { Sider } = Layout;

const SideBar = () => {
    const { authorities } = useContext(AuthContext);

    return <Sider trigger={null} collapsible>
    <div className="demo-logo-vertical" />
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={['1']}
      items={routes.map(router => {
          const hasAccess = router.roles.some(role => authorities.includes(role));

          if(!hasAccess || router.hidden) return;

          return {
            key: router.path,
            icon: router.icon,
            label: <Link to={router.path}>
              {router.label}
          </Link>,
          }
        }
    )}
    />
  </Sider>
}

export default SideBar;