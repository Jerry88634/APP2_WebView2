/* eslint-disable no-unused-vars */
import { callAPI } from 'utilities/axios';

/**
 * 社群帳本API測試
 */
export const ledgerApiTest = async () => {
  let uuidtoken = sessionStorage.getItem('ledger_uuidtoken');
  if (!uuidtoken) {
    // *** 一定要執行 ***
    const getKeyRs = await callAPI('/ledger/getKey', { // 不能重複取值！
      data: {
        uuidtoken: null,
        key: sessionStorage.getItem('publicKey'),
        type: 2, // 裝置類型(1.Web, 2.iOS, 3.Android, 0.Unknown)
      },
    });
    uuidtoken = getKeyRs.data.uuidtoken;
    sessionStorage.setItem('ledger_uuidtoken', uuidtoken);

    // *** 一定要執行 ***
    // Bankee會員在登入後，進入帳本的登入
    const bankeeLoginRs = await callAPI('/ledger/memberHadLogin');

    // // 登入（訪客？）
    // const response = await callAPI('/ledger/memberLogin', {
    //   data: {
    //     token: uuidtoken,
    //     deviceName: 'SM-S9060',
    //     osVersion: 'Android|13|1.0.15',
    //     push: '',
    //     mudid: '',
    //   },
    // }).data;
  }

  /*
  // 帳本首頁
  const initListRs = await callAPI('/ledger/initList');
  // 銀行代碼清單
  const bankListRs = await callAPI('/ledger/bankList');
  // 我的帳本清單(可取得 ledgerId)
  const ledgerListRs = await callAPI('/ledger/ledgerList');
  // 我的帳本清單
  const ledgerListRs = await callAPI('/ledger/getLedger', { ledgerid: '470' });
  */
};