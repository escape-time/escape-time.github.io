import styled from 'styled-components';
import { COLOR } from '../../../utils/color';
import { Input, Rate, Space } from 'antd';
import { useState } from 'react';
import TextArea from 'antd/es/input/TextArea';
import Title from 'antd/es/typography/Title';
import { supabase } from '../../../utils/supabase';

export const CreateComments = ({
  loadingStart,
  loadingEnd,
  targetId,
  callback,
}: {
  loadingStart: () => void;
  loadingEnd: () => void;
  targetId: string;
  callback?: () => void;
}) => {
  const [rating, updateRating] = useState(0);
  const [text, updateText] = useState('');
  const [nickname, updateNickname] = useState('');

  const createComment = async () => {
    loadingStart();
    await supabase.from('comments').insert({ rating, comment_text: text, nickname, review_id: targetId });
    loadingEnd();
    if (callback) callback();
  };

  return (
    <>
      <Space direction="vertical" align={'center'} style={{ width: '100%', marginBottom: 20 }}>
        <Title level={4}>이름 or 닉네임</Title>
        <Input value={nickname} onChange={(e) => updateNickname(e.target.value)} />
      </Space>
      <Space direction="vertical" align={'center'} style={{ width: '100%', marginBottom: 20 }}>
        <Title level={4}>만족한 정도를 알려주세요.</Title>
        <Rate value={rating} allowHalf style={{ fontSize: 40, color: COLOR.default }} onChange={updateRating} />
      </Space>
      <AreaContainer direction="vertical" align={'center'} style={{ width: '100%', marginBottom: 20 }}>
        <TextArea
          value={text}
          onChange={(e) => updateText(e.target.value)}
          placeholder="테마에 대해 알려주세요."
          style={{ height: 80 }}
        />
      </AreaContainer>
      <CompleteContainer>
        <CompleteButton onClick={createComment}>리뷰 작성</CompleteButton>
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
