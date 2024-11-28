import githubIcon from '@/assets/github-icon.png';

function Footer() {
  return (
    <div className="flex flex-col gap-[2rem] py-[5rem] bg-gray-100">
      <div className="flex flex-col items-center">
        <div className="flex gap-[1rem]">
          <h2 className="text-[1.25rem]">TeamProject - Bookridge</h2>
          <a
            href="https://github.com/team-bookridge/client"
            target="_blank"
            rel="noreferrer">
            <img
              className="hover:bg-pink-200 bg-white w-[2rem] rounded-full"
              src={githubIcon}
              alt="깃허브 아이콘"
            />
          </a>
        </div>
        <p>
          도서 목록을 보여주고, 구매 사이트로 이동하는 링크를 제공하는 사이트
        </p>
      </div>
      <div className="md:flex-row md:justify-around md:gap-0  flex flex-col gap-[2rem]">
        <div className="flex flex-col items-center">
          <h3 className="text-[1.25rem]">개발자 정보</h3>
          <div className="">
            <div className="flex vs:gap-[0.5rem] gap-0 vs:flex-row flex-col">
              <span>오건국 - 팀장</span>
              <div className="flex gap-[0.5rem]">
                <span>📧</span>
                <span>9mihoAhri@gmail.com</span>
                <a
                  href="https://github.com/ogg1996"
                  target="_blank"
                  rel="noreferrer">
                  <img
                    className="hover:bg-pink-200 bg-white w-[1.5rem] rounded-full"
                    src={githubIcon}
                    alt="깃허브 아이콘"
                  />
                </a>
              </div>
            </div>
            <div className="flex vs:gap-[0.5rem] gap-0 vs:flex-row flex-col">
              <span>정찬희 - 팀원</span>
              <div className="flex gap-[0.5rem]">
                <span>📧</span>
                <span>chanhee0708jdm@gmail.com</span>
                <a
                  href="https://github.com/pinkchanhee"
                  target="_blank"
                  rel="noreferrer">
                  <img
                    className="hover:bg-pink-200 bg-white w-[1.5rem] rounded-full"
                    src={githubIcon}
                    alt="깃허브 아이콘"
                  />
                </a>
              </div>
            </div>
            <div className="flex vs:gap-[0.5rem] gap-0 vs:flex-row flex-col">
              <span>추서령 - 팀원</span>
              <div className="flex gap-[0.5rem]">
                <span>📧</span>
                <span>srchoo19@gmail.com</span>
                <a
                  href="https://github.com/jennachuu"
                  target="_blank"
                  rel="noreferrer">
                  <img
                    className="hover:bg-pink-200 bg-white w-[1.5rem] rounded-full"
                    src={githubIcon}
                    alt="깃허브 아이콘"
                  />
                </a>
              </div>
            </div>
            <div className="flex vs:gap-[0.5rem] gap-0 vs:flex-row flex-col">
              <span>안수연 - 팀원</span>
              <div className="flex gap-[0.5rem]">
                <span>📧</span>
                <span>werther0704@gmail.com</span>
                <a
                  href="https://github.com/wave-rec"
                  target="_blank"
                  rel="noreferrer">
                  <img
                    className="hover:bg-pink-200 bg-white w-[1.5rem] rounded-full"
                    src={githubIcon}
                    alt="깃허브 아이콘"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h3 className="text-[1.25rem]">API 출처</h3>
          <div className="flex flex-col items-center">
            <span>도서 DB 제공 : 알라딘 인터넷서점</span>
            <div>
              &#40;&nbsp;
              <a
                className="hover:text-blue-600 underline"
                href="https://www.aladin.co.kr"
                target="_blank"
                rel="noreferrer">
                www.aladin.co.kr
              </a>
              &nbsp;&#41;
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <p className="text-[1.25rem]">
          본 사이트는 학습이 목적이며 상업을 목적으로 제작한 사이트가 아닙니다.
        </p>
      </div>
    </div>
  );
}

export default Footer;
