import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Header from '../../components/Header';
import ImageUpload from '../../components/ImageUpload';
import Select from '../../components/Select';

import close from '/images/icons/close.svg';
import TypeSelector from '../../components/TypeSelector';
import Error from '../../components/Error';

const Write = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-back1 pt-14 pb-[100px]">
      <Header>
        <div className="flex items-center">
          <h1 className="text-[15px] font-bold text-font1">글 작성하기</h1>
        </div>
        <button className="fixed right-[17px]">
          <img
            onClick={() => navigate('/main')}
            src={close}
            alt="Close Icon"
            className="w-5 h-5"
          />
        </button>
      </Header>

      <div className="write-content bg-white mx-[16px] mt-[11px] px-[18px] py-[23px] rounded-md shadow-custom flex flex-col gap-[20px]">
        <ImageUpload />
        <TypeSelector />

        <form className="flex flex-col gap-[8px] text-[13px]">
          <div className="info-title">
            <div className="flex gap-[22px] py-[7px] mb-[7px] border-b">
              <p className="font-semibold">제목 </p>
              <input
                type="text"
                className="outline-none grow"
                placeholder="제목을 입력해주세요."
              />
            </div>
            <Error children={'* 제목은 필수입니다'}/>
          </div>

          <div className="info-location">
            <div className="flex gap-[22px] items-center py-[7px] mb-[7px]">
              <p className="font-semibold">공구 위치 </p>
              <Select />
            </div>
            <Error children={'* 공구 위치를 선택해주세요.'}/>
          </div>

          <div className="info-location-detail">
            <div className="flex gap-[22px] py-[7px] mb-[7px] border-b">
              <p className="font-semibold">공구 상세 위치 </p>
              <input
                type="text"
                className="outline-none text-xs grow"
                placeholder="거래 상세 위치를 입력해주세요."
              />
            </div>
            <Error children={'* 상세 위치는 필수입니다.'}/>
          </div>

          <div className="info-time">
            <div className="flex gap-[22px] py-[7px] mb-[7px] border-b">
              <p className="font-semibold">마감시간 </p>
              <input
                type="text"
                className="outline-none text-xs grow"
                placeholder="마감 시간을 입력해주세요."
              />
            </div>
            <Error children={'* 마감시간은 필수입니다'}/>
          </div>

          <div className="info-content mt-[20px] mb-[10px]">
            <h1 className="font-semibold">내용</h1>
            <textarea
              name=""
              id=""
              className="border outline-none text-xs resize-none w-full h-52 py-[5px] px-[10px] mt-[3px] rounded"
              placeholder="상품에 대한 설명을 적어주세요!"
            />
            <Error children={'* 내용은 필수입니다'}/>
          </div>
          <Button bg="main" color="white" height="40px" text="text-sm">
            작성 완료
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Write;
