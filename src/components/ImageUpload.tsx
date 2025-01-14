import { useRef, useState } from 'react';
import photo from '/images/photo.svg';
import useAxiosInstance from '../hooks/useAxiosInstance';

function ImageUpload({ onChange }: { onChange: (images: string[]) => void }) {
  const [showImages, setShowImages] = useState<string[]>([]);
  const [imageCount, setImageCount] = useState<number>(0);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [isDrag, setIsDrag] = useState<boolean>(false);
  const [startX, setStartX] = useState<number | undefined>(undefined);

  const onDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (scrollRef.current) {
      setIsDrag(true);
      setStartX(e.pageX + scrollRef.current.scrollLeft);
    }
  };

  const onDragEnd = () => {
    setIsDrag(false);
  };

  const onDragMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDrag && scrollRef.current) {
      const { scrollWidth, clientWidth, scrollLeft } = scrollRef.current;

      scrollRef.current.scrollLeft = (startX || 0) - e.pageX;

      if (scrollLeft === 0) {
        setStartX(e.pageX); // 가장 왼쪽일 때
      } else if (scrollWidth <= clientWidth + scrollLeft) {
        setStartX(e.pageX + scrollLeft); // 가장 오른쪽일 때
      }
    }
  };

  const throttle = <T extends (e: React.MouseEvent<HTMLDivElement>) => void>(
    func: T,
    ms: number
  ) => {
    let throttled = false;
    return (e: React.MouseEvent<HTMLDivElement>) => {
      if (!throttled) {
        throttled = true;
        setTimeout(() => {
          func(e);
          throttled = false;
        }, ms);
      }
    };
  };

  const delay = 50;
  const onThrottleDragMove = throttle(onDragMove, delay);
  const axiosInstance = useAxiosInstance();

  // 이미지 상대경로 저장
  const handleAddImages = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    // 파일의 정보를 불러옴
    const imageLists = event.target.files;
    // 파일의 정보를 react 상태 관리
    const imageUrlLists: Array<string> = [...showImages];
    // 서버에 보낼 이미지
    const imageUpload: Array<string> = [];

    if (imageLists) {
      if (showImages.length + imageLists.length > 5) {
        alert('5장까지 첨부가 가능합니다.');
        return;
      }
      for (let i = 0; i < imageLists.length; i++) {
        // 상대 경로만 반환 받아서 변수에 할당
        const currentImageUrl = URL.createObjectURL(imageLists[i]);
        imageUrlLists.push(currentImageUrl);

        // 서버 업로드
        const formData = new FormData();
        formData.append('attach', imageLists[i]);

        try {
          const res = await axiosInstance.post('/files', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          const imagePath = res.data.item[0].path;

          imageUpload.push(imagePath);

          console.log(currentImageUrl); // 화면 출력용 경로
          console.log(imagePath); // 서버 업로드되는 경로

          // 상대 경로의 리스트를 저장
          setShowImages(imageUrlLists);

          setImageCount(imageUrlLists.length);

          // 이미지 경로 전달
          onChange(imageUpload);
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  // x 버튼 클릭 시 이미지 삭제
  const handleDeleteImage: React.MouseEventHandler<HTMLButtonElement> = (
    event,
  ) => {
    const id = Number(event.currentTarget.dataset.id); // data-id 속성에서 ID를 가져옴
    setShowImages(showImages.filter((_, index) => index !== id));
    onChange(showImages.filter((_, index) => index !== id)); // 변경된 이미지 경로 전달
    setImageCount(imageCount - 1);
  };

  return (
    <div
      className="flex gap-x-4 flex-nowrap overflow-x-hidden"
      onMouseDown={onDragStart}
      onMouseMove={isDrag ? onThrottleDragMove : undefined}
      onMouseUp={onDragEnd}
      onMouseLeave={onDragEnd}
      ref={scrollRef}
    >
      {showImages.map((image, id) => (
        <div key={id} className="relative">
          <img src={image} className="w-[100px] h-[100px]" />
          <button
            data-id={id}
            onClick={handleDeleteImage}
            className="absolute top-1 right-1 text-l text-gray-300 cursor-pointer"
          >
            {/* X 버튼 색 변경 필요! */}X
          </button>
        </div>
      ))}
      <label
        htmlFor="uploadFile1"
        className="bg-white text-gray-500 font-normal text-xs rounded-md min-w-[100px] h-[100px] flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300  "
      >
        <img src={photo} alt="사진첨부 이미지" className="mb-1.5" />
        <input
          type="file"
          onChange={handleAddImages}
          accept=".png, .svg,.jpg"
          multiple
          id="uploadFile1"
          className="hidden"
        />
        <p className="text-xs font-normal text-gray-400 mt-2">{imageCount}/5</p>
      </label>
    </div>
  );
}

export default ImageUpload;
