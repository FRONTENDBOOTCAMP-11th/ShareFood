import dayjs, { Dayjs } from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { forwardRef } from 'react';

interface PickerProps {
  selectDate: Dayjs | null;
  setSelectDate: (value: Dayjs | null) => void;
  placeholder: string;
}

const Picker = forwardRef<HTMLDivElement, PickerProps>(
  ({ selectDate, setSelectDate, placeholder }: PickerProps, ref) => {
    return (
      <div className="w-full" ref={ref}>
        <DateTimePicker
          label={placeholder}
          value={selectDate}
          onChange={(value) => setSelectDate(value)}
          format="YYYY.MM.DD HH:mm"
          minDate={dayjs()}
          ampm={false}
          slotProps={{
            textField: {
              sx: {
                minWidth: '100%',
                '& .MuiInputBase-input': {
                  fontSize: '13px',
                  fontFamily: 'pretendard',
                },
                '& .MuiOutlinedInput-root': {
                  height: '50px',
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#4CAF50', // 포커스 시 테두리 색상
                    borderWidth: '2px',
                  },
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#BDBDBD', // 테두리 색상
                },
                '& .MuiSvgIcon-root': {
                  color: '#4CAF50', // 아이콘 색상
                },
                '& .MuiInputLabel-root': {
                  fontSize: '13px',
                  color: '#757575', // 기본 라벨 색상
                  '&.Mui-focused': {
                    color: '#4CAF50', // 포커스 시 라벨 색상
                  },
                },
              },
            },
            popper: {
              sx: {
                '& .Mui-selected': {
                  backgroundColor: '#4CAF50 !important', // 선택된 날짜 색상
                  color: '#fff',
                },
                '& .MuiPaper-root': {
                  display: 'flex',
                  width: 470, // 팝업(달력+시간 선택창) 너비
                  height: 400, // 팝업 높이
                },
                '& .MuiMultiSectionDigitalClockSection-root': {
                  width: 80,
                },
              },
            },
          }}
        />
      </div>
    );
  },
);

export default Picker;
