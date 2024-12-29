import { Calendar, ConfigProvider, Form } from 'antd';
import 'dayjs/locale/ko';
import dayjs from 'dayjs';
import locale from 'antd/es/locale/ko_KR';
import { useState } from 'react';
import { CalendarEvent } from '../../type';
import { SelectInfo } from 'antd/es/calendar/generateCalendar';
import { CalendarSelectModal } from '../../components/calendar/CalendarSelectModal';
import { CalendarHeader } from '../../components/calendar/CalendarHeader';
import { DateEventList } from '../../components/calendar/DateEvent';
dayjs.locale('ko');

export const CalendarPage = () => {
  const [selectDate, setSelectDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  const handleDateSelect = (value: dayjs.Dayjs, selectInfo: SelectInfo) => {
    const selectDateString = value.format('YYYY-MM-DD');
    if (selectDate === selectDateString) {
      if (selectInfo.source === 'date') {
        setIsModalVisible(true);
        form.setFieldsValue({
          start_time: value,
          end_time: value.add(1, 'hour'),
        });
      }
      return;
    }

    setSelectDate(value.format('YYYY-MM-DD'));
  };

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setIsModalVisible(true);
    form.setFieldsValue({
      title: event.title,
      description: event.description,
      start_time: dayjs(event.start_time),
      end_time: dayjs(event.end_time),
    });
  };

  return (
    <ConfigProvider locale={locale}>
      <Calendar onSelect={handleDateSelect} fullscreen cellRender={DateEventList} headerRender={CalendarHeader} />
      <CalendarSelectModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
    </ConfigProvider>
  );
};
