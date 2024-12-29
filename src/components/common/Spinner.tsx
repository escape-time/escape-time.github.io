import { Flex, Spin } from 'antd';
import styled from 'styled-components';

export const Spinner = () => {
  return (
    <>
      <Container align="center" justify="center">
        <Dim />
        <Spin size="large" />
      </Container>
    </>
  );
};

const Container = styled(Flex)`
  position: fixed;
  z-index: 9999999999999999999999999999;
  width: 100%;
  height: 100vh;
  left: 0;
  top: 0;
`;

const Dim = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1;
`;
