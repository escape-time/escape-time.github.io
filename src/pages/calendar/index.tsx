import { Calendar, ConfigProvider } from 'antd';
import 'dayjs/locale/ko';
import dayjs from 'dayjs';
import locale from 'antd/es/locale/ko_KR';
import { useEffect, useState } from 'react';
import { SelectInfo } from 'antd/es/calendar/generateCalendar';
import { CalendarSelectModal } from '../../components/calendar/CalendarSelectModal';
import { CalendarHeader } from '../../components/calendar/CalendarHeader';
import { DateEventList } from '../../components/calendar/DateEvent';
import { authStore } from '../../store/auth-store';
import { useCalendarStore } from '../../store/date-event-store';
dayjs.locale('ko');

export const CalendarPage = () => {
  const { getEvents } = useCalendarStore();
  const { user } = authStore();
  const [selectDate, setSelectDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleDateSelect = (value: dayjs.Dayjs, selectInfo: SelectInfo) => {
    const selectDateString = value.format('YYYY-MM-DD');
    if (selectDate === selectDateString) {
      if (selectInfo.source === 'date') {
        setIsModalVisible(true);
      }
      return;
    }

    setSelectDate(value.format('YYYY-MM-DD'));
  };

  useEffect(() => {
    if (user) {
      getEvents(user.id);
    }
  }, [user, getEvents]);

  return (
    <ConfigProvider locale={locale}>
      <Calendar onSelect={handleDateSelect} fullscreen cellRender={DateEventList} headerRender={CalendarHeader} />
      <CalendarSelectModal
        selectDate={selectDate}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </ConfigProvider>
  );
};
