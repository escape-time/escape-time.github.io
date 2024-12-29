import styled from 'styled-components';
import { Filter } from './Filter';
import { Flex, Spin } from 'antd';
import { useSearchParams } from 'react-router';
import { useEffect, useRef, useState, useMemo } from 'react'; // useMemo 추가
import { DetailReviewType, ITEM_TYPE, OneLineReviewType } from '../../type';
import data from '../../assets/data/new-data.json';
import { Card } from './Card';
import { Empty } from 'antd';

const ITEMS_PER_PAGE = 60;

export const List = ({
  oneLineReviewList,
  detailReviewList,
}: {
  oneLineReviewList: OneLineReviewType[];
  detailReviewList: DetailReviewType[];
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const itemDataList = useMemo(() => data as ITEM_TYPE[], []); // 데이터 메모이제이션
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    location: searchParams.get('location') || '',
    area: searchParams.get('area') || '',
    searchTerm: searchParams.get('searchTerm') || '',
  });
  const [filteredData, setFilteredData] = useState(itemDataList);
  const loader = useRef(null);

  // URL 파라미터와 필터 상태 동기화를 하나의 useEffect로 통합
  useEffect(() => {
    const location = searchParams.get('location') || '';
    const area = searchParams.get('area') || '';
    const searchTerm = searchParams.get('searchTerm') || '';

    setFilters({
      location,
      area,
      searchTerm,
    });
  }, [searchParams]);

  // 필터 변경 시 URL 업데이트
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.location) params.set('location', filters.location);
    if (filters.area) params.set('area', filters.area);
    if (filters.searchTerm) params.set('searchTerm', filters.searchTerm);
    setSearchParams(params);
  }, [filters, setSearchParams]);

  // 필터링 로직을 useMemo로 최적화
  const filteredItems = useMemo(() => {
    return itemDataList.filter((item) => {
      return (
        (filters.location === '' || item.location === filters.location) &&
        (filters.area === '' || item.area === filters.area) &&
        (filters.searchTerm === '' ||
          (item.title + '').includes(filters.searchTerm) ||
          (item.branchName + '').includes(filters.searchTerm))
      );
    });
  }, [filters, itemDataList]);

  // 필터링된 데이터 업데이트
  useEffect(() => {
    setIsLoading(true);
    setFilteredData(filteredItems);
    setIsLoading(false);
  }, [filteredItems]);

  // 필터 변경 시 스크롤 초기화
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setVisibleItems(ITEMS_PER_PAGE);
  }, [filters]);

  // Intersection Observer 설정
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && visibleItems < filteredData.length) {
          setVisibleItems((prevItems) => prevItems + ITEMS_PER_PAGE);
        }
      },
      {
        root: null,
        rootMargin: '20px',
        threshold: 0.7,
      }
    );

    const currentLoader = loader.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [loader, visibleItems, filteredData.length]);

  const displayedItems = useMemo(() => {
    return filteredData.slice(0, visibleItems);
  }, [filteredData, visibleItems]);

  return (
    <>
      <Filter filters={filters} setFilters={setFilters} />

      {isLoading ? (
        <Flex align="center" justify="center">
          <Spin size="large" />
        </Flex>
      ) : (
        <Flex align="center" wrap>
          {filteredData.length === 0 && <Empty />}
          {displayedItems.map((item: ITEM_TYPE) => (
            <Card
              item={item}
              key={item.id}
              oneLineReview={oneLineReviewList.find((i) => i.theme_id === item.id)}
              detailReview={detailReviewList.find((i) => i.theme_id === item.id)}
            />
          ))}
        </Flex>
      )}
      <LoaderDiv ref={loader} />
    </>
  );
};

const LoaderDiv = styled.div`
  height: 20px;
  margin: 20px 0;
`;
