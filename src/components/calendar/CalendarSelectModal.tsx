import { Button, DatePicker, Flex, Form, Input, Modal, TimePicker } from 'antd';
import type { Dispatch, SetStateAction } from 'react';

export const CalendarSelectModal = ({
  isModalVisible,
  setIsModalVisible,
}: {
  isModalVisible: boolean;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
}) => {
  const [form] = Form.useForm();
  const handleModalOk = () => {
    setIsModalVisible(false);
    form.resetFields();
  };
  return (
    <Modal
      centered
      title={'새 이벤트'}
      open={isModalVisible}
      onOk={handleModalOk}
      onCancel={() => {
        setIsModalVisible(false);
        form.resetFields();
      }}
      okText={'생성'}
      cancelText="취소"
    >
      <Form form={form} layout="vertical">
        <Form.Item name="title" label="제목" rules={[{ required: true, message: '제목을 입력하세요' }]}>
          <Flex>
            <Input style={{ marginRight: 10 }} />
            <Button>테마 찾기</Button>
          </Flex>
        </Form.Item>

        <Form.Item name="description" label="설명">
          <Input.TextArea />
        </Form.Item>

        <Flex>
          <Form.Item rules={[{ required: true, message: '시작 날짜을 선택하세요' }]}>
            <DatePicker name="start_date" format="YYYY-MM-DD" style={{ width: 130, marginRight: 5 }} suffixIcon />
          </Form.Item>
          <Form.Item>
            <TimePicker name="start_time" style={{ width: 90 }} suffixIcon />
          </Form.Item>
        </Flex>

        <Flex>
          <Form.Item rules={[{ required: true, message: '종료 날짜을 선택하세요' }]}>
            <DatePicker name="end_date" format="YYYY-MM-DD" style={{ width: 130, marginRight: 5 }} suffixIcon />
          </Form.Item>

          <Form.Item rules={[{ required: true, message: '종료 날짜을 선택하세요' }]}>
            <TimePicker name="end_time" style={{ width: 90 }} suffixIcon />
          </Form.Item>
        </Flex>
      </Form>
    </Modal>
  );
};
