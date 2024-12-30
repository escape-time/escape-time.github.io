import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Row } from 'antd';
import Title from 'antd/es/typography/Title';
import dayjs, { Dayjs } from 'dayjs';
import styled from 'styled-components';
import { COLOR } from '../../utils/color';

export const CalendarHeader = ({ value, onChange }: { value: Dayjs; onChange: (date: Dayjs) => void }) => {
  const current = value.clone();

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
    <CalendarHeaderContainer justify="space-between" align="middle">
      <Button.Group>
        <Button icon={<LeftOutlined />} onClick={handlePrevMonth} />
        <Button icon={<RightOutlined />} onClick={handleNextMonth} />
      </Button.Group>
      <Title level={4}>{dayjs(value).format('YYYY-MM')}</Title>
      <Button onClick={handleToday}>오늘</Button>
    </CalendarHeaderContainer>
  );
};

const CalendarHeaderContainer = styled(Row)`
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid ${COLOR.borderColor};
  margin-bottom: 10px;
`;
