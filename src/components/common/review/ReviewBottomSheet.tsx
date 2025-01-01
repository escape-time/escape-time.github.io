import { BottomSheet } from 'react-spring-bottom-sheet';
import { ITEM_TYPE } from '../../../type';
import { Flex } from 'antd';
import 'react-spring-bottom-sheet/dist/style.css';
import styled from 'styled-components';
import { Typography } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { ReviewTab } from './ReviewTab';
import { DetailReview } from './DetailReview';
import { ReviewThemeItem } from './ReviewThemeItem';
import { useState } from 'react';
import { SimpleReview } from './SimpleReview';
import { COLOR } from '../../../utils/color';

const { Title } = Typography;
enum REVIEW_TYPE {
  SIMPLE = 'simple',
  DETAIL = 'detail',
}
export const ReviewBottomSheet = ({
  open,
  close,
  item,
}: {
  open: boolean;
  item: ITEM_TYPE | undefined;
  close: () => void;
}) => {
  const [reviewType, setReviewType] = useState(REVIEW_TYPE.SIMPLE);

  if (!item) return <></>;
  return (
    <BottomSheet
      expandOnContentDrag={false}
      maxHeight={window.innerHeight * 0.9}
      onDismiss={close}
      open={open}
      scrollLocking={true}
      snapPoints={({ minHeight, maxHeight }) => [minHeight, maxHeight]}
      style={{ zIndex: 1000 }}
    >
      <div id="date-picker-container"></div>
      <ItemWrap>
        <TitleContainer>
          <TitleInner justify="space-between" align="center">
            <div style={{ height: 40, width: 40 }}></div>
            <Title style={{ margin: 0 }} level={4}>
              리뷰
            </Title>
            <Flex style={{ width: 40, paddingBottom: 5 }}>
              <CloseOutlined onClick={close} width={48} height={48} />
            </Flex>
          </TitleInner>
        </TitleContainer>
        <ReviewThemeItem item={item} />
        <ReviewTab type={reviewType} setType={(type: REVIEW_TYPE) => setReviewType(type)} />
        {reviewType === REVIEW_TYPE.SIMPLE && <SimpleReview item={item} close={close} />}
        {reviewType === REVIEW_TYPE.DETAIL && <DetailReview item={item} />}
      </ItemWrap>
    </BottomSheet>
  );
};

const TitleContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  padding-top: 10px;
  box-sizing: border-box;
  padding-bottom: 5px;
  border-bottom: 1px solid ${COLOR.borderColor};
  background-color: white;

  h2 {
    padding-top: 10px;
    margin-bottom: 0;
  }
`;

const TitleInner = styled(Flex)`
  max-width: 800px;
  margin: 0 auto;
  padding-left: 20px;
  padding-right: 20px;
`;

const ItemWrap = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;
