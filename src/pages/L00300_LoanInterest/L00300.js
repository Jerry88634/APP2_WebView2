import { useState, useEffect } from 'react';
import { showDrawer, closeDrawer } from 'utilities/MessageModal';
import {
  toCurrency, dateToYMD, dateToString, handleLoanTypeToTitle,
} from 'utilities/Generator';

/* Elements */
import Layout from 'components/Layout/Layout';
import DebitCard from 'components/DebitCard/DebitCard';
import InformationTape from 'components/InformationTape';
import { FEIBTabContext, FEIBTabList, FEIBTab } from 'components/elements';
import DownloadIcon from 'assets/images/icons/downloadIcon.svg';
import { loadFuncParams } from 'utilities/AppScriptProxy';
import EmptyData from 'components/EmptyData';
import Loading from 'components/Loading';
import { FuncID } from 'utilities/FuncID';
import { useNavigation } from 'hooks/useNavigation';
import { getSubPaymentHistory } from './api';

/* Styles */
import LoanInterestWrapper from './L00300.style';

/**
 * L00300 貸款 繳款紀錄
 */
const LoanInterest = () => {
  const [cardData, setCardData] = useState({});
  const [dateRange, setDateRange] = useState('0');
  const [recordsList, setRecordsList] = useState();
  const { startFunc } = useNavigation();

  const getStartDate = (type) => {
    let months;
    switch (type) {
      case '1': months = 12; break;
      case '2': months = 24; break;
      case '3': months = 36; break;
      case '0':
      default:
        months = 6; break;
    }

    const today = new Date();
    return new Date(today.setMonth(today.getMonth() - months));
  };

  // 查詢繳款紀錄
  const getLoanInterestRecords = async (rangeType) => {
    const param = {
      account: cardData.account,
      subNo: cardData.subNo,
      startDate: dateToYMD(getStartDate(rangeType)),
      endDate: dateToYMD(),
    };

    const histroyResponse = await getSubPaymentHistory(param);
    if (histroyResponse) setRecordsList(histroyResponse);
  };

  const handleChangeTabs = (e, value) => {
    setDateRange(value);
    getLoanInterestRecords(value);
  };

  const toDetailPage = (singleHistoryData) => startFunc(`${FuncID.L00300}1`, { singleHistoryData, cardData });

  const renderRecordList = () => {
    if (!recordsList) return <Loading space="both" isCentered />;
    if (!recordsList.length) return <div className="emptydata-wrapper"><EmptyData content="查無最近三年內的帳務往來資料" /></div>;

    return (
      <div className="recordsList">
        {recordsList.map((item) => (
          <InformationTape
            key={recordsList.indexOf(item)}
            topLeft={handleLoanTypeToTitle(item.type)}
            topRight={`$${toCurrency(item.amount)}`}
            bottomLeft={`${dateToString(item.date)}`}
            bottomRight={`貸款餘額 $${toCurrency(item.balance)}`}
            onClick={() => toDetailPage(item)}
          />
        ))}
      </div>
    );
  };

  const renderEditList = () => (
    <ul className="noticeEditList downloadItemList">
      <li onClick={() => closeDrawer()}>
        <span>
          下載 PDF
        </span>
        <img className="downloadImg" src={DownloadIcon} alt="" />
      </li>
      <li onClick={() => closeDrawer()}>
        <span>
          下載 EXCEL
        </span>
        <img className="downloadImg" src={DownloadIcon} alt="" />
      </li>
    </ul>
  );

  // 開關編輯選單
  const handleOpenDrawer = () => {
    showDrawer(
      '',
      renderEditList(),
    );
  };

  useEffect(async () => {
    const startParams = await loadFuncParams();
    if (startParams) setCardData(startParams.loan);
  }, []);

  // 進到該頁面時先 Query 近六個月的繳款紀錄
  useEffect(() => {
    if (cardData?.account) getLoanInterestRecords(dateRange);
  }, [cardData]);

  return (
    <Layout title="繳款紀錄查詢">
      <LoanInterestWrapper>
        <div className="cardArea">
          <DebitCard
            branch=""
            cardName={cardData?.loanType || '信貸'}
            account={`${cardData?.account || ''} ${
              cardData.subNo
            }`}
            balance={toCurrency(cardData?.balance || '')}
            dollarSign={cardData?.currency || ''}
            transferTitle=""
            color="lightPurple"
          />
        </div>
        <div className="contentArea">
          <div className="tools">
            <div className="iconContainer">
              <img
                className="downloadImg"
                src={DownloadIcon}
                alt=""
                onClick={handleOpenDrawer}
              />
            </div>
            <div className="tabsContainer">
              <FEIBTabContext value={dateRange}>
                <FEIBTabList $size="small" onChange={handleChangeTabs}>
                  <FEIBTab label="近六個月" value="0" />
                  <FEIBTab label="近一年" value="1" />
                  <FEIBTab label="近兩年" value="2" />
                  <FEIBTab label="近三年" value="3" />
                </FEIBTabList>
              </FEIBTabContext>
            </div>
          </div>
          {renderRecordList()}
        </div>
      </LoanInterestWrapper>
    </Layout>
  );
};

export default LoanInterest;
