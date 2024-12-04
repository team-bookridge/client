import { TCategory } from '@/types';
import { useQueryClient } from '@tanstack/react-query';
import type { Dispatch, SetStateAction } from 'react';

interface Props {
  selectedCategory: number;
  setSelectedCategory: Dispatch<SetStateAction<number>>;
}

function CategoryH({ selectedCategory, setSelectedCategory }: Props) {
  const queryClient = useQueryClient();
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
      id: 351,
      name: '컴퓨터/모바일',
    },
    {
      id: 55890,
      name: '건강/취미',
    },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-[0.5rem] p-[0.5rem] my-[1rem] border-2 border-[#E4E6D9] rounded-[0.5rem]">
      {categories.map((el) => (
        <button
          type="button"
          key={el.id}
          className={`px-[0.5rem] py-[0.25rem] text-white font-[900] rounded-[0.5rem] ${el.id === selectedCategory ? 'bg-[#45624E]' : 'bg-[#C0CFB2]'}`}
          onClick={() => {
            setSelectedCategory(el.id);
            queryClient.invalidateQueries({ queryKey: ['EditorChoice-List'] });
          }}>
          {el.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryH;
