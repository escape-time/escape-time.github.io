import styled from 'styled-components';
import { List } from '../../components/home/List';
import { Flex } from 'antd';
import { useEffect } from 'react';
import { Spinner } from '../../components/common/Spinner';
import { authStore } from '../../store/auth-store';
import { detailReviewStore } from '../../store/detail-review-store';
import { oneLineReviewStore } from '../../store/online-review-store';

export const Home = () => {
  const { user, loading } = authStore();
  const { getOneLineReviewList } = oneLineReviewStore();
  const { getDetailReviewList } = detailReviewStore();

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
        <List />
      </Inner>
    </>
  );
};

const Inner = styled(Flex)`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;
