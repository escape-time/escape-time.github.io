import { useParams } from 'react-router';
import data from '../../assets/data/new-data.json';
import styled from 'styled-components';
import { Button, Divider, Flex, Space, Typography } from 'antd';
import { useModalStore } from '../../store/modal-store';
import { formatKoreanCurrency } from '../../utils';
import { COLOR } from '../../utils/color';
import { BackHeader } from '../../components/common/BackHeader';
import { useEffect, useRef } from 'react';

const { Title, Text } = Typography;
export const Details = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { setIsVisible, setSelectedId } = useModalStore();
  const { id } = useParams();
  const item = data.find((i) => i.id === id);
  const isPush = item?.description.includes('밀어내기');

  useEffect(() => {
    ref.current?.scrollIntoView();
  }, []);

  return (
    <Wrap ref={ref}>
      <Inner wrap align="center" justify="center">
        <BackHeader title={item?.title + '' || ''} />
        <Divider />

        <ImgContainer justify="center">
          <img src={`/assets/theme-img/thumb_${id}.jpg`} alt="" />
          {item?.isHorror && (
            <HorrorTextContainer>
              <GenreTag color="danger" variant="solid">
                공포
              </GenreTag>
            </HorrorTextContainer>
          )}

          {isPush && (
            <PushTextContainer>
              <GenreTag color="default" variant="solid">
                밀어내기
              </GenreTag>
            </PushTextContainer>
          )}
        </ImgContainer>
        <Space direction={'vertical'} size={0} align="center">
          <Text type="secondary">{item?.branchName}</Text>
          <ItemTitle level={2}>{item?.title}</ItemTitle>
        </Space>

        <Divider />

        <Space direction={'vertical'}>
          <DescTitle level={3}>시놉시스</DescTitle>
          <Description level={4}>{item?.description}</Description>
        </Space>

        <Divider />

        <Space direction={'vertical'}>
          <DescTitle level={3}>기타 정보</DescTitle>
          <InfoTitle level={5}>
            시간 : {item?.playtime}분<br />
            1인 가격 : {formatKoreanCurrency(item?.price || 0)}
            <br />
            위치 : {item?.address}
            <br />
            지점 이름 : {item?.branchName}
            <br />
            전화 : {item?.branchTel}
          </InfoTitle>

          <Flex justify="center">
            <Space>
              <Button
                size="large"
                style={{ paddingBottom: 0 }}
                onClick={() => window.open(`https://map.naver.com/v5/search/${item?.address}`, '_blank')}
              >
                위치
              </Button>

              <Button
                type="primary"
                style={{ paddingBottom: 0 }}
                size="large"
                onClick={() => {
                  window.open(`${item?.page}`, '_blank');
                }}
              >
                홈페이지
              </Button>
            </Space>
          </Flex>
        </Space>

        <Divider />
        <ButtonContainer>
          <Space>
            <Button
              size="large"
              style={{ paddingBottom: 0 }}
              onClick={() => {
                setSelectedId(item?.id || '');
                setIsVisible(true);
              }}
            >
              공유
            </Button>
          </Space>
        </ButtonContainer>
      </Inner>
    </Wrap>
  );
};

const GenreTag = styled(Button)`
  pointer-events: none;
  cursor: default;
  opacity: 1 !important;
  user-select: none;
  border-radius: 0;
  padding-bottom: 0;
  &:hover,
  &:focus,
  &:active {
    opacity: 1 !important;
    transform: none !important;
    box-shadow: none !important;
  }
`;

const ItemTitle = styled(Title)`
  text-align: center;
`;

const ImgContainer = styled(Flex)`
  width: 100%;
  position: relative;
  margin-bottom: 10px;

  img {
    width: 300px;
  }
`;

const PushTextContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 40px;
  padding-bottom: 0;
`;

const HorrorTextContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 22px;
  padding-bottom: 0;
`;

const Wrap = styled.div`
  overflow: hidden;
`;

const Inner = styled(Flex)`
  max-width: 400px;
  margin: 0 auto;
  padding-left: 10px;
  padding-right: 10px;
`;

const DescTitle = styled(Title)`
  text-align: center;
`;

const Description = styled(Title)`
  white-space: pre-wrap;
  text-align: center;
  color: ${COLOR.gray} !important;
`;

const ButtonContainer = styled.div`
  padding-bottom: 20px;
`;

const InfoTitle = styled(Title)`
  color: ${COLOR.gray} !important;
  text-align: center;
`;
