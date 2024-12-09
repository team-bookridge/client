import categories from '@/consts/categories';
import type { Dispatch, SetStateAction } from 'react';

interface Props {
  selectedCategory: number;
  setSelectedCategory: Dispatch<SetStateAction<number>>;
}

function CategoryH({ selectedCategory, setSelectedCategory }: Props) {
  return (
    <div className="flex flex-wrap justify-center gap-[0.5rem] p-[0.5rem] my-[1rem] border-2 border-[#E4E6D9] rounded-[0.5rem]">
      {categories.map((el) => (
        <button
          type="button"
          key={el.id}
          className={`px-[0.5rem] py-[0.25rem] text-white font-[900] rounded-[0.5rem] ${el.id === selectedCategory ? 'bg-[#45624E]' : 'bg-[#C0CFB2]'}`}
          onClick={() => {
            setSelectedCategory(el.id);
          }}>
          {el.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryH;
