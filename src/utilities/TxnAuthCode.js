export const AuthCode = {
  A00700: 0x28, // 定期更新密碼(一年)
  C00600: 0x30, // 新增/關閉存錢計畫(約轉、預約轉)
  C00900: 0x30, // 台幣定存
  C01000: 0x30, // 外幣定存
  D00100: {
    NONREG: 0x20, // 台幣-非約轉帳
    REG: 0x30, // 台幣-約定轉帳
  },
  D00300: 0x20, // 無卡提款-交易
  D00400: 0x20, // 無卡提款密碼變更流程
  D00700: 0x30, // 本行同幣別外幣轉帳
  D00800: 0x28, // 預約轉帳取消
  E00100: {
    TWD_F: 0x30, // 換匯-台換外
    F_TWD: 0x30, // 換匯-外換台
  },
  R00200: 0x30, // 信用卡-消費分期
  R00400: 0x30, // 信用卡-繳費
  R00500: 0x30, // 信用卡-自動扣繳
  R00600: 0x30, // 信用卡-額度臨調
  S00400: 0x30, // 訊息通知設定(第一次開啟)
  S00700: 0x20, // 金融卡啟用
  S00800: 0x28, // 金融卡掛失補發
  T00200: {
    SET: 0x11, // 生物辨識/圖形-設定
    UNSET: 0x20, // 生物辨識/圖形-解除
  },
  T00300: {
    APPLY: 0x20, // 非約轉設定-申請
    EDIT: 0x21, // 非約轉設定-手機號碼修改
    CLOSE: 0x20, // 非約轉設定-關閉
  },
  T00400: 0x20, // 無卡提款-設定
  T00600: 0x23, // 手機號碼收款設定
  T00700: {
    MOBILE: 0x31, // 基本資料變更-通訊門號
    EMAIL: 0x28, // 基本資料變更-電子郵件
    ADDRESS: 0x28, // 基本資料變更-通訊地址
  },
  T00800: 0x28, // 使用者代號變更
  T00900: 0x28, // 網銀密碼變更
};
