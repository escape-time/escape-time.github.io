import styled from 'styled-components';
import { List } from '../../components/home/List';
import { Flex } from 'antd';
import { useOneLineReview } from '../../hook/use-oneline-review';
import { useEffect } from 'react';
import { useDetailReview } from '../../hook/use-detail-review';
import { Spinner } from '../../components/common/Spinner';
import { authStore } from '../../store/auth-store';

export const Home = () => {
  const { user, loading } = authStore();
  const { oneLineReviewList, getOneLineReviewList } = useOneLineReview();
  const { detailReviewList, getDetailReviewList } = useDetailReview();

  useEffect(() => {
    if (!loading && !user) {
      return;
    }
    Promise.all([getOneLineReviewList(), getDetailReviewList()]);
  }, [user, loading, getOneLineReviewList, getDetailReviewList]);

  return (
    <>
      {loading && <Spinner />}
      <Inner wrap justify="center">
        <List oneLineReviewList={oneLineReviewList} detailReviewList={detailReviewList} />
      </Inner>
    </>
  );
};

const Inner = styled(Flex)`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;
