import { BottomSheet } from 'react-spring-bottom-sheet';
import { ITEM_TYPE } from '../../type';
import 'react-spring-bottom-sheet/dist/style.css';
import styled from 'styled-components';
import { Link } from 'react-router';
import { useModalStore } from '../../store/modal-store';
import { Button, Space } from 'antd';

export const DetailBottomSheet = ({
  open,
  close,
  item,
}: {
  open: boolean;
  item: ITEM_TYPE | undefined;
  close: () => void;
}) => {
  const { setIsVisible, setSelectedId } = useModalStore();

  if (!item) return <></>;
  return (
    <BottomSheet
      className={'a'}
      expandOnContentDrag={false}
      maxHeight={window.innerHeight * 0.9}
      onDismiss={close}
      open={open}
      scrollLocking={true}
      snapPoints={({ minHeight, maxHeight }) => [minHeight, maxHeight]}
    >
      <ItemInner>
        <Inner>
          <ItemImg src={`/assets/theme-img/thumb_${item.id}.jpg`} alt="" />
          <Desc>
            <Title>{item.title}</Title>
            <h2>{item.description}</h2>
          </Desc>
        </Inner>

        <Space>
          <Button
            size="large"
            style={{ fontFamily: 'Tenada', paddingBottom: 0 }}
            type="primary"
            onClick={() => {
              close();
              setSelectedId(item.id);
              setIsVisible(true);
            }}
          >
            공유하기
          </Button>
          <Link to={`/details/${item.id}`}>
            <Button size="large">자세히 보기</Button>
          </Link>
        </Space>
      </ItemInner>
    </BottomSheet>
  );
};

const Title = styled.h2`
  font-size: 24px;
  line-height: 32px;
  margin-bottom: 10px;
`;

const ItemInner = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  max-width: 600px;
  margin: 0 auto;
  position: relative;
  padding-bottom: 20px;
  flex-direction: column;
  padding-top: 50px;
`;

const Inner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
`;

const Desc = styled.div``;

const ItemImg = styled.img`
  height: 200px;
  border-radius: 20px;
  margin-bottom: 20px;
  margin-right: 20px;
`;
