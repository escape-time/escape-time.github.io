import { useParams } from 'react-router';
import styled from 'styled-components';
import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../../utils/supabase';
import { Spinner } from '../../components/common/Spinner';
import { DatePicker, Divider, Flex, Input, Modal, Radio, Rate, Select, Space, Typography } from 'antd';
import { COLOR } from '../../utils/color';
import TextArea from 'antd/es/input/TextArea';
import { FrownFilled, SmileFilled } from '@ant-design/icons';
import { detailReviewStore } from '../../store/detail-review-store';
import { ReviewThemeItem } from '../../components/common/review/ReviewThemeItem';
import { CommentType, ITEM_TYPE } from '../../type';
import themeData from '../../assets/data/new-data.json';
import { BackHeader } from '../../components/common/BackHeader';
import { CreateComments } from '../../components/common/comment/CreateComments';
import { Comment } from '../../components/common/comment/Commoent';
const { Text, Title } = Typography;

export const ReviewPage = () => {
  const [themeInfo, setThemeInfo] = useState<ITEM_TYPE | null>(null);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
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
    setDetailReview,
  } = detailReviewStore();

  const getComments = useCallback(() => {
    supabase
      .from('comments')
      .select()
      .eq('review_id', id)
      .then(({ data }) => {
        if (data) setComments(data);
      });
  }, []);

  useEffect(() => {
    const getReview = () => {
      supabase
        .from('detail_reviews')
        .select()
        .eq('id', id)
        .then(({ data }) => {
          if (data) {
            const playTheme = themeData.find((i) => i.id === data[0].theme_id) as ITEM_TYPE;
            setDetailReview(data[0]);
            setIsModalVisible(true);
            if (playTheme) setThemeInfo(playTheme);
          }
          setLoading(false);
        });
    };

    Promise.all([getReview(), getComments()]);
  }, []);

  if (loading) return <>{loading && <Spinner />}</>;

  console.log(comments);
  return (
    <>
      {loading && <Spinner />}
      <Modal title={'알림'} centered open={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null}>
        <Title style={{ paddingBottom: 10 }} level={4}>
          친구의 리뷰에 댓글을 달아주세요!
        </Title>
      </Modal>
      <BackHeaderContainer>
        <BackHeader title={themeInfo?.title + '' || ''} />
      </BackHeaderContainer>
      <Divider style={{ margin: 12 }} />
      {themeInfo && <ReviewThemeItem item={themeInfo} />}
      <Divider />
      <Space direction="vertical" align={'center'} style={{ width: '100%' }} size={30}>
        <Title level={3}>플레이 기록</Title>
        <Space>
          <EscapeContainer vertical align="center" $isActive={is_success === true}>
            <SmileFilled style={{ fontSize: '50px' }} />
            <Text>탈출 성공</Text>
          </EscapeContainer>
          <EscapeContainer vertical align="center" $isActive={is_success === false}>
            <FrownFilled style={{ fontSize: '50px' }} />
            <Text>탈출 실패</Text>
          </EscapeContainer>
        </Space>

        <Space direction="vertical" align={'center'} style={{ width: '100%' }}>
          <Title level={4}>인원</Title>
          <Radio.Group value={group_cnt}>
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
            disabled
            popupStyle={{
              position: 'fixed',
              zIndex: 10000,
            }}
            getPopupContainer={() => document.getElementById('date-picker-container')!}
            inputReadOnly
            value={visit_date}
            format={'YYYY/MM/DD'}
          />
        </Space>

        <Space direction="vertical" align={'center'} style={{ width: '100%' }}>
          <Title level={4}>사용 힌트수</Title>
          <Select
            disabled
            value={use_hint_cnt}
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
              type="number"
            />
            <Input placeholder="초" addonAfter="초" style={{ width: 100 }} value={play_time_seconds} type="number" />
            <Flex style={{ marginLeft: 10, marginRight: 10, paddingTop: 5 }} align="center" justify="center">
              <Title level={3}>{'/'}</Title>
            </Flex>
            <Input value={themeInfo?.playtime + '분'} style={{ width: 65 }} readOnly />
          </Flex>
        </Space>
      </Space>
      <Divider />
      <Space direction="vertical" style={{ width: '100%' }} size={50}>
        <Space direction="vertical" align={'center'} style={{ width: '100%' }}>
          <Title level={4}>만족도를 알려주세요.</Title>
          <Rate disabled allowHalf style={{ fontSize: 40, color: COLOR.default }} value={satisfies_cnt} />
        </Space>
        <Space direction="vertical" align={'center'} style={{ width: '100%' }}>
          <Title level={4}>스토리는 어떠셨나요?</Title>
          <Rate allowHalf style={{ fontSize: 40, color: COLOR.default }} value={story_cnt} disabled />
        </Space>
        <Space direction="vertical" align={'center'} style={{ width: '100%' }}>
          <Title level={4}>문제 구성은 어떠셨나요?</Title>
          <Rate allowHalf style={{ fontSize: 40, color: COLOR.default }} value={problem_cnt} disabled />
        </Space>
        <Space direction="vertical" align={'center'} style={{ width: '100%' }}>
          <Title level={4}>인테리어 및 연출은 어떠셨나요?</Title>
          <Rate disabled allowHalf style={{ fontSize: 40, color: COLOR.default }} value={interior_cnt} />
        </Space>
      </Space>
      <Divider />
      <Space direction="vertical" style={{ width: '100%' }} size={50}>
        <Space direction="vertical" align={'center'} style={{ width: '100%' }}>
          <Title level={4}>난이도는 어떠셨나요?</Title>
          <Radio.Group value={level} disabled>
            <Radio value={2}>쉬움</Radio>
            <Radio value={3}>보통</Radio>
            <Radio value={4}>어려움</Radio>
            <Radio value={5}>아주 어려움</Radio>
          </Radio.Group>
        </Space>
        <Space direction="vertical" align={'center'} style={{ width: '100%' }}>
          <Title level={4}>얼마나 무서웠나요?</Title>
          <Radio.Group value={horror_cnt} disabled>
            <Radio value={2}>안무서움</Radio>
            <Radio value={3}>보통</Radio>
            <Radio value={4}>무서움</Radio>
            <Radio value={5}>매우 무서움</Radio>
          </Radio.Group>
        </Space>
        <Space direction="vertical" align={'center'} style={{ width: '100%' }}>
          <Title level={4}>활동성이 어느 정도였나요?</Title>
          <Radio.Group value={health_cnt} disabled>
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
          disabled
          value={description}
          placeholder="테마에 대해 알려주세요."
          style={{ height: 200, resize: 'none' }}
        />
      </AreaContainer>
      <Divider />
      <AreaContainer direction="vertical" align={'center'} style={{ width: '100%' }}>
        <Title level={3}>기타</Title>
        <TextArea disabled value={etc} placeholder="기타" style={{ height: 140, resize: 'none' }} />
      </AreaContainer>
      <Divider />
      <Space direction="vertical" style={{ width: '100%', paddingLeft: 20, paddingRight: 20 }}>
        <Title level={3}>코멘트({comments.length})</Title>
      </Space>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
      <Divider />
      <CreateComments
        targetId={id || ''}
        loadingStart={() => setLoading(true)}
        loadingEnd={() => setLoading(false)}
        callback={getComments}
      />
      <Divider />
    </>
  );
};

const BackHeaderContainer = styled.div`
  padding-left: 10px;
  padding-right: 10px;
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
