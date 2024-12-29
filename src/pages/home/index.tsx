import styled from 'styled-components';
import { List } from '../../components/home/List';
import { Flex } from 'antd';
import { useOneLineReview } from '../../hook/use-oneline-review';
import { useEffect } from 'react';
import { useAuth } from '../../hook/use-auth';
import { useDetailReview } from '../../hook/use-detail-review';
import { Spinner } from '../../components/common/Spinner';

export const App = () => {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { oneLineReviewList, getOneLineReviewList } = useOneLineReview();
  const { detailReviewList, getDetailReviewList } = useDetailReview();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      return;
    }
    Promise.all([getOneLineReviewList(), getDetailReviewList()]);
  }, [isAuthenticated, authLoading, getOneLineReviewList, getDetailReviewList]);

  return (
    <>
      {authLoading && <Spinner />}
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
