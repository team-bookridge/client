import React from 'react';

interface HomeTitleProps {
  text: string;
}

const HomeTitle: React.FC<HomeTitleProps> = ({ text }) => {
  return (
    <h2 className="text-[1.5rem] py-[1rem] text-[#4F772D] border-b-4 border-[#C0CFB2] font-[900]">
      {text}
    </h2>
  );
};

export default HomeTitle;
