import { DatePicker, Divider, Flex, Input, Radio, Rate, Select, Space, Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import styled from 'styled-components';
import { COLOR } from '../../../utils/color';
import { FrownFilled, SmileFilled } from '@ant-design/icons';
import { ITEM_TYPE } from '../../../type';
import { detailReviewStore } from '../../../store/detail-review-store';
import { useDetailReview } from '../../../hook/use-detail-review';
import { Spinner } from '../Spinner';

const { Title, Text } = Typography;

export const DetailReview = ({ item }: { item: ITEM_TYPE }) => {
  const { addDetailReview, isLoading } = useDetailReview();
  const {
    is_success,
    group_cnt,
    visit_date,
    use_hint_cnt,
    play_time_minutes,
    play_time_seconds,
    satisfies_cnt,
    story_cnt,
    problem_cnt,
    interior_cnt,
    level,
    horror_cnt,
    health_cnt,
    description,
    etc,
    setSuccess,
    setGroupCnt,
    setVisitDate,
    setUseHintCnt,
    setPlayTime,
    setSatisfiesCnt,
    setStoryCnt,
    setProblemCnt,
    setInteriorCnt,
    setLevel,
    setHorrorCnt,
    setHealthCnt,
    setDescription,
    setEtc,
    resetStore,
  } = detailReviewStore();
  return (
    <>
      {isLoading && <Spinner />}
      <Space direction="vertical" align={'center'} style={{ width: '100%' }} size={30}>
        <Title level={3}>플레이 기록</Title>
        <Space>
          <EscapeContainer vertical align="center" onClick={() => setSuccess(true)} $isActive={is_success === true}>
            <SmileFilled style={{ fontSize: '50px' }} />
            <Text>탈출 성공</Text>
          </EscapeContainer>
          <EscapeContainer vertical align="center" onClick={() => setSuccess(false)} $isActive={is_success === false}>
            <FrownFilled style={{ fontSize: '50px' }} />
            <Text>탈출 실패</Text>
          </EscapeContainer>
        </Space>

        <Space direction="vertical" align={'center'} style={{ width: '100%' }}>
          <Title level={4}>인원</Title>
          <Radio.Group value={group_cnt} onChange={(e) => setGroupCnt(e.target.value)}>
            <Radio value={2}>2인</Radio>
            <Radio value={3}>3인</Radio>
            <Radio value={4}>4인</Radio>
            <Radio value={5}>4인+</Radio>
            <Radio value={1}>혼방</Radio>
          </Radio.Group>
        </Space>

        <Space direction="vertical" align={'center'} style={{ width: '100%' }}>
          <Title level={4}>날짜</Title>
          <DatePicker
            popupStyle={{
              position: 'fixed',
              zIndex: 10000,
            }}
            getPopupContainer={() => document.getElementById('date-picker-container')!}
            inputReadOnly
            value={visit_date}
            format={'YYYY/MM/DD'}
            onChange={setVisitDate}
          />
        </Space>

        <Space direction="vertical" align={'center'} style={{ width: '100%' }}>
          <Title level={4}>사용 힌트수</Title>
          <Select
            value={use_hint_cnt}
            onChange={setUseHintCnt}
            getPopupContainer={() => document.getElementById('date-picker-container')!}
            style={{ width: 70 }}
            options={[
              { value: '0', label: '0' },
              { value: '1', label: '1' },
              { value: '2', label: '2' },
              { value: '3', label: '3' },
              { value: '4', label: '4' },
              { value: '5', label: '5' },
              { value: '6', label: '6' },
              { value: '7', label: '7' },
              { value: '8', label: '8' },
              { value: '9', label: '9' },
              { value: '10', label: '10' },
              { value: '11', label: '10+' },
            ]}
          ></Select>
        </Space>

        <Space direction="vertical" align={'center'} style={{ width: '100%' }}>
          <Title level={4}>플레이 타임(걸린 시간)</Title>
          <Flex align="center">
            <Input
              placeholder="분"
              addonAfter="분"
              style={{ width: 100, marginRight: 10 }}
              value={play_time_minutes}
              onChange={(e) => {
                setPlayTime(Number(e.target.value), play_time_seconds);
              }}
              type="number"
            />
            <Input
              placeholder="초"
              addonAfter="초"
              style={{ width: 100 }}
              value={play_time_seconds}
              onChange={(e) => {
                setPlayTime(play_time_minutes, Number(e.target.value));
              }}
              type="number"
            />
            <Flex style={{ marginLeft: 10, marginRight: 10, paddingTop: 5 }} align="center" justify="center">
              <Title level={3}>{'/'}</Title>
            </Flex>
            <Input value={item?.playtime + '분'} style={{ width: 65 }} readOnly />
          </Flex>
        </Space>
      </Space>
      <Divider />
      <Space direction="vertical" style={{ width: '100%' }} size={50}>
        <Space direction="vertical" align={'center'} style={{ width: '100%' }}>
          <Title level={4}>만족도를 알려주세요.</Title>
          <Rate
            allowHalf
            style={{ fontSize: 40, color: COLOR.default }}
            value={satisfies_cnt}
            onChange={setSatisfiesCnt}
          />
        </Space>
        <Space direction="vertical" align={'center'} style={{ width: '100%' }}>
          <Title level={4}>스토리는 어떠셨나요?</Title>
          <Rate allowHalf style={{ fontSize: 40, color: COLOR.default }} value={story_cnt} onChange={setStoryCnt} />
        </Space>
        <Space direction="vertical" align={'center'} style={{ width: '100%' }}>
          <Title level={4}>문제 구성은 어떠셨나요?</Title>
          <Rate allowHalf style={{ fontSize: 40, color: COLOR.default }} value={problem_cnt} onChange={setProblemCnt} />
        </Space>
        <Space direction="vertical" align={'center'} style={{ width: '100%' }}>
          <Title level={4}>인테리어 및 연출은 어떠셨나요?</Title>
          <Rate
            allowHalf
            style={{ fontSize: 40, color: COLOR.default }}
            value={interior_cnt}
            onChange={setInteriorCnt}
          />
        </Space>
      </Space>
      <Divider />
      <Space direction="vertical" style={{ width: '100%' }} size={50}>
        <Space direction="vertical" align={'center'} style={{ width: '100%' }}>
          <Title level={4}>난이도는 어떠셨나요?</Title>
          <Radio.Group value={level} onChange={(e) => setLevel(e.target.value)}>
            <Radio value={2}>쉬움</Radio>
            <Radio value={3}>보통</Radio>
            <Radio value={4}>어려움</Radio>
            <Radio value={5}>아주 어려움</Radio>
          </Radio.Group>
        </Space>
        <Space direction="vertical" align={'center'} style={{ width: '100%' }}>
          <Title level={4}>얼마나 무서웠나요?</Title>
          <Radio.Group value={horror_cnt} onChange={(e) => setHorrorCnt(e.target.value)}>
            <Radio value={2}>안무서움</Radio>
            <Radio value={3}>보통</Radio>
            <Radio value={4}>무서움</Radio>
            <Radio value={5}>매우 무서움</Radio>
          </Radio.Group>
        </Space>
        <Space direction="vertical" align={'center'} style={{ width: '100%' }}>
          <Title level={4}>활동성이 어느 정도였나요?</Title>
          <Radio.Group value={health_cnt} onChange={(e) => setHealthCnt(e.target.value)}>
            <Radio value={2}>없음</Radio>
            <Radio value={3}>보통</Radio>
            <Radio value={4}>높음</Radio>
            <Radio value={5}>아주 높음</Radio>
          </Radio.Group>
        </Space>
      </Space>

      <Divider />
      <AreaContainer direction="vertical" align={'center'} style={{ width: '100%' }}>
        <Title level={3}>총평</Title>
        <TextArea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="테마에 대해 알려주세요."
          style={{ height: 200, resize: 'none' }}
        />
      </AreaContainer>
      <Divider />
      <AreaContainer direction="vertical" align={'center'} style={{ width: '100%' }}>
        <Title level={3}>기타</Title>
        <TextArea
          value={etc}
          onChange={(e) => setEtc(e.target.value)}
          placeholder="기타"
          style={{ height: 140, resize: 'none' }}
        />
      </AreaContainer>
      <Divider />
      <CompleteContainer>
        <CompleteButton
          onClick={async () => {
            await addDetailReview({
              description,
              group_cnt,
              health_cnt,
              horror_cnt,
              interior_cnt,
              level,
              play_time_minutes,
              play_time_seconds,
              problem_cnt,
              satisfies_cnt,
              story_cnt,
              theme_id: item.id,
              use_hint_cnt,
              visit_date,
              etc,
              is_success,
            });
            resetStore();
            close();
          }}
        >
          완료
        </CompleteButton>
      </CompleteContainer>
    </>
  );
};

const CompleteButton = styled.button`
  background-color: ${COLOR.lightBlue};
  width: 100%;
  height: 50px;
  color: white;
  font-size: 22px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const CompleteContainer = styled.div`
  width: 100%;
  bottom: 0;
`;

const AreaContainer = styled(Space)`
  width: 100%;
  flex: 1;

  .ant-space-item {
    width: 100%;
    text-align: center;
    padding-left: 20px;
    padding-right: 20px;
    box-sizing: border-box;
  }
`;

const EscapeContainer = styled(Flex)<{ $isActive: boolean }>`
  padding: 10px 30px;
  border: 1px solid ${COLOR.default};
  background-color: white;
  border-radius: 5px;
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0.3)};
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    opacity: 1;
    transition: 0.3s;
  }

  svg {
    fill: ${COLOR.default};
  }

  span {
    margin-top: 10px;
  }
`;
