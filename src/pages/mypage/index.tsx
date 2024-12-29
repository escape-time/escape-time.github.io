import { useEffect } from 'react';
import { useAuth } from '../../hook/use-auth';
import { loginModalStore } from '../../store/login-modal-store';
import { Button, Divider, Flex, Spin, Typography } from 'antd';
import styled from 'styled-components';
import { COLOR } from '../../utils/color';
import { useOneLineReview } from '../../hook/use-oneline-review';
import { useDetailReview } from '../../hook/use-detail-review';

const { Title } = Typography;
export const MyPage = () => {
  const { showVisible } = loginModalStore();
  const { isAuthenticated, user, isLoading, signOutKakao } = useAuth();
  const { oneLineReviewList, getOneLineReviewList } = useOneLineReview();
  const { detailReviewList, getDetailReviewList } = useDetailReview();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      showVisible();
      return;
    }
    Promise.all([getOneLineReviewList(), getDetailReviewList()]);
  }, [isAuthenticated, isLoading, showVisible, getOneLineReviewList, getDetailReviewList]);

  if (isLoading)
    return (
      <Flex
        align="center"
        justify="center"
        style={{ height: '100%', overflow: 'hidden', paddingTop: '25%', paddingBottom: '25%' }}
      >
        <Spin size="large" />
      </Flex>
    );

  return (
    <Container>
      <Bg></Bg>
      <LogoutContainer>
        <Button type="link" onClick={signOutKakao}>
          로그아웃
        </Button>
      </LogoutContainer>
      <ProfileContent>
        <ProfileContainer vertical align="center" justify="center">
          <img src={user?.user_metadata?.avatar_url || user?.user_metadata?.picture} />
          <Title level={5}>{user?.user_metadata?.email}</Title>
        </ProfileContainer>
        <Divider />
        <ReviewCntContainer justify="space-around">
          <Title level={4}>간단 리뷰({oneLineReviewList.length})</Title>
          <Title level={4}>상세리뷰({detailReviewList.length})</Title>
        </ReviewCntContainer>
        <Divider />
      </ProfileContent>
    </Container>
  );
};

const Bg = styled.div`
  width: 100%;
  height: 150px;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  background-image: url(/assets/bg.jpg);
  background-repeat: no-repeat;
`;

const Container = styled.div``;

const LogoutContainer = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
`;

const ProfileContent = styled.div`
  position: relative;
  top: -80px;
`;

const ProfileContainer = styled(Flex)`
  width: 100%;
  border-radius: 50%;

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 1px solid ${COLOR.default};
    margin-bottom: 10px;
  }
`;

const ReviewCntContainer = styled(Flex)``;
