import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import data from '../../assets/data/new-data.json';
import { Card } from '../../components/home/Card';
import { ITEM_TYPE } from '../../type';
import { DetailBottomSheet } from '../../components/home/DetailBottonSheet';
import { Spin } from 'antd';
import { Filter } from '../../components/home/Filter';

const ITEMS_PER_PAGE = 60;

export const App = () => {
  const [open, setOpen] = useState(false);
  const [detailItem, setDetailItem] = useState<ITEM_TYPE>();
  const itemDataList = data as ITEM_TYPE[];
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    location: '',
    area: '',
    searchTerm: '',
  });
  const [filteredData, setFilteredData] = useState(itemDataList);
  const loader = useRef(null);

  useEffect(() => {
    setIsLoading(true);

    const timeoutId = setTimeout(() => {
      const newFilteredData = itemDataList.filter((item) => {
        return (
          (filters.location === '' || item.location === filters.location) &&
          (filters.area === '' || item.area === filters.area) &&
          (filters.searchTerm === '' ||
            (item.title + '').includes(filters.searchTerm) ||
            (item.branchName + '').includes(filters.searchTerm))
        );
      });

      setFilteredData(newFilteredData);
      setIsLoading(false);
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [filters, itemDataList]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setVisibleItems(ITEMS_PER_PAGE);
  }, [filters]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          if (visibleItems < filteredData.length) {
            setVisibleItems((prevItems) => prevItems + ITEMS_PER_PAGE);
          }
        }
      },
      {
        root: null,
        rootMargin: '20px',
        threshold: 0.7,
      }
    );

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [loader, visibleItems, filteredData]);

  return (
    <>
      <DetailBottomSheet open={open} item={detailItem} close={() => setOpen(false)} />
      <Filter filters={filters} setFilters={setFilters} />
      <Wrap>
        <ContentContainer>
          {isLoading ? (
            <LoadingContainer>
              <Spin size="large" />
            </LoadingContainer>
          ) : (
            <Inner>
              {filteredData.length === 0 && <NoResults>검색 결과가 없습니다.</NoResults>}
              {filteredData.slice(0, visibleItems).map((item: ITEM_TYPE) => (
                <Card
                  item={item}
                  key={item.id}
                  onClick={() => {
                    setDetailItem(item);
                    setOpen(true);
                  }}
                />
              ))}
            </Inner>
          )}
        </ContentContainer>
        <LoaderDiv ref={loader} />
      </Wrap>
    </>
  );
};

const NoResults = styled.div`
  text-align: center;
  padding: 20px;
  color: #666;
  width: 100%;
`;

const LoaderDiv = styled.div`
  height: 20px;
  margin: 20px 0;
`;

const Wrap = styled.div``;

const Inner = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  max-width: 800px;
  margin: 0 auto;
`;

const ContentContainer = styled.div`
  min-height: 400px;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`;
