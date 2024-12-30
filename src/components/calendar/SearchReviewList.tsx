import { useRef, useState } from 'react';
import data from '../../assets/data/new-data.json';
import { ITEM_TYPE } from '../../type';
import { Filter } from '../home/Filter';
import { Button, Empty, Flex, Modal, Pagination } from 'antd';
import styled from 'styled-components';
import Title from 'antd/es/typography/Title';

const DEFAULT_ITEMS_PER_PAGE = 60;
export const SearchReviewList = ({
  open,
  close,
  selectThemeId,
}: {
  open: boolean;
  close: () => void;
  selectThemeId: (id: string) => void;
}) => {
  const listRef = useRef<HTMLDivElement>(null);
  const itemDataList = data as ITEM_TYPE[];
  const [filters, setFilters] = useState({
    location: '',
    area: '',
    searchTerm: '',
    page: 1,
    itemsPerPage: 60,
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
    <Modal open={open} onCancel={close} footer={[]} width={window.innerWidth} style={{ padding: 0 }} wrapClassName="aa">
      <div ref={listRef} style={{ width: '100%' }}>
        <Filter filters={filters} setFilters={handleFilterChange} />
        <Flex align="center" wrap style={{ width: '100%' }}>
          {currentPageData.length === 0 && (
            <Flex style={{ width: '100%', marginTop: '30%', marginBottom: '30%' }} align="center" justify="center">
              <Empty />
            </Flex>
          )}
          {currentPageData.map((item: ITEM_TYPE) => (
            <CardWrap
              key={item.id}
              onClick={() => {
                selectThemeId(item.id);
                close();
              }}
            >
              {item.isHorror && (
                <HorrorTextContainer>
                  <GenreTag color="danger" variant="solid">
                    공포
                  </GenreTag>
                </HorrorTextContainer>
              )}
              <Flex align="center" vertical>
                <ImageWrapper>
                  <img src={`/assets/theme-img/thumb_${item.id}.jpg`} alt={item.title} />
                </ImageWrapper>

                <TextContainer>
                  <CardTitle level={5} ellipsis>
                    {item.title}
                  </CardTitle>
                </TextContainer>
              </Flex>
            </CardWrap>
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
    </Modal>
  );
};

const GenreTag = styled(Button)`
  pointer-events: none;
  cursor: default;
  opacity: 1 !important;
  user-select: none;
  border-radius: 0;
  padding-bottom: 0;
  &:hover,
  &:focus,
  &:active {
    opacity: 1 !important;
    transform: none !important;
    box-shadow: none !important;
  }
`;

const HorrorTextContainer = styled.div`
  position: absolute;
  top: 98px;
  right: 0px;
  padding-bottom: 0;
  z-index: 2;
`;

const CardWrap = styled.section`
  position: relative;
  width: calc(16.66666666% - 20px);
  border-radius: 10px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.5);
  text-decoration: none;
  transition: 0.3s ease;
  cursor: pointer;
  flex-shrink: 0;

  margin-right: 10px;
  margin-left: 10px;
  margin-bottom: 20px;
  box-sizing: border-box;

  &:hover {
    transform: scale(1.05);
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.6);
  }

  @media (max-width: 767px) {
    width: calc(50% - 10px);
    margin-right: 5px;
    margin-left: 5px;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  height: 200px;

  img {
    width: 100%;
    height: 100%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    object-fit: cover;
    object-position: center;
  }
`;

const TextContainer = styled.div`
  padding: 15px;
  width: 100%;
  box-sizing: border-box;
  padding-bottom: 10px;
`;

const CardTitle = styled(Title)`
  text-align: center;
  text-decoration: none;
`;
