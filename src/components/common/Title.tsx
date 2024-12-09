interface HomeTitleProps {
  text: string;
}
function Title({ text }: HomeTitleProps) {
  return (
    <h2 className="text-[1.5rem] py-[1rem] text-[#4F772D] border-b-4 border-[#C0CFB2] font-[900]">
      {text}
    </h2>
  );
}

export default Title;
