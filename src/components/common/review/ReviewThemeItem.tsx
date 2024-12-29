import { Flex, Typography } from 'antd';
import styled from 'styled-components';
import { ITEM_TYPE } from '../../../type';

const { Title, Text } = Typography;
export const ReviewThemeItem = ({ item }: { item: ITEM_TYPE }) => {
  return (
    <>
      <ThemeContainer align="center" justify="center" style={{ position: 'relative' }}>
        <ThemeImage src={`/assets/theme-img/thumb_${item.id}.jpg`} alt="" />
      </ThemeContainer>
      <ThemeTitleContainer vertical justify="center" align="center">
        <Text type="secondary">{item.branchName}</Text>
        <Title level={5}>{item.title}</Title>
      </ThemeTitleContainer>
    </>
  );
};

const ThemeImage = styled.img`
  width: 240px;
  height: 330px;
`;

const ThemeContainer = styled(Flex)`
  width: 320px;
  margin: 0 auto;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  padding-top: 60px;
`;

const ThemeTitleContainer = styled(Flex)`
  width: 100%;
  position: relative;
  height: 100%;
  margin-top: 10px;
`;
