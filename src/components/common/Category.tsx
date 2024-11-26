import { TCategory } from '@/types';
import type { Dispatch, SetStateAction } from 'react';

interface Props {
  selectedCategory: number;
  setSelectedCategory: Dispatch<SetStateAction<number>>;
}

function Category({ selectedCategory, setSelectedCategory }: Props) {
  const categories: TCategory[] = [
    {
      id: 170,
      name: '경제/경영',
    },
    {
      id: 2105,
      name: '고전',
    },
    {
      id: 987,
      name: '과학',
    },
    {
      id: 2551,
      name: '만화',
    },
    {
      id: 1,
      name: '소설/시/희곡',
    },
    {
      id: 55889,
      name: '에세이',
    },
    {
      id: 74,
      name: '역사',
    },
    {
      id: 517,
      name: '예술/대중문화',
    },
    {
      id: 1322,
      name: '외국어',
    },
    {
      id: 656,
      name: '인문학',
    },
    {
      id: 336,
      name: '자기계발',
    },
    {
      id: 112011,
      name: '장르소설',
    },
    {
      id: 351,
      name: '컴퓨터/모바일',
    },
    {
      id: 55890,
      name: '건강/취미/레저',
    },
    {
      id: 2913,
      name: '잡지',
    },
  ];

  return (
    <div className="flex flex-wrap gap-[0.5rem] p-[0.5rem] border-2 rounded-[0.5rem]">
      {categories.map((el: TCategory) => (
        <button
          type="button"
          key={el.id}
          className={`p-[0.25rem] border-2 rounded-[0.5rem] ${el.id === selectedCategory && 'bg-gray-300'}`}
          onClick={() => {
            setSelectedCategory(el.id);
          }}>
          {el.name}
        </button>
      ))}
    </div>
  );
}

export default Category;
