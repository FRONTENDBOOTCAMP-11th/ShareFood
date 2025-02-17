import { useRef, useState } from 'react';
import photo from '/images/photo.svg';
import useAxiosInstance from '../hooks/useAxiosInstance';

interface UploadImgProps {
  onChange: (newPath: string[]) => void;
  onDelete: (updatePath: string[]) => void;
}

interface ImgProps {
  preview: string;
  serverPath: string;
}

function ImageUpload({ onChange, onDelete }: UploadImgProps) {
  const [showImages, setShowImages] = useState<ImgProps[]>([]);
  const [imageCount, setImageCount] = useState<number>(0);

  // 이미지 스크롤
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [isDrag, setIsDrag] = useState<boolean>(false);
  const [startX, setStartX] = useState<number | undefined>(undefined);

  const axiosInstance = useAxiosInstance();

  // PointerEvent 사용
  const onDragStart = (e: React.PointerEvent<HTMLDivElement>) => {
    if (scrollRef.current) {
      setIsDrag(true);
      setStartX(e.pageX + scrollRef.current.scrollLeft);
    }
  };

  const onDragEnd = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.releasePointerCapture(e.pointerId);
    setIsDrag(false);
  };

  const onDragMove = (e: React.PointerEvent<HTMLDivElement>) => {
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

  const throttle = <T extends (e: React.PointerEvent<HTMLDivElement>) => void>(
    func: T,
    ms: number,
  ) => {
    let throttled = false;
    return (e: React.PointerEvent<HTMLDivElement>) => {
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

  // 이미지 상대경로 저장
  const handleAddImages = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    // 파일의 정보를 불러옴
    const imageLists = event.target.files;

    if (!imageLists) return;

    if (showImages.length + imageLists.length > 5) {
      alert('5장까지 첨부가 가능합니다.');
      event.target.value = '';
      return;
    }

    // 서버로 보낼 이미지 및 경로
    const newImages = [...showImages];

    // 부모에게 넘길 서버 경로
    const newPath: string[] = [];

    for (let i = 0; i < imageLists.length; i++) {
      const image = imageLists[i];

      // blob URL
      const previewURL = URL.createObjectURL(image);

      // 서버 업로드
      try {
        const formData = new FormData();
        formData.append('attach', imageLists[i]);

        const res = await axiosInstance.post('/files', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const imagePath = res.data.item[0].path;

        // 새로운 ImgProps 생성
        newImages.push({
          preview: previewURL,
          serverPath: imagePath,
        });

        newPath.push(imagePath);
      } catch (error) {
        console.error(error);
      }
    }

    // 상대 경로의 리스트를 저장
    setShowImages(newImages);
    setImageCount(newImages.length);

    // 이미지 경로 전달
    onChange(newPath);

    event.target.value = '';
  };

  // x 버튼 클릭 시 이미지 삭제
  const handleDeleteImage: React.MouseEventHandler<HTMLButtonElement> = (
    event,
  ) => {
    const id = Number(event.currentTarget.dataset.id); // data-id 속성에서 ID를 가져옴
    const updateImg = showImages.filter((_, index) => index !== id);
    setShowImages(updateImg);
    setImageCount(updateImg.length);

    const updatePath = updateImg.map((img) => img.serverPath);
    onDelete(updatePath); // 변경된 이미지 경로 전달
  };

  return (
    <div className="flex flex-row gap-x-4 flex-nowrap py-1">
      <label
        htmlFor="uploadFile1"
        className="bg-white text-gray-500 font-normal text-xs rounded-md min-w-[100px] h-[100px] flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 shrink-0 "
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
      <div
        className="flex flex-row flex-nowrap gap-3 select-none overflow-x-hidden"
        onPointerDown={onDragStart}
        onPointerMove={isDrag ? onThrottleDragMove : undefined}
        onPointerUp={onDragEnd}
        onPointerLeave={onDragEnd}
        ref={scrollRef}
        style={{ touchAction: 'none' }}
      >
        {showImages.map((image, id) => (
          <div key={id} className="relative shrink-0">
            <img
              src={image.preview}
              draggable="false" // e.preventDefault() 대신 사용해서 이미지 드래그 막음
              className="w-[100px] h-[100px] object-cover shrink-0 rounded-md"
            />
            <button
              data-id={id}
              onClick={handleDeleteImage}
              className="absolute top-1 right-1 text-l text-gray-300 cursor-pointer"
            >
              {/* X 버튼 색 변경 필요! */}X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageUpload;
