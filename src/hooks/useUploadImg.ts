import axios from 'axios';

export const uploadImg = async (files: File[]) => {
  try {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('attach', file);
    });

    const result = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/files`,
      formData,
      {
        headers: {
          'client-id': 'final07',
        },
      },
    );

    return result.data.item[0];
  } catch (error) {
    console.error('파일 업로드 실패:', error);
    throw error;
  }
};
