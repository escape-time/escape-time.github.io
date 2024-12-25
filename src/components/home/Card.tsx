import { LazyLoadImage } from 'react-lazy-load-image-component';
import { ITEM_TYPE } from '../../type';
import styled from 'styled-components';

export const Card = ({ item, onClick }: { item: ITEM_TYPE; onClick: () => void }) => {
  const handleImageError = (item: ITEM_TYPE) => {
    console.error(`Image not found for title: ${item.title}`);
    console.error(`Image not found for id: ${item.id}`);
  };

  return (
    <CardWrap key={item.id} onClick={onClick}>
      <ImageWrapper>
        <LazyLoadImage
          src={`/official-escape-time/assets/theme-img/thumb_${item.id}.jpg`}
          alt={item.title}
          onError={() => handleImageError(item)}
        />
      </ImageWrapper>

      <TextContainer>
        <Title>{item.title}</Title>
      </TextContainer>

      <InfoContainer>
        <Info>
          가격(1인) <br /> {item.price}
        </Info>
        <Info>
          위치 <br /> {item.location}
        </Info>
        <Info>
          시간 <br />
          {item.playtime}
        </Info>
      </InfoContainer>
    </CardWrap>
  );
};

const CardWrap = styled.section`
  width: calc(25% - 20px);
  border-radius: 10px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.5);
  text-decoration: none;
  transition: 0.3s ease;
  cursor: pointer;

  margin-right: 10px;
  margin-left: 10px;
  margin-bottom: 40px;

  &:hover {
    transform: scale(1.05);
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.6);
  }

  @media (max-width: 767px) {
    width: calc(50% - 20px);
  }
`;

const ImageWrapper = styled.div`
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  height: 150px;

  img {
    width: 100%;
    height: 100%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    object-fit: cover;
    object-position: top;
  }
`;

const TextContainer = styled.div`
  padding: 15px;
`;

const Title = styled.h3`
  color: black;
  text-align: center;
  text-decoration: none;
  font-size: 20px;
  line-height: 24px;

  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const InfoContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  flex-wrap: wrap;
  box-sizing: border-box;
  background: rgb(22, 119, 255);
  padding-bottom: 10px;
  padding-top: 13px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const Info = styled.h4`
  text-align: center;
  color: #fefae0;
  font-size: 14px;
  font-family: Tenada;
`;
