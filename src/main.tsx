import { createRoot } from 'react-dom/client';
import { Home } from './pages/home';
import { Routes, Route, HashRouter } from 'react-router';
import { Details } from './pages/details';
import { createGlobalStyle } from 'styled-components';
import { CommonModal } from './components/common/CommonModal';
import { ConfigProvider } from 'antd';
import { BottomTab } from './components/common/BottomTab';
import { ReviewPage } from './pages/review';
import { MyPage } from './pages/mypage';
import { LoginModal } from './components/common/LoginModal';
import { CalendarPage } from './pages/calendar';
import { COLOR } from './utils/color';

// eslint-disable-next-line react-refresh/only-export-components
const GlobalStyle = createGlobalStyle`
@font-face {
    font-family: 'Tenada';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2210-2@1.0/Tenada.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}
`;

createRoot(document.getElementById('root')!).render(
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: COLOR.lightBlue,
        colorLink: COLOR.lightBlue,
      },
    }}
  >
    <CommonModal />
    <LoginModal />
    <HashRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/review/:id" element={<ReviewPage />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
      <BottomTab />
    </HashRouter>
  </ConfigProvider>
);
