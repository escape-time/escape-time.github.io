import { Button, Checkbox, DatePicker, Divider, Flex, Form, Input, Modal, TimePicker, Typography } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { SearchReviewList } from './SearchReviewList';
import data from '../../assets/data/new-data.json';
import { formatKoreanCurrency } from '../../utils';
import { CloseCircleFilled } from '@ant-design/icons';
import styled from 'styled-components';
import { supabase } from '../../utils/supabase';
import { Spinner } from '../common/Spinner';
import { authStore } from '../../store/auth-store';

const { Title, Text } = Typography;
export const CalendarSelectModal = ({
  isModalVisible,
  setIsModalVisible,
  selectDate,
}: {
  isModalVisible: boolean;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
  selectDate: string;
}) => {
  const { user } = authStore();
  const [loading, setLoading] = useState(false);
  const [themeId, setThemeId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [always, setAlways] = useState(false);
  const [form] = Form.useForm();
  const handleModalOk = () => {
    form
      .validateFields()
      .then((v) => {
        console.log(v);
        insertEvent();
        setIsModalVisible(false);
      })
      .catch((info) => {
        console.log(info);
        console.error('Validate Failed:', info);
      })
      .finally(() => {
        form.resetFields();
      });
  };

  const findTheme = data.find((d) => d.id === themeId);

  useEffect(() => {
    if (findTheme?.title) form.setFieldsValue({ title: findTheme?.title ? findTheme?.title + '' || '' : '' });
  }, [findTheme, form]);

  const insertEvent = async () => {
    setLoading(true);
    await supabase.from('calendar_events').insert({
      title: form.getFieldValue('title'),
      description: form.getFieldValue('description'),
      start_date: form.getFieldValue('start_date'),
      end_date: form.getFieldValue('end_date'),
      start_time: form.getFieldValue('start_time'),
      end_time: form.getFieldValue('end_time'),
      theme_id: themeId,
      user_id: user?.id,
      is_always: always,
      target_date: selectDate,
    });
    setLoading(false);
  };
  return (
    <>
      {loading && <Spinner />}
      <Modal
        centered
        title={'새 이벤트'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
          setThemeId(null);
        }}
        okText={'생성'}
        cancelText="취소"
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            start_date: dayjs(),
            end_date: dayjs(),
            start_time: dayjs().minute(0).second(0),
            end_time: dayjs().add(1, 'hour').minute(0).second(0),
          }}
        >
          <Flex align="center">
            <Form.Item
              name="title"
              label="제목"
              rules={[{ required: true, message: '제목을 입력하세요' }]}
              style={{ marginRight: 10 }}
            >
              <Input name="title" style={{ width: '100%' }} />
            </Form.Item>
            <Flex style={{ marginTop: 32 }}>
              <Button onClick={() => setOpen(true)}>테마 찾기</Button>
            </Flex>
          </Flex>

          <Divider style={{ margin: 12 }} />

          <Form.Item
            name="description"
            label="선택 된 테마"
            rules={[{ required: true, message: '테마를 선택하세요.' }]}
            style={{ position: 'relative' }}
          >
            {themeId && (
              <>
                <CloseIconContainer onClick={() => setThemeId(null)}>
                  <CloseCircleFilled />
                </CloseIconContainer>
                <Flex align="center" style={{ marginBottom: 20 }}>
                  <img src={`/assets/theme-img/thumb_${findTheme?.id}.jpg`} style={{ height: 80, marginRight: 10 }} />
                  <Flex vertical justify="center">
                    <Text type="secondary">{findTheme?.branchName}</Text>
                    <Title level={4}>{findTheme?.title}</Title>
                    <Flex>
                      <Text>
                        {formatKoreanCurrency(findTheme?.price || 0)}({findTheme?.playtime}분)
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              </>
            )}
          </Form.Item>

          <Flex vertical style={{ marginBottom: 12 }}>
            <Title level={5}>시작 시간</Title>
            <Flex>
              <Form.Item rules={[{ required: true, message: '시작 날짜을 선택하세요' }]} name="start_date">
                <DatePicker format="YYYY-MM-DD" style={{ width: 130, marginRight: 5 }} suffixIcon />
              </Form.Item>
              {!always && (
                <Form.Item name="start_time">
                  <TimePicker showNow={false} minuteStep={5} format="HH:mm" style={{ width: 120 }} suffixIcon />
                </Form.Item>
              )}
            </Flex>
          </Flex>

          <Flex vertical>
            <Title level={5}>종료 시간</Title>
            <Flex>
              <Form.Item rules={[{ required: true, message: '종료 날짜을 선택하세요' }]} name="end_date">
                <DatePicker format="YYYY-MM-DD" style={{ width: 130, marginRight: 5 }} suffixIcon />
              </Form.Item>

              {!always && (
                <Form.Item rules={[{ required: true, message: '종료 시간을 선택하세요' }]} name="end_time">
                  <TimePicker showNow={false} minuteStep={5} format="HH:mm" style={{ width: 120 }} suffixIcon />
                </Form.Item>
              )}
            </Flex>
          </Flex>

          <Divider style={{ margin: 12 }} />

          <Form.Item name="description" label="설명">
            <Input.TextArea />
          </Form.Item>

          <Divider style={{ margin: 12 }} />
          <Checkbox value={always} onChange={(e) => setAlways(e.target.checked)}>
            종일
          </Checkbox>
        </Form>
        <SearchReviewList open={open} close={() => setOpen(false)} selectThemeId={(id: string) => setThemeId(id)} />
      </Modal>
    </>
  );
};

const CloseIconContainer = styled.div`
  position: absolute;
  right: 0;
  top: -38px;
  cursor: pointer;
  font-size: 20px;
`;
