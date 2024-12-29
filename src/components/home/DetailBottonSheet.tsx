import { BottomSheet } from 'react-spring-bottom-sheet';
import { ITEM_TYPE } from '../../type';
import 'react-spring-bottom-sheet/dist/style.css';
import styled from 'styled-components';
import { Link } from 'react-router';
import { useModalStore } from '../../store/modal-store';
import { Button, Divider, Space } from 'antd';
import { formatKoreanCurrency } from '../../utils';
import { COLOR } from '../../utils/color';

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
          <Divider />
          <TopTitle>{item?.title}</TopTitle>
          <Divider />
          <InfoContainer>
            <DescTitle>기타 정보</DescTitle>
            <InfoTitle>시간 : {item?.playtime}분</InfoTitle>
            <InfoTitle>1인 가격 : {formatKoreanCurrency(item?.price || 0)}</InfoTitle>
            <InfoTitle>위치 : {item?.address}</InfoTitle>
            <InfoTitle>지점 이름 : {item?.branchName}</InfoTitle>
            <InfoTitle>전화 : {item?.branchTel}</InfoTitle>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
              <Button
                size="large"
                style={{ paddingBottom: 0 }}
                onClick={() => window.open(`https://map.naver.com/v5/search/${item?.address}`, '_blank')}
              >
                위치
              </Button>
            </div>
          </InfoContainer>
          <Divider />
        </Inner>

        <Space>
          <Link to={`/review?id=${item.id}`}>
            <Button size="large" style={{ paddingBottom: 0 }} type="primary">
              리뷰 쓰기
            </Button>
          </Link>

          <Button
            size="large"
            style={{ paddingBottom: 0 }}
            type="default"
            onClick={() => {
              close();
              setSelectedId(item.id);
              setIsVisible(true);
            }}
          >
            공유하기
          </Button>
        </Space>
      </ItemInner>
    </BottomSheet>
  );
};

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
  padding-bottom: 80px;
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
`;

const ItemImg = styled.img`
  height: 200px;
  border-radius: 20px;
  margin-bottom: 20px;
  margin-right: 20px;
`;

const InfoContainer = styled.div``;

const InfoTitle = styled.h4`
  font-size: 14px;
  line-height: 18px;
  color: ${COLOR.default};
  text-align: center;
`;

const DescTitle = styled.h2`
  font-size: 24px;
  line-height: 32px;
  text-align: center;
  margin-bottom: 10px;
  color: #222831;
`;

const TopTitle = styled.h2`
  font-size: 28px;
  line-height: 38px;
  margin: 0;
  vertical-align: middle;
  color: #222831;
`;
