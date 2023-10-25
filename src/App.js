import 'antd/dist/antd.less';
import './static/css/mystyle.css';
import './static/css/style.css';
import 'sweetalert2/dist/sweetalert2.css';
import 'animate.css'
import { ConfigProvider } from 'antd';
import { ThemeProvider } from 'styled-components';
import config from './config/config';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RouterProvider } from 'react-router-dom';
import routes from './routes';
import React from 'react';

const { themeColor, rtl, topMenu, mainTemplate } = config;
const queryClient = new QueryClient();

export const ThemeContext = React.createContext();
function App() {
  return <>
    <ConfigProvider>
      <ThemeProvider theme={{
        ...themeColor,
        rtl,
        topMenu,
        mainContent: mainTemplate
      }}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={routes} />
        </QueryClientProvider>
      </ThemeProvider>
    </ConfigProvider>
  </>;
}

export default App;
