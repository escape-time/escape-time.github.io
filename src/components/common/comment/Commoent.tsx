import { Divider, Flex, Rate, Typography } from 'antd';
import styled from 'styled-components';
import { CommentType } from '../../../type';
import { COLOR } from '../../../utils/color';

const { Title } = Typography;
export const Comment = ({ comment }: { comment: CommentType }) => {
  return (
    <>
      <Divider />
      <CommentContainer vertical>
        <Flex style={{ marginBottom: 20 }}>
          <Title level={4} style={{ marginRight: 10 }}>
            {comment.nickname}
          </Title>
          <Rate disabled allowHalf style={{ fontSize: 20, color: COLOR.default }} value={comment.rating} />
        </Flex>

        <Title level={4} style={{ whiteSpace: 'pre-line' }}>
          {comment.comment_text}
        </Title>
      </CommentContainer>
    </>
  );
};

const CommentContainer = styled(Flex)`
  padding-left: 20px;
  padding-right: 20px;
`;
