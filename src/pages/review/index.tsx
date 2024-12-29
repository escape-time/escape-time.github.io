import { useSearchParams } from 'react-router';
import data from '../../assets/data/new-data.json';
import styled from 'styled-components';

export const ReviewPage = () => {
  const [params] = useSearchParams();
  const id = params.get('id');
  const selectItem = data.find((i) => i.id === id);

  return <Container></Container>;
};

const Container = styled.div``;
