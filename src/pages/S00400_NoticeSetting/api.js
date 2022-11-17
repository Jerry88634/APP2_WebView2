import { callAPI } from 'utilities/axios';

/**
 * 通知設定綁定
 * @param {*} request {
 *  communityNotice: 是否啟用社群通知 : Y:啟用 , N:關閉
 *  boardNotice: 是否啟用公告通知 : Y:啟用 , N:關閉
 *  securityNotice: 是否啟用安全通知 : Y:啟用 , N:關閉
 *  nightMuteNotice: 是否啟用夜間靜音通知 : Y:啟用 , N:關閉
 * }
 * @returns
 */
export const bindPushSetting = async (request) => {
  const response = await callAPI('/api/push/v1/bindPushSetting', request);
  return response.data;
};

/**
 * 查詢客戶綁定通知
 * @returns {
 *  communityNotice: 是否啟用社群通知 : Y:啟用 , N:關閉
 *  boardNotice: 是否啟用公告通知 : Y:啟用 , N:關閉
 *  securityNotice: 是否啟用安全通知 : Y:啟用 , N:關閉
 *  nightMuteNotice: 是否啟用夜間靜音通知 : Y:啟用 , N:關閉
 * }
 */
export const queryPushSetting = async () => {
  const response = await callAPI('/api/push/v1/queryPushSetting');
  return response.data;
};

/**
 * 呼叫原生查詢推播通知功能同意狀態 DEBUG: mock
 * @returns {{
 *  PushBindStatus: boolean
 * }} PushBindStatus: 表是否同意
 */
export const queryPushBindMock = async () => {
  console.log('S00400 api queryIsNoticeOn(): 查詢推播通知功能開啟狀態');
  const mockRes = {
    PushBindStatus: false,
  };

  return mockRes.PushBindStatus;
};

/**
 * 更新推播通知綁定狀態 DEBUG: mock
 * @returns {{
 *  code: string,
 *  message: string
 * }}
 * code: '0000' 為成功
 */
export const updatePushBindMock = async () => {
  console.log('S00400 api turnOnNoticeSetting(): 開啟設定');
  const mockRes = {
    code: '0000',
    message: '',
  };

  return mockRes;
};
