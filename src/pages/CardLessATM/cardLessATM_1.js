// import { useState } from 'react';
import { useHistory } from 'react-router';
import { useCheckLocation, usePageInfo } from 'hooks';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

/* Elements */
import {
  FEIBInput, FEIBInputLabel, FEIBButton, FEIBBorderButton, FEIBErrorMessage,
} from 'components/elements';
import DebitCard from 'components/DebitCard';
import PasswordInput from 'components/PasswordInput';
import Accordion from 'components/Accordion';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';

/* Styles */
// import theme from 'themes/theme';
import CardLessATMWrapper from './cardLessATM.style';

const CardLessATM1 = () => {
  /**
   *- 資料驗證
   */
  const schema = yup.object().shape({
    withdrawAmount: yup
      .string()
      .required('請輸入提款金額'),
    password: yup
      .string()
      .required('請輸入網銀密碼')
      .min(8, '您輸入的網銀密碼長度有誤，請重新輸入。')
      .max(20, '您輸入的網銀密碼長度有誤，請重新輸入。'),
  });
  const {
    handleSubmit, control, formState: { errors }, setValue, clearErrors,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const history = useHistory();

  const amountArr = [1000, 2000, 3000, 5000, 10000, 20000];

  const toStep2 = () => {
    history.push('/cardLessATM2');
  };

  const toChangePassword = () => {
    history.push('/cardLessWithDrawChgPwd');
  };

  const toCurrncy = (num) => {
    const arr = num.toString().split('');
    arr.splice(-3, 0, ',');
    return arr.join('');
  };

  const onSubmit = (data) => {
    // eslint-disable-next-line no-console
    console.log(data);
    toStep2();
  };

  useCheckLocation();
  usePageInfo('/api/cardLessATM');

  return (
    <CardLessATMWrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DebitCard
          cardName="存款卡"
          account="04304099001568"
          balance="168,000"
        />
        <div className="withdrawTimesInfo tip">
          免費跨提次數
          <span> 6 </span>
          次 / 免費跨轉次數
          <span> 6 </span>
          次
        </div>
        <FEIBInputLabel>您想提領多少錢呢?</FEIBInputLabel>
        <Controller
          name="withdrawAmount"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <FEIBInput
              {...field}
              type="text"
              inputMode="numeric"
              id="withdrawAmount"
              name="withdrawAmount"
              placeholder="請輸入提款金額"
              error={!!errors.withdrawAmount}
            />
          )}
        />
        <FEIBErrorMessage>{errors.withdrawAmount?.message}</FEIBErrorMessage>
        <div className="amountButtonsContainer">
          {
            amountArr.map((item) => (
              <div key={item} className="withdrawalBtnContainer">
                <FEIBBorderButton
                  type="button"
                  className="withdrawal-btn customSize"
                  onClick={() => {
                    setValue('withdrawAmount', item);
                    clearErrors('withdrawAmount');
                  }}
                >
                  {
                    toCurrncy(item)
                  }
                </FEIBBorderButton>
              </div>
            ))
          }
        </div>
        <PasswordInput
          label="網銀密碼"
          id="password"
          name="password"
          placeholder="請輸入網銀密碼"
          control={control}
          errorMessage={errors.password?.message}
        />
        <div className="toChangePwd" onClick={toChangePassword} aria-hidden="true">
          <span>
            我要變更無卡提款密碼
          </span>
          <ExitToAppRoundedIcon />
        </div>
        <Accordion space="both">
          一些注意事項
        </Accordion>
        <FEIBButton
          type="submit"
        >
          下一步
        </FEIBButton>
      </form>
    </CardLessATMWrapper>
  );
};

export default CardLessATM1;
