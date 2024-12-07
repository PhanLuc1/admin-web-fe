import { Button, Layout, Menu, theme } from 'antd';
import routes from '../../router'
const { Sider } = Layout;

const SideBar = () => {
    return <Sider trigger={null} collapsible>
    <div className="demo-logo-vertical" />
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={['1']}
      items={routes.map(router => {
        return {
            key: router.path,
            icon: router.icon,
            label: <a href={router.path}>
              {router.label}
          </a>,
          }
        }
    )}
    />
  </Sider>
}

export default SideBar;