import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarSelectModal } from '../../components/calendar/CalendarSelectModal';
import { useCalendarStore } from '../../store/date-event-store';
import holidayList from '../../assets/data/holiyday.json';
import { v4 } from 'uuid';
import { authStore } from '../../store/auth-store';
import { COLOR } from '../../utils/color';
const localizer = dayjsLocalizer(dayjs);

interface ClickedDate {
  start: Date;
  end: Date;
}
interface HolidayDataType {
  [key: string]: string[];
}
export const CalendarPage = () => {
  const [reviewId, setReviewId] = useState('');
  const [clickDate, setClickDate] = useState<ClickedDate | null>(null);
  const { showVisible, setSelectDate, getEvents, events } = useCalendarStore();
  const { user } = authStore();

  useEffect(() => {
    if (user) getEvents(user.id);
  }, [user, getEvents]);

  const handleSelectSlot = useCallback(
    (slotInfo: { start: Date; end: Date }) => {
      const isSameDate = (date1: Date, date2: Date) => {
        return date1.toISOString().split('T')[0] === date2.toISOString().split('T')[0];
      };

      if (clickDate && isSameDate(clickDate.start, slotInfo.start)) {
        setSelectDate(dayjs(clickDate.start).format('YYYY-MM-DD'));
        showVisible();
        return; // 함수 종료
      }

      setClickDate(slotInfo);
    },
    [clickDate, showVisible, setSelectDate]
  );

  const dayPropGetter = useCallback(
    (date: Date) => {
      const isSelected = clickDate && date.toISOString().split('T')[0] === clickDate.start.toISOString().split('T')[0];

      let style: React.CSSProperties = {};
      let className = '';

      if (isSelected) {
        style = {
          backgroundColor: '#e6f7ff',
          borderRadius: '4px',
          transition: 'all 0.3s ease',
        };
        className = 'selected-date';
      }

      return { style, className };
    },
    [clickDate]
  );

  const holidayListEvents = () => {
    const dateData = holidayList as HolidayDataType;
    const list = [];
    for (const [date, values] of Object.entries(dateData)) {
      list.push({
        id: v4(),
        title: values.toString(),
        start: new Date(date),
        end: new Date(date),
        color: '#FF0000',
        allDay: true,
        isHoliday: true,
      });
    }
    return list;
  };

  return (
    <div>
      <Calendar
        views={{ month: true, week: true }}
        localizer={localizer}
        events={[
          ...events.map((i) => {
            return {
              id: i.id,
              title: i.title,
              start: new Date(i.start_date),
              end: new Date(i.end_date),
              color: i.color || '',
              allDay: i.is_always,
              isHoliday: false,
            };
          }),
          ...holidayListEvents(),
        ]}
        startAccessor="start"
        endAccessor="end"
        style={{ height: window.innerHeight - 60 }}
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={(e) => (e.isHoliday ? null : setReviewId(e?.id + '' || ''))}
        messages={{
          day: '일',
          month: '월간',
          week: '주간',
          previous: '이전',
          next: '다음',
          today: '오늘',
        }}
        formats={{
          monthHeaderFormat: (date: Date) => {
            return `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
          },
          weekdayFormat: (date: Date) => {
            const days = ['일', '월', '화', '수', '목', '금', '토'];
            return days[date.getDay()];
          },
          dayRangeHeaderFormat: ({ start, end }: { start: Date; end: Date }) => {
            return `${dayjs(start).format('YYYY년 MM월 DD일')} - ${dayjs(end).format('YYYY년 MM월 DD일')}`;
          },
        }}
        culture="ko"
        eventPropGetter={(e) => {
          if (e.allDay)
            return {
              style: {
                backgroundColor: e.color || COLOR.default,
                color: '#ffffff',
                paddingTop: 3,
              },
            };

          return {
            style: {
              backgroundColor: 'transparent',
              color: 'black',
              paddingTop: 5,
            },
            className: `event-with-dot-${e.color?.replace('#', '')}`,
          };
        }}
        dayPropGetter={dayPropGetter}
      />
      <CalendarSelectModal reviewId={reviewId} clearReview={() => setReviewId('')} />
    </div>
  );
};
