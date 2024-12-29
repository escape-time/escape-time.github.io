import type { Dayjs } from 'dayjs';
import { Button, Calendar, ConfigProvider, DatePicker, Form, Input, message, Modal, Row } from 'antd';
import 'dayjs/locale/ko';
import dayjs from 'dayjs';
import locale from 'antd/es/locale/ko_KR';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useCalendarEvents } from '../../hook/use-calendar-events';
import { useAuth } from '../../hook/use-auth';
import { useState } from 'react';
import { CalendarEvent } from '../../type';
import styled from 'styled-components';
import { SelectInfo } from 'antd/es/calendar/generateCalendar';
dayjs.locale('ko');

export const CalendarPage = () => {
  const { events, loading, createEvent, updateEvent, deleteEvent } = useCalendarEvents();
  const { user } = useAuth(); // 옵셔널
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const handleDateSelect = (value: dayjs.Dayjs, selectInfo: SelectInfo) => {
    if (selectInfo.source === 'date') {
      setIsModalVisible(true);
      form.setFieldsValue({
        start_time: value,
        end_time: value.add(1, 'hour'),
      });
    }
  };

  const handleEventClick = (event: CalendarEvent) => {
    console.log('handleEventClick');
    setSelectedEvent(event);
    setIsModalVisible(true);
    form.setFieldsValue({
      title: event.title,
      description: event.description,
      start_time: dayjs(event.start_time),
      end_time: dayjs(event.end_time),
    });
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      console.log(values);
      console.log(selectedEvent);
      if (selectedEvent) {
        // 수정 권한 확인
        if (selectedEvent.user_id && selectedEvent.user_id !== user?.id) {
          message.error('이 이벤트를 수정할 권한이 없습니다.');
          return;
        }
        await updateEvent(selectedEvent.id, values);
        message.success('이벤트가 수정되었습니다.');
      } else {
        await createEvent(values);
        message.success('이벤트가 생성되었습니다.');
      }
      setIsModalVisible(false);
      form.resetFields();
      setSelectedEvent(null);
    } catch (e) {
      message.error('처리 중 오류가 발생했습니다.');
    }
  };

  const handleDelete = async () => {
    if (!selectedEvent) return;

    // 삭제 권한 확인
    if (selectedEvent.user_id && selectedEvent.user_id !== user?.id) {
      message.error('이 이벤트를 삭제할 권한이 없습니다.');
      return;
    }

    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        await deleteEvent(selectedEvent.id);
        message.success('이벤트가 삭제되었습니다.');
        setIsModalVisible(false);
        form.resetFields();
        setSelectedEvent(null);
      } catch (e: any) {
        message.error('삭제 중 오류가 발생했습니다.');
      }
    }
  };

  const dateCellRender = (value: dayjs.Dayjs) => {
    const dayEvents = events.filter((event) => {
      const eventDate = dayjs(event.start_time);
      return eventDate.isSame(value, 'day');
    });

    return (
      <EventList>
        {dayEvents.map((event) => (
          <EventItem
            key={event.id}
            onClick={(e) => {
              e.stopPropagation();
              handleEventClick(event);
            }}
            $isOwner={event.user_id === user?.id}
          >
            {event.title}
          </EventItem>
        ))}
      </EventList>
    );
  };
  const headerRender = ({ value, onChange }: { value: Dayjs; onChange: (date: Dayjs) => void }) => {
    const current = value.clone();
    const year = current.year();

    const years = [];
    for (let i = year - 10; i < year + 10; i += 1) {
      years.push(i);
    }

    const handlePrevMonth = () => {
      const newDate = current.clone().subtract(1, 'month');
      onChange(newDate);
    };

    const handleNextMonth = () => {
      const newDate = current.clone().add(1, 'month');
      onChange(newDate);
    };

    const handleToday = () => {
      onChange(dayjs());
    };

    return (
      <Row justify="space-between" align="middle">
        <Button.Group>
          <Button icon={<LeftOutlined />} onClick={handlePrevMonth} />
          <Button icon={<RightOutlined />} onClick={handleNextMonth} />
        </Button.Group>
        <h3>{dayjs(value).format('YYYY-MM')}</h3>
        <Button onClick={handleToday}>오늘</Button>
      </Row>
    );
  };
  return (
    <ConfigProvider locale={locale}>
      <Calendar onSelect={handleDateSelect} fullscreen cellRender={dateCellRender} headerRender={headerRender} />
      <Modal
        title={selectedEvent ? '이벤트 수정' : '새 이벤트'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
          setSelectedEvent(null);
        }}
        okText={selectedEvent ? '수정' : '생성'}
        cancelText="취소"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="title" label="제목" rules={[{ required: true, message: '제목을 입력하세요' }]}>
            <Input />
          </Form.Item>

          <Form.Item name="description" label="설명">
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            name="start_time"
            label="시작 시간"
            rules={[{ required: true, message: '시작 시간을 선택하세요' }]}
          >
            <DatePicker showTime format="YYYY-MM-DD HH:mm" />
          </Form.Item>

          <Form.Item name="end_time" label="종료 시간" rules={[{ required: true, message: '종료 시간을 선택하세요' }]}>
            <DatePicker showTime format="YYYY-MM-DD HH:mm" />
          </Form.Item>
        </Form>

        {selectedEvent && <Button onClick={handleDelete}>삭제</Button>}
      </Modal>
    </ConfigProvider>
  );
};

const EventList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const EventItem = styled.li<{ $isOwner?: boolean }>`
  margin-bottom: 2px;
  padding: 2px 4px;
  background-color: ${(props) => (props.$isOwner ? '#e6f7ff' : '#f0f0f0')};
  border-radius: 2px;
  cursor: pointer;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:hover {
    background-color: ${(props) => (props.$isOwner ? '#bae7ff' : '#e0e0e0')};
  }
`;
