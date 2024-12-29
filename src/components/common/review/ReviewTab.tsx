import { Divider, Flex } from 'antd';
import styled from 'styled-components';
import { COLOR } from '../../../utils/color';
enum REVIEW_TYPE {
  SIMPLE = 'simple',
  DETAIL = 'detail',
}
export const ReviewTab = ({ type, setType }: { type: REVIEW_TYPE; setType: (type: REVIEW_TYPE) => void }) => {
  return (
    <>
      <Divider />
      <TabContainer>
        <Tab
          justify="center"
          align="center"
          $isActive={type === REVIEW_TYPE.SIMPLE}
          onClick={() => setType(REVIEW_TYPE.SIMPLE)}
        >
          1줄 리뷰
        </Tab>
        <Tab
          justify="center"
          align="center"
          $isActive={type === REVIEW_TYPE.DETAIL}
          onClick={() => setType(REVIEW_TYPE.DETAIL)}
        >
          상세 리뷰
        </Tab>
      </TabContainer>
    </>
  );
};

const TabContainer = styled(Flex)`
  margin-bottom: 36px;
  margin-bottom: 50px;
`;

const Tab = styled(Flex)<{ $isActive?: boolean }>`
  flex: 1;
  height: 100%;
  color: ${({ $isActive }) => ($isActive ? COLOR.lightBlue : COLOR.gray)};
  cursor: pointer;
  border-bottom-width: 2px;
  border-bottom-color: ${({ $isActive }) => ($isActive ? COLOR.lightBlue : COLOR.borderColor)};
  border-bottom-style: solid;
  padding-bottom: 20px;
  transition: 0.3s;

  &:hover {
    color: ${COLOR.lightBlue};
    transition: 0.3s;
  }
`;
