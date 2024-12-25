import { Input, Select, Space } from 'antd';
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
const CITY_OPTIONS = {
  서울: [
    '홍대',
    '강남',
    '건대',
    '대학로',
    '신촌',
    '잠실',
    '신림',
    '노원',
    '신사',
    '영등포',
    '서울대입구',
    '성신여대',
    '명동',
    '천호',
    '용산',
    '종로',
    '구로',
    '성수',
    '연신내',
    '노량진',
    '왕십리',
    '동대문',
  ],
  '경기/인천': [
    '인천',
    '수원',
    '성남',
    '부천',
    '일산',
    '안산',
    '동탄',
    '평택',
    '의정부',
    '안양',
    '김포',
    '용인',
    '구리',
    '화정',
    '범계',
    '시흥',
    '이천',
    '하남',
    '화성',
    '산본',
  ],
  충청: ['대전', '천안', '청주', '당진'],
  경상: ['부산', '대구', '울산', '포항', '창원', '진주', '양산', '경주', '구미'],
  전라: ['광주', '전주', '익산', '여수', '목포', '순천'],
};

const AREA_OPTIONS = [
  { value: '', label: '지역 전체' },
  { value: '서울', label: '서울' },
  { value: '경기/인천', label: '경기도/인천' },
  { value: '충청', label: '충청도' },
  { value: '경상', label: '경상도' },
  { value: '전라', label: '전라도' },
  { value: '강원', label: '강원도' },
  { value: '제주', label: '제주도' },
];

export const Filter = ({ filters, setFilters }: FilterProps) => {
  const handleFilterChange = (area: string) => {
    setFilters({
      ...filters,
      area,
      location: '',
      searchTerm: '',
    });
  };

  const handleFilterLocation = (location: string) => {
    setFilters({
      ...filters,
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

  const renderLocationSelect = () => {
    const cities = CITY_OPTIONS[filters.area as keyof typeof CITY_OPTIONS];

    if (!cities) return null;

    return (
      <Select value={filters.location} onChange={handleFilterLocation} style={{ width: 140 }}>
        <Select.Option value="">도시 전체</Select.Option>
        {cities.map((city) => (
          <Select.Option key={city} value={city}>
            {city}
          </Select.Option>
        ))}
      </Select>
    );
  };

  return (
    <FilterContainer>
      <Space>
        <Select value={filters.area} onChange={handleFilterChange} style={{ width: 140 }}>
          {AREA_OPTIONS.map(({ value, label }) => (
            <Select.Option key={value} value={value}>
              {label}
            </Select.Option>
          ))}
        </Select>

        {renderLocationSelect()}

        <Input
          style={{ width: 200 }}
          value={filters.searchTerm}
          placeholder="검색어를 입력해주세요."
          onChange={(e) => handleFilterTextChange(e.target.value)}
        />
      </Space>
    </FilterContainer>
  );
};

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  max-width: 800px;
  margin: 20px auto;
  padding-left: 10px;
  padding-right: 10px;
  box-sizing: border-box;
`;
