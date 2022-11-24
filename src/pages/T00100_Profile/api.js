import { callAPI } from 'utilities/axios';

// 取得使用者暱稱 done
export const getNickName = async (param) => {
  const response = await callAPI('/api/setting/member/getInfo', param);
  return response;
};

// 更新使用者暱稱 done
export const updateNickName = async (param) => {
  const response = await callAPI('/api/setting/member/updateInfo', param);
  return response.data;
};

// 上傳 avatar
export const uploadAvatar = async (imageData) => {
  const data = new FormData();
  data.append('file', imageData);

  const response = await callAPI(
    '/api/setting/member/uploadImagePF',
    null,
    {
      headers: {
        // 'Content-Type': 'multipart/form-data',
        'Content-Type': 'image/xyz',
      },
      data,
    },
  );
  return response.data;
};
