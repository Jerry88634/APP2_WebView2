import {
  accountFormatter, dateToString, toCurrency, weekNumberToChinese,
} from 'utilities/Generator';
import InformationList from 'components/InformationList';
import { getBankCode } from 'utilities/CacheData';
import { useEffect, useState } from 'react';
import { DialogContentWrapper } from '../D00800.style';

const DetailContent = ({ data, selectedAccount }) => {
  const [receiveBankName, setReceiveBankName] = useState('');
  const generatePeriodText = () => {
    switch (data.cycle) {
      case ('W'):
        return `每週星期${weekNumberToChinese(Number(data.cycleNo))}`;
      case ('M'):
        return `每月${Number(data.cycleNo)}號`;
      default:
        return '單次';
    }
  };

  const durationText = `${dateToString(data.startDay)}~${dateToString(data.endDay)}`;

  // 取得銀行名稱
  const getBankName = async (receiveBank) => {
    getBankCode().then((items) => {
      const { bankName } = items.find((b) => b.bankNo === receiveBank) ?? '';
      setReceiveBankName(bankName);
    });
  };

  useEffect(() => {
    getBankName(data.receiveBank);
  }, []);

  return (
    <DialogContentWrapper>
      <div className="mainBlock">
        <div className="dataLabel">轉出金額與轉入帳號</div>
        <div className="balance">
          $
          {data.transferAmount}
        </div>
        <div className="account">
          {receiveBankName}
          (
          {data.receiveBank}
          )
        </div>
        <div className="account">
          {data.receiveAccountNo}
        </div>
        <div className="account">{data.inActNo}</div>
      </div>
      <div className="informationListContainer">
        <InformationList
          title="轉出帳號"
          content={accountFormatter(selectedAccount.acctId)}
          remark={selectedAccount.acctName}
        />
        <InformationList
          title="預約轉帳日"
          content={dateToString(data.rgDay)}
        />
        <InformationList title="週期" content={generatePeriodText()} />
        {data.cycle !== 'D' && (
          <InformationList title="期間" content={durationText} />
        )}
        <InformationList title="預約設定日" content={dateToString(data.rgDay)} />
        {
          data.cycle !== 'D' && (<InformationList title="預約轉帳總金額" content="待提供" />)
        }

        <InformationList
          title="帳戶餘額"
          content={`$${toCurrency(selectedAccount.acctBalx)}`}
          remark={selectedAccount.acctName}
        />

        <InformationList title="備註" content={data.remark} />
      </div>
    </DialogContentWrapper>
  );
};

export default DetailContent;
