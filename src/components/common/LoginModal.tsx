import { Button, Flex, Modal, Space } from 'antd';
import { loginModalStore } from '../../store/login-modal-store';
import { useAuth } from '../../hook/use-auth';
import Title from 'antd/es/typography/Title';
import styled from 'styled-components';
import Logo from '/assets/logo.png';

export const LoginModal = () => {
  const { isVisible, hideVisible } = loginModalStore();
  const { signInWithGoogle, signInWithKakao } = useAuth();
  return (
    <Modal title="로그인" centered open={isVisible} onCancel={hideVisible} footer={[]}>
      <Space direction="vertical" style={{ width: '100%', margin: '20px auto' }}>
        <Title style={{ textAlign: 'center' }} level={4}>
          로그인을 하시고,
          <br /> 친구들과 리뷰 공유해 보세요!
        </Title>
        <LogoContainer justify="center">
          <img src={Logo} alt="logo" style={{ width: '80px', height: '80px' }} />
        </LogoContainer>
        <Flex vertical style={{ width: '100%' }}>
          <SocialLoginContainer>
            <KakaoLoginButton onClick={signInWithKakao}>카카오 로그인</KakaoLoginButton>
          </SocialLoginContainer>
          <SocialLoginContainer>
            <GoogleLoginButton onClick={signInWithGoogle}>구글 로그인</GoogleLoginButton>
          </SocialLoginContainer>
        </Flex>
      </Space>
    </Modal>
  );
};

const SocialLoginContainer = styled(Flex)`
  margin-bottom: 5px;
`;

const KakaoLoginButton = styled(Button)`
  flex: 1;
  background-color: #fee500;
  height: 40px;

  &:hover {
    color: black !important;
    background-color: #fee500 !important;
  }
`;

const GoogleLoginButton = styled(Button)`
  flex: 1;
  height: 40px;

  &:hover {
    color: black !important;
  }
`;

const LogoContainer = styled(Flex)`
  margin: 20px 0;
`;
