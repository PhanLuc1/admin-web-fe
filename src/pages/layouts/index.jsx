import { Layout } from "antd"
import SideBar from "./SideBar"
import { Outlet } from "react-router-dom"
import MyHeader from "./Header";
const { Content } = Layout;

const MainLayout = () => {
    return <>
    <Layout>
    <SideBar/>
    <Layout>
        <MyHeader/>
        <Content><Outlet/></Content>
    </Layout>
    </Layout>
    </>
}

export default MainLayout;