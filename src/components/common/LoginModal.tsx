import { Button, Modal } from 'antd';
import { loginModalStore } from '../../store/login-modal-store';
import { useAuth } from '../../hook/use-auth';

export const LoginModal = () => {
  const { isVisible, hideVisible } = loginModalStore();
  const { signInWithGoogle, signInWithKakao } = useAuth();
  return (
    <Modal
      centered
      open={isVisible}
      onCancel={hideVisible}
      footer={[
        <Button key="cancel" onClick={hideVisible}>
          닫기
        </Button>,
      ]}
    >
      <Button onClick={signInWithKakao}>카카오 로그인</Button>
      <Button onClick={signInWithGoogle}>구글 로그인</Button>
    </Modal>
  );
};
