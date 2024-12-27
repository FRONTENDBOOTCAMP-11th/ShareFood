import Button from '../../components/Button';
import Header from '../../components/Header';
import ImageUpload from '../../components/ImageUpload';
import Select from '../../components/Select';

import close from '/images/icons/close.svg';

const Write = () => {
  return (
    <div className="min-h-screen bg-back1 py-1">
      <Header>
        <div className="flex items-center">
          <h1 className="text-5 font-bold ml-2 text-font1">글 작성하기</h1>
        </div>
        <button className="fixed right-[17px]">
          <img src={close} alt="Close Icon" className="w-5 h-5" />
          {/* X 버튼 누를 시 이번트 설정 必 */}
        </button>
      </Header>
      <div className="write-content w-[418px] mt-[66px] bg-white mx-[14px] px-[40px] border border-back1 rounded-md pb-[23px]  shadow-button max-h-full">
        <ImageUpload />
        <div className="flex justify-center gap-[12px]">
          <Button
            height="36px"
            text="text-sm"
            bg="main"
            width="160px"
            color="white"
          >
            같이 사요
          </Button>
          <Button
            height="36px"
            text="text-sm"
            bg="white"
            color="subText"
            width="160px"
          >
            팔아요
          </Button>
        </div>
        <div className="write-info mt-[22px]">
          <div className="info-title">
            <div className="flex gap-[22px] h-[22px] items-center">
              <p className="font-semibold text-xs">제목 </p>
              <input
                type="text"
                className="outline-none text-xs grow"
                placeholder="제목을 입력해주세요."
              />
            </div>
            <div>
              <hr className="bg-line2 border-0 h-[1px]" />
              {/* 입력 여부에 따라 아래 p나올지 말지 결정 */}
              <p
                className="text-s text-red-500 h-[20px] leading-5
              "
              >
                * 제목은 필수입니다
              </p>
            </div>
          </div>
          <div className="info-location">
            <div className="flex gap-[22px] h-[37px] items-center">
              <p className="font-semibold text-xs">공구 위치 </p>
              <Select />
            </div>
            <div>
              {/* 입력 여부에 따라 아래 p나올지 말지 결정 */}
              <p
                className="text-s text-red-500 h-[20px] leading-5
              "
              >
                * 공구 위치를 선택해주세요.
              </p>
            </div>
          </div>
          <div className="info-location-detail">
            <div className="flex gap-[22px] h-[22px] items-center">
              <p className="font-semibold text-xs">공구 상세 위치 </p>
              <input
                type="text"
                className="outline-none text-xs grow"
                placeholder="거래 상세 위치를 입력해주세요."
              />
            </div>
            <div>
              <hr className="bg-line2 border-0 h-[1px]" />
              {/* 입력 여부에 따라 아래 p나올지 말지 결정 */}
              <p
                className="text-s text-red-500 h-[20px] leading-5
              "
              >
                * 상세 위치는 필수입니다.
              </p>
            </div>
          </div>
          <div className="info-time">
            <div className="flex gap-[22px] h-[22px] items-center">
              <p className="font-semibold text-xs">마감시간 </p>
              <input
                type="text"
                className="outline-none text-xs grow"
                placeholder="마감 시간을 입력해주세요."
              />
            </div>
            <div>
              <hr className="bg-line2 border-0 h-[1px]" />
              {/* 입력 여부에 따라 아래 p나올지 말지 결정 */}
              <p
                className="text-s text-red-500 h-[20px] leading-5
              "
              >
                * 마감시간은 필수입니다
              </p>
            </div>
          </div>
          <div className="info-content mt-[25px] mb-[11px]">
            <h1 className="font-semibold text-xs">내용</h1>
            <textarea
              name=""
              id=""
              className="border outline-none text-xs resize-none w-full h-52 py-[5px] px-[10px] mt-[3px] rounded"
              placeholder="상품에 대한 설명을 적어주세요!"
            />
          </div>
        </div>
        <Button bg="main" color="white" height="40px" text="text-sm">
          작성 완료
        </Button>
      </div>
    </div>
  );
};

export default Write;
