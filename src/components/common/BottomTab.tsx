import {
  CalendarFilled,
  CalendarOutlined,
  HomeFilled,
  HomeOutlined,
  StarFilled,
  StarOutlined,
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router';
import styled from 'styled-components';
import { COLOR } from '../../utils/color';
import { Flex, Typography } from 'antd';

const { Title } = Typography;

export const BottomTab = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <BottomTabContainer>
      <Inner wrap align="center" justify="space-between">
        <Tab to="/">
          {isActive('/') ? <HomeFilled /> : <HomeOutlined />}
          <TabText level={5} $isActive={isActive('/')}>
            홈
          </TabText>
        </Tab>

        <Tab to="/calendar">
          {isActive('/calendar') ? <CalendarFilled /> : <CalendarOutlined />}
          <TabText level={5} $isActive={isActive('/calendar')}>
            달력
          </TabText>
        </Tab>

        <Tab to="/mypage">
          {isActive('/mypage') ? <StarFilled /> : <StarOutlined />}
          <TabText level={5} $isActive={isActive('/review')}>
            마이
          </TabText>
        </Tab>
      </Inner>
    </BottomTabContainer>
  );
};

const BottomTabContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: white;
  z-index: 11;
  border-top: 1px solid ${COLOR.borderColor};
`;

const Inner = styled(Flex)`
  width: 100%;
  max-width: 800px;
  margin: 0px auto;
  box-sizing: border-box;
  height: 100%;

  svg {
    height: 22px;
  }
`;

const Tab = styled(Link)`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 100%;

  svg {
    width: 20px;
    fill: ${COLOR.default};
    margin-bottom: 5px;
  }
`;

const TabText = styled(Title)<{ $isActive: boolean }>`
  color: ${({ $isActive }) => ($isActive ? COLOR.default : '#666')} !important;
`;
