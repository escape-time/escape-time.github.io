import {
  Button,
  Checkbox,
  DatePicker,
  Divider,
  Flex,
  Form,
  Input,
  message,
  Modal,
  Select,
  TimePicker,
  Typography,
} from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { SearchReviewList } from './SearchReviewList';
import data from '../../assets/data/new-data.json';
import { formatKoreanCurrency } from '../../utils';
import { CloseCircleFilled } from '@ant-design/icons';
import styled from 'styled-components';
import { Spinner } from '../common/Spinner';
import { authStore } from '../../store/auth-store';
import { useCalendarStore } from '../../store/date-event-store';
import { v4 } from 'uuid';
import { useLocation, useNavigate } from 'react-router';

const { Title, Text } = Typography;
export const CalendarSelectModal = ({ reviewId, clearReview }: { reviewId: string; clearReview: () => void }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const { addEvent, updateEvent, isLoading, hideVisible, selectDate, isModalVisible, showVisible, events } =
    useCalendarStore();
  const [isAlwaysChecked, setIsAlwaysChecked] = useState(false);
  const { user } = authStore();
  const [themeId, setThemeId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const handleModalOk = async () => {
    form
      .validateFields()
      .then(() => {
        if (reviewId) {
          updateEventItem();
        } else {
          addEventItem();
        }
        hideVisible();
        clearReview();
      })
      .then(() => {
        messageApi.open({
          key: v4(),
          type: 'success',
          content: '일정을 추가하였습니다.',
          duration: 2,
        });
      })
      .catch((info) => {
        console.log(info);
        console.error('Validate Failed:', info);
      });
  };

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const themeIdParam = searchParams.get('themeId');

    if (themeIdParam) {
      showVisible();
      setThemeId(themeIdParam);

      // URL에서 themeId 제거
      searchParams.delete('themeId');
      const newUrl = searchParams.toString() ? `${location.pathname}?${searchParams.toString()}` : location.pathname;

      navigate(newUrl, { replace: true });
    }
  }, [location, navigate, showVisible]);

  const findTheme = data.find((d) => d.id === themeId);

  useEffect(() => {
    if (findTheme?.title) {
      form.setFieldsValue({ title: findTheme?.title ? findTheme?.title + '' || '' : '' });
    } else {
      form.setFieldsValue({ title: '' });
    }
  }, [findTheme, form]);

  const addEventItem = async () => {
    const newEvent = {
      title: form.getFieldValue('title'),
      description: form.getFieldValue('description'),
      start_date: form.getFieldValue('start_date'),
      end_date: form.getFieldValue('end_date'),
      start_time: form.getFieldValue('start_time'),
      end_time: form.getFieldValue('end_time'),
      theme_id: themeId || '',
      user_id: user?.id || '',
      is_always: form.getFieldValue('isAlways'),
      color: form.getFieldValue('color'),
    };

    await addEvent(newEvent);
  };

  const updateEventItem = async () => {
    const newEvent = {
      id: reviewId,
      title: form.getFieldValue('title'),
      description: form.getFieldValue('description'),
      start_date: form.getFieldValue('start_date'),
      end_date: form.getFieldValue('end_date'),
      start_time: form.getFieldValue('start_time'),
      end_time: form.getFieldValue('end_time'),
      theme_id: themeId || '',
      user_id: user?.id || '',
      is_always: form.getFieldValue('isAlways'),
      color: form.getFieldValue('color'),
    };

    await updateEvent(newEvent);
  };

  useEffect(() => {
    form.setFieldsValue({
      title: '',
      description: '',
      start_date: dayjs(selectDate),
      end_date: dayjs(selectDate),
      start_time: dayjs().minute(0).second(0),
      end_time: dayjs().add(1, 'hour').minute(0).second(0),
      color: '#808080',
      isAlways: false,
    });
  }, [selectDate, form]);

  useEffect(() => {
    if (reviewId) {
      showVisible();
      const targetReview = events.find((i) => i.id === reviewId);
      setThemeId(targetReview?.theme_id || '');
      form.setFieldsValue({
        title: targetReview?.title,
        description: targetReview?.description,
        start_date: dayjs(targetReview?.start_date),
        end_date: dayjs(targetReview?.end_date),
        start_time: dayjs(targetReview?.start_time),
        end_time: dayjs(targetReview?.end_time),
        color: targetReview?.color,
        isAlways: targetReview?.is_always,
      });
    }
  }, [reviewId, events, form, showVisible]);

  return (
    <>
      {contextHolder}
      {isLoading && <Spinner />}
      <Modal
        centered
        title={reviewId ? '수정 하기' : '새 이벤트'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => {
          hideVisible();
          form.resetFields();
          setThemeId(null);
          clearReview();
        }}
        okText={reviewId ? '수정' : '생성'}
        cancelText="취소"
      >
        <Form
          form={form}
          layout="vertical"
          onValuesChange={(changedValues) => {
            if ('isAlways' in changedValues) {
              setIsAlwaysChecked(changedValues.isAlways);
            }
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
          <Form.Item name="description" label="선택 된 테마" style={{ position: 'relative' }}>
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
                    <Text>
                      {formatKoreanCurrency(findTheme?.price || 0)}({findTheme?.playtime}분)
                    </Text>
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
              {!isAlwaysChecked && (
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

              {!isAlwaysChecked && (
                <Form.Item name="end_time">
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
          <Flex>
            <Form.Item name="color" label="">
              <Select
                style={{ width: 140, marginRight: 10 }}
                options={[
                  { value: '#808080', label: '회색' },
                  { value: '#36454F', label: '그레이' },
                  { value: '#000000', label: '블랙' },

                  // 차분한 컬러
                  { value: '#000080', label: '네이비' },
                  { value: '#800020', label: '버건디' },
                  { value: '#006400', label: '딥그린' },

                  // 파스텔톤
                  { value: '#AEC6CF', label: '블루' },
                  { value: '#FFD1DC', label: '핑크' },
                  { value: '#98FF98', label: '민트' },

                  // 자연색
                  { value: '#F5F5DC', label: '베이지' },
                  { value: '#C3B091', label: '카키' },
                  { value: '#808000', label: '올리브' },

                  // 밝은 컬러
                  { value: '#87CEEB', label: '스카이블루' },
                  { value: '#FF7F50', label: '코랄' },
                  { value: '#E6E6FA', label: '라벤더' },
                ]}
                optionRender={(option) => (
                  <span>
                    <span
                      style={{
                        display: 'inline-block',
                        width: 16,
                        height: 16,
                        marginRight: 8,
                        backgroundColor: option.value as string,
                        verticalAlign: 'middle',
                        fontFamily: 'Tenada',
                      }}
                    />
                    {option.label}
                  </span>
                )}
              />
            </Form.Item>

            <Form.Item name="isAlways" label="" valuePropName="checked">
              <Checkbox>종일</Checkbox>
            </Form.Item>
          </Flex>

          <Divider style={{ margin: 12 }} />
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
