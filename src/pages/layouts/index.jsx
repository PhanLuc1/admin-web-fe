import { Layout } from "antd"
import SideBar from "./SideBar"
import { Outlet } from "react-router-dom"
import MyHeader from "./Header";
const { Content } = Layout;

const MainLayout = () => {
    return <>
    <Layout className="max-h-screen overflo-w-hidden">
    <SideBar/>
    <Layout className="h-screen">
        <MyHeader/>
        <Content className="h-full overflow-auto"><Outlet/></Content>
    </Layout>
    </Layout>
    </>
}

export default MainLayout;