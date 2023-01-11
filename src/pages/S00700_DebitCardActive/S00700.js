import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useQLStatus } from 'hooks/useQLStatus';
import Layout from 'components/Layout/Layout';
import { FEIBButton } from 'components/elements';
import { TextInputField } from 'components/Fields';
import { AuthCode } from 'utilities/TxnAuthCode';
import { transactionAuth } from 'utilities/AppScriptProxy';
import { getStatus } from 'pages/S00800_LossReissue/api';

import { useDispatch } from 'react-redux';
import { setWaittingVisible } from 'stores/reducers/ModalReducer';
import { activate } from './api';
import DebitCardActiveWrapper from './S00700.style';

const S00700 = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { QLResult, showUnbondedMsg } = useQLStatus();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: { accountNo: '', serial: '' },
    resolver: yupResolver(
      yup.object().shape({
        accountNo: yup.string().required('請輸入金融卡帳號').matches(/^(\d{14})?$/, '金融卡帳號由14個數字所組成'),
        serial: yup.string().required('請輸入金融卡序號').matches(/^(\d{6})?$/, '金融卡序號由6個數字所組成'),
      }),
    ),
  });

  const submitHandler = async ({serial}) => {
    dispatch(setWaittingVisible(true));
    const auth = await transactionAuth(AuthCode.S00700);
    if (auth && auth.result) {
      const activateResult = await activate({serial});
      if (activateResult) {
        history.push('/S007001', activateResult);
      }
    }
    dispatch(setWaittingVisible(false));
  };

  useEffect(() => {
    if (!QLResult) showUnbondedMsg();
  }, [QLResult]);

  /**
   * 檢查是否可以開啟這個頁面。
   * @returns {Promise<String>} 傳回驗證結果的錯誤訊息；若是正確無誤時，需傳回 null
   */
  const inspector = async () => {
    const {status, statusDesc, account} = await getStatus();
    if (status !== 2) {
      return `卡片狀態為(${statusDesc})，不需進行金融卡啟用。`;
    }

    reset((formValues) => ({
      ...formValues,
      accountNo: account, // 我的金融卡帳號欄位自動帶入金融卡臺幣主帳號
    }));
    return null;
  };

  return (
    <Layout title="金融卡啟用" inspector={inspector}>
      <DebitCardActiveWrapper>
        <form style={{ minHeight: 'initial' }} onSubmit={handleSubmit(submitHandler)}>
          <TextInputField
            labelName="我的金融卡帳號"
            name="accountNo"
            control={control}
            // NOTE : ios 遇到 disabled 的欄位，會將欄位內的 opacity 調低，因此字體看起來顏色會變淡
            inputProps={{disabled: true}}
          />
          <TextInputField
            labelName="我的金融卡序號"
            name="serial"
            placeholder="請輸入金融卡序號"
            inputProps={{maxLength: 6, inputMode: 'numeric'}}
            control={control}
          />
          <p className="hint_text">金融卡序號為金融卡背面右下角6碼數字</p>
          <FEIBButton type="submit">確認</FEIBButton>
        </form>
      </DebitCardActiveWrapper>
    </Layout>
  );
};

export default S00700;
