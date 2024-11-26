import Category from '@components/common/Category';
import { useState } from 'react';

function EditorChoice() {
  const [selectedCategory, setSelectedCategory] = useState<number>(170);

  return (
    <>
      <h2 className="text-[1.5rem] border-b-2">편집자추천</h2>
      <Category
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <div className="flex flex-wrap">
        <div className="md:w-[50%] bg-gray-400 w-[100%] h-[300px] border-b-2">
          item1
        </div>
        <div className="md:w-[50%] bg-gray-400 w-[100%] h-[300px] border-b-2">
          item2
        </div>
        <div className="md:w-[50%] bg-gray-400 w-[100%] h-[300px] border-b-2">
          item3
        </div>
        <div className="md:w-[50%] bg-gray-400 w-[100%] h-[300px] border-b-2">
          item4
        </div>
        <div className="md:w-[50%] bg-gray-400 w-[100%] h-[300px] border-b-2">
          item5
        </div>
        <div className="md:w-[50%] bg-gray-400 w-[100%] h-[300px] border-b-2">
          item6
        </div>
        <div className="md:w-[50%] bg-gray-400 w-[100%] h-[300px] border-b-2">
          item7
        </div>
        <div className="md:w-[50%] bg-gray-400 w-[100%] h-[300px] border-b-2">
          item8
        </div>
      </div>
    </>
  );
}

export default EditorChoice;
