import { Divider, Rate, Space, Typography } from 'antd';
import styled from 'styled-components';
import { COLOR } from '../../../utils/color';
import TextArea from 'antd/es/input/TextArea';
import { useOneLineReview } from '../../../hook/use-oneline-review';
import { oneLineReviewStore } from '../../../store/online-review-store';
import { ITEM_TYPE } from '../../../type';
import { Spinner } from '../Spinner';

const { Title } = Typography;
export const SimpleReview = ({ item }: { item: ITEM_TYPE; close: () => void }) => {
  const { text, rating, id, updateRating, updateText, isUpdate, setUpdate } = oneLineReviewStore();
  const { addOneLineReview, updateOneLineReview, isLoading } = useOneLineReview();

  return (
    <>
      {isLoading && <Spinner />}
      <Space direction="vertical" align={'center'} style={{ width: '100%' }}>
        <Title level={4}>만족한 정도를 알려주세요.</Title>
        <Rate value={rating} allowHalf style={{ fontSize: 40, color: COLOR.default }} onChange={updateRating} />
      </Space>
      <Divider style={{ margin: 50 }} />
      <AreaContainer direction="vertical" align={'center'} style={{ width: '100%' }}>
        <TextArea
          value={text}
          onChange={(e) => updateText(e.target.value)}
          placeholder="테마에 대해 알려주세요."
          style={{ height: 120 }}
        />
      </AreaContainer>
      <Divider />
      <CompleteContainer>
        <CompleteButton
          onClick={async () => {
            if (!isUpdate) {
              await addOneLineReview({
                id,
                rating,
                text,
                themeId: item.id,
              });
            } else {
              await updateOneLineReview({
                id,
                rating,
                text,
                themeId: item.id,
              });
            }
            setUpdate(true);
          }}
        >
          {isUpdate ? '수정' : '완료'}
        </CompleteButton>
      </CompleteContainer>
    </>
  );
};

const CompleteButton = styled.button`
  background-color: ${COLOR.lightBlue};
  width: 100%;
  height: 50px;
  color: white;
  font-size: 22px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const CompleteContainer = styled.div`
  width: 100%;
  bottom: 0;
`;

const AreaContainer = styled(Space)`
  width: 100%;
  flex: 1;

  .ant-space-item {
    width: 100%;
    text-align: center;
    padding-left: 20px;
    padding-right: 20px;
    box-sizing: border-box;
  }
`;
