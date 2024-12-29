import dayjs from 'dayjs';
import styled from 'styled-components';

export const DateEventList = (value: dayjs.Dayjs) => {
  // const dayEvents = events.filter((event) => {
  //   const eventDate = dayjs(event.start_time);
  //   return eventDate.isSame(value, 'day');
  // });

  return (
    <EventList>
      {/* {dayEvents.map((event) => (
        <EventItem
          key={event.id}
          onClick={(e) => {
            e.stopPropagation();
          }}
          $isOwner={event.user_id === user?.id}
        >
          {event.title}
        </EventItem>
      ))} */}
    </EventList>
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
