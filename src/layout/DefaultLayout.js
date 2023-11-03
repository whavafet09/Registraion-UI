import { Layout, Menu } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
const { Header, Content, Footer } = Layout;
export default function DefaultLayout() {
  const navigate = useNavigate();

  const menuItems = [
    {
      key: "/Registration",
      label: "Welcome Riders",
    },
    // {
    //   key: "/List",
    //   label: "List",
    // },
  ];

  const handleMenuClick = ({ key }) => {
    navigate(key);
  };
  return (
    <>
      <Layout className="layout gradientBackground">
        <Header style={{ background:'#000080'}}>
          {/* <div className="demo-logo" style={{ flex: 1 }}>
            <img
              alt="daedalus logo"
              src="./logo/edaedalus.jpg"
              style={{ height: 50, width: 80 }}
            />
          </div> */}
          <Menu
            mode="horizontal"
            style={{ color: "white",background:'#000080' }}
        
            items={menuItems}
            onClick={handleMenuClick}
            
          />
        </Header>
        <Content
          style={{
            padding: "0 50px",
            marginTop: "35px",
            marginBottom: "35px",
          }}
        >
          <div
            className="site-layout-content">
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
          className="gradientBackground"
        >
          <a href={"mailto:eddiesonsimon@omnitechcorporation.com"} style={{ color: "black" }}>
            Powered By: Omnitech Business Solutions Corporation
          </a>
        </Footer>
      </Layout>
      ;
    </>
  );
}
