import { Cascader, Input, Space } from 'antd';
import styled from 'styled-components';

interface FilterProps {
  setFilters: React.Dispatch<
    React.SetStateAction<{
      location: string;
      area: string;
      searchTerm: string;
    }>
  >;
  filters: {
    location: string;
    area: string;
    searchTerm: string;
  };
}

// 지역별 도시 데이터
const LOCATION_OPTIONS = [
  {
    value: '',
    label: '전체',
  },
  {
    value: '서울',
    label: '서울',
    children: [
      { value: '', label: '전체' },
      { value: '홍대', label: '홍대' },
      { value: '강남', label: '강남' },
      { value: '건대', label: '건대' },
      { value: '대학로', label: '대학로' },
      { value: '신촌', label: '신촌' },
      { value: '잠실', label: '잠실' },
      { value: '신림', label: '신림' },
      { value: '노원', label: '노원' },
      { value: '신사', label: '신사' },
      { value: '영등포', label: '영등포' },
      { value: '서울대입구', label: '서울대입구' },
      { value: '성신여대', label: '성신여대' },
      { value: '명동', label: '명동' },
      { value: '천호', label: '천호' },
      { value: '용산', label: '용산' },
      { value: '종로', label: '종로' },
      { value: '구로', label: '구로' },
      { value: '성수', label: '성수' },
      { value: '연신내', label: '연신내' },
      { value: '노량진', label: '노량진' },
      { value: '왕십리', label: '왕십리' },
      { value: '동대문', label: '동대문' },
    ],
  },
  {
    value: '경기/인천',
    label: '경기',
    children: [
      { value: '', label: '전체' },
      { value: '인천', label: '인천' },
      { value: '수원', label: '수원' },
      { value: '성남', label: '성남' },
      { value: '부천', label: '부천' },
      { value: '일산', label: '일산' },
      { value: '안산', label: '안산' },
      { value: '동탄', label: '동탄' },
      { value: '평택', label: '평택' },
      { value: '의정부', label: '의정부' },
      { value: '안양', label: '안양' },
      { value: '김포', label: '김포' },
      { value: '용인', label: '용인' },
      { value: '구리', label: '구리' },
      { value: '화정', label: '화정' },
      { value: '범계', label: '범계' },
      { value: '시흥', label: '시흥' },
      { value: '이천', label: '이천' },
      { value: '하남', label: '하남' },
      { value: '화성', label: '화성' },
      { value: '산본', label: '산본' },
    ],
  },
  {
    value: '충청',
    label: '충청',
    children: [
      { value: '', label: '전체' },
      { value: '대전', label: '대전' },
      { value: '천안', label: '천안' },
      { value: '청주', label: '청주' },
      { value: '당진', label: '당진' },
    ],
  },
  {
    value: '경상',
    label: '경상',
    children: [
      { value: '', label: '전체' },
      { value: '부산', label: '부산' },
      { value: '대구', label: '대구' },
      { value: '울산', label: '울산' },
      { value: '포항', label: '포항' },
      { value: '창원', label: '창원' },
      { value: '진주', label: '진주' },
      { value: '양산', label: '양산' },
      { value: '경주', label: '경주' },
      { value: '구미', label: '구미' },
    ],
  },
  {
    value: '전라',
    label: '전라',
    children: [
      { value: '', label: '전체' },
      { value: '광주', label: '광주' },
      { value: '전주', label: '전주' },
      { value: '익산', label: '익산' },
      { value: '여수', label: '여수' },
      { value: '목포', label: '목포' },
      { value: '순천', label: '순천' },
    ],
  },
  {
    value: '강원',
    label: '강원',
    children: [{ value: '', label: '전체' }],
  },
  {
    value: '제주',
    label: '제주',
    children: [{ value: '', label: '전체' }],
  },
];

export const Filter = ({ filters, setFilters }: FilterProps) => {
  const handleLocationChange = (value: string[]) => {
    if (!value) {
      setFilters({
        ...filters,
        area: '',
        location: '',
      });
      return;
    }
    const [area = '', location = ''] = value as string[];
    setFilters({
      ...filters,
      area,
      location,
      searchTerm: '',
    });
  };

  const handleFilterTextChange = (searchTerm: string) => {
    setFilters({
      ...filters,
      searchTerm,
    });
  };
  return (
    <FilterContainer>
      <Space>
        <Cascader
          options={LOCATION_OPTIONS}
          value={[filters.area, filters.location]}
          onChange={handleLocationChange}
          placeholder="지역 선택"
          style={{ width: 130 }}
          allowClear
          expandTrigger="hover"
        />
        <Input
          style={{ width: 160 }}
          value={filters.searchTerm}
          placeholder="검색어"
          onChange={(e) => handleFilterTextChange(e.target.value)}
        />
      </Space>
    </FilterContainer>
  );
};

const FilterContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
  overflow-x: auto;
  overflow-y: hidden;
  padding-left: 5px;
  padding-right: 5px;
  padding-top: 20px;
`;
