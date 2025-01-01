import { useState, useEffect, useRef } from 'react';
import { Flex, Empty } from 'antd';
import { Pagination } from 'antd';
import { ITEM_TYPE } from '../../type';
import data from '../../assets/data/new-data.json';
import { useSearchParams } from 'react-router';
import { Card } from './Card';
import { Filter } from './Filter';

const DEFAULT_ITEMS_PER_PAGE = 60;

export const List = () => {
  const listRef = useRef<HTMLDivElement>(null);
  const itemDataList = data as ITEM_TYPE[];
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    location: searchParams.get('location') || '',
    area: searchParams.get('area') || '',
    searchTerm: searchParams.get('searchTerm') || '',
    page: parseInt(searchParams.get('page') || '1', 10),
    itemsPerPage: parseInt(searchParams.get('perPage') || `${DEFAULT_ITEMS_PER_PAGE}`, 10),
  });

  const filteredItems = itemDataList.filter((item) => {
    return (
      (filters.location === '' || item.location === filters.location) &&
      (filters.area === '' || item.area === filters.area) &&
      (filters.searchTerm === '' ||
        (item.title + '').toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        (item.branchName + '').toLowerCase().includes(filters.searchTerm.toLowerCase()))
    );
  });

  useEffect(() => {
    const location = searchParams.get('location') || '';
    const area = searchParams.get('area') || '';
    const searchTerm = searchParams.get('searchTerm') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const perPage = parseInt(searchParams.get('perPage') || `${DEFAULT_ITEMS_PER_PAGE}`, 10);

    setFilters({ location, area, searchTerm, page, itemsPerPage: perPage });
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.location) params.set('location', filters.location);
    if (filters.area) params.set('area', filters.area);
    if (filters.searchTerm) params.set('searchTerm', filters.searchTerm);
    if (filters.page !== 1) params.set('page', filters.page.toString());
    if (filters.itemsPerPage !== DEFAULT_ITEMS_PER_PAGE) params.set('perPage', filters.itemsPerPage.toString());

    if ([...params.entries()].length === 0) {
      setSearchParams({});
    } else {
      setSearchParams(params);
    }
  }, [filters, setSearchParams]);

  const handleFilterChange = (newFilters: Omit<typeof filters, 'page' | 'itemsPerPage'>) => {
    setFilters({ ...newFilters, page: 1, itemsPerPage: DEFAULT_ITEMS_PER_PAGE });
  };

  const handlePageChange = (page: number, pageSize?: number) => {
    setFilters((prev) => ({
      ...prev,
      page,
      itemsPerPage: pageSize || prev.itemsPerPage,
    }));
    listRef?.current?.scrollIntoView();
  };

  const startIndex = (filters.page - 1) * filters.itemsPerPage;
  const endIndex = startIndex + filters.itemsPerPage;
  const currentPageData = filteredItems.slice(startIndex, endIndex);

  return (
    <div ref={listRef} style={{ width: '100%' }}>
      <Filter filters={filters} setFilters={handleFilterChange} />
      <Flex align="center" wrap style={{ width: '100%' }}>
        {currentPageData.length === 0 && (
          <Flex style={{ width: '100%', marginTop: '30%', marginBottom: '30%' }} align="center" justify="center">
            <Empty />
          </Flex>
        )}
        {currentPageData.map((item: ITEM_TYPE) => (
          <Card item={item} key={item.id} />
        ))}
      </Flex>
      {currentPageData.length !== 0 && (
        <Pagination
          current={filters.page}
          total={filteredItems.length}
          pageSize={filters.itemsPerPage}
          pageSizeOptions={['30', '60', '90']}
          showSizeChanger
          onChange={handlePageChange}
          style={{ marginTop: 20, marginBottom: 50, width: '100%', display: 'flex', justifyContent: 'center' }}
        />
      )}
    </div>
  );
};
