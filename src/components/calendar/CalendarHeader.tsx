import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Row } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

export const CalendarHeader = ({ value, onChange }: { value: Dayjs; onChange: (date: Dayjs) => void }) => {
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
