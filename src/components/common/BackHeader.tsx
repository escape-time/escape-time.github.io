import { LeftOutlined } from '@ant-design/icons';
import { Flex, Typography } from 'antd';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

const { Title } = Typography;
export const BackHeader = ({ title }: { title: string }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <BackContainer align="center" justify="space-between">
      <LeftOutlined onClick={handleBackClick} />
      <Title level={3}>{title}</Title>
      <div style={{ width: 15, height: 15 }}></div>
    </BackContainer>
  );
};

const BackContainer = styled(Flex)`
  width: 100%;
  padding-top: 32px;
  span {
    margin-bottom: 10px;
  }
`;
