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
import { supabase } from '../../utils/supabase';
dayjs.locale('ko');

export const CalendarPage = () => {
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
      supabase
        .from('calendar_events')
        .select()
        .eq('user_id', user.id)
        .then(({ data }) => {
          console.log(data);
        });
    }
  }, [user]);

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
