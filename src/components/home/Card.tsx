import { Button, Flex, Typography } from 'antd';
import { ITEM_TYPE } from '../../type';
import styled from 'styled-components';
import { useModalStore } from '../../store/modal-store';
import { Link, useNavigate } from 'react-router';
import { useState } from 'react';
import { ReviewBottomSheet } from '../common/review/ReviewBottomSheet';
import { COLOR } from '../../utils/color';
import { loginModalStore } from '../../store/login-modal-store';
import { authStore } from '../../store/auth-store';
import { oneLineReviewStore } from '../../store/online-review-store';
import { detailReviewStore } from '../../store/detail-review-store';
import { CalendarFilled } from '@ant-design/icons';

const { Title } = Typography;
export const Card = ({ item }: { item: ITEM_TYPE }) => {
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectItem, setSeletItem] = useState<ITEM_TYPE>();
  const { oneLineReviewList } = oneLineReviewStore();
  const { detailReviewList } = detailReviewStore();
  const { showVisible } = loginModalStore();
  const { user } = authStore();
  const { setIsVisible, setSelectedId } = useModalStore();
  const oneLineReview = oneLineReviewList.find((i) => i.theme_id === item?.id);
  const detailReview = detailReviewList.find((i) => i.theme_id === item?.id);

  const handleImageError: React.ReactEventHandler<HTMLImageElement> = (e) => {
    const target = e.target as HTMLImageElement;
    target.src = '/default-image.png';
  };

  return (
    <>
      <ReviewBottomSheet
        open={open}
        close={() => {
          setOpen(false);
        }}
        item={selectItem}
      />
      <CardWrap key={item.id} style={{ backgroundColor: oneLineReview || detailReview ? '#21f765' : '' }}>
        <CalendarContainer onClick={() => nav(`/calendar?themeId=${item.id}`)}>
          <CalendarFilled />
        </CalendarContainer>
        {item.isHorror && (
          <HorrorTextContainer>
            <GenreTag color="danger" variant="solid">
              공포
            </GenreTag>
          </HorrorTextContainer>
        )}
        <Link to={`/details/${item.id}`}>
          <Flex align="center" vertical>
            <ImageWrapper>
              <img src={`/assets/theme-img/thumb_${item.id}.jpg`} alt={item.title} onError={handleImageError} />
            </ImageWrapper>

            <TextContainer>
              <CardTitle level={3} ellipsis>
                {item.title}
              </CardTitle>
            </TextContainer>

            <InfoContainer justify="space-between">
              <Info level={5}>
                가격 <br /> {item.price}
              </Info>
              <Info level={5}>
                위치 <br /> {item.location}
              </Info>
              <Info level={5}>
                시간 <br />
                {item.playtime}
              </Info>
            </InfoContainer>
          </Flex>
        </Link>
        <Flex>
          <BottomButton
            size="large"
            type="primary"
            onClick={() => {
              setSelectedId(item.id);
              setIsVisible(true);
            }}
          >
            공유하기
          </BottomButton>
          <BottomButton
            size="large"
            type="default"
            onClick={() => {
              if (!user) {
                showVisible();
                return;
              }
              setOpen(true);
              setSeletItem(item);
            }}
          >
            리뷰{oneLineReview || detailReview ? '수정' : '작성'}
          </BottomButton>
        </Flex>
      </CardWrap>
    </>
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

const HorrorTextContainer = styled.div`
  position: absolute;
  top: 98px;
  right: 0px;
  padding-bottom: 0;
  z-index: 2;
`;

const BottomButton = styled(Button)`
  width: 100%;
  flex: 1;
  border-radius: 0;

  &:nth-child(1) {
    border-bottom-left-radius: 10px;
  }

  &:nth-child(2) {
    border-bottom-right-radius: 10px;
    border: none;
  }
`;

const CalendarContainer = styled.div`
  position: absolute;
  right: 0px;
  top: 0px;
  background-color: white;
  padding-left: 3px;
  padding-right: 3px;
  border-radius: 10px;

  font-size: 30px;
  svg {
    fill: ${COLOR.lightBlue};
  }
`;

const CardWrap = styled.section`
  position: relative;
  width: calc(25% - 20px);
  border-radius: 10px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.5);
  text-decoration: none;
  transition: 0.3s ease;
  cursor: pointer;
  flex-shrink: 0;

  margin-right: 10px;
  margin-left: 10px;
  margin-bottom: 20px;
  box-sizing: border-box;

  &:hover {
    transform: scale(1.05);
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.6);
  }

  @media (max-width: 767px) {
    width: calc(50% - 10px);
    margin-right: 5px;
    margin-left: 5px;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  height: 130px;

  img {
    width: 100%;
    height: 100%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    object-fit: cover;
    object-position: center;
  }
`;

const TextContainer = styled.div`
  padding: 15px;
  width: 100%;
  box-sizing: border-box;
  padding-bottom: 10px;
`;

const CardTitle = styled(Title)`
  text-align: center;
  text-decoration: none;
`;

const InfoContainer = styled(Flex)`
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
  box-sizing: border-box;
  background: ${COLOR.default};
  padding-bottom: 10px;
  padding-top: 13px;
`;

const Info = styled(Title)`
  text-align: center;
  color: white !important;
  flex: 1;
`;
