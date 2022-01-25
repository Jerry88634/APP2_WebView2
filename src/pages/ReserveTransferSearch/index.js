import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { reserveTransferSearchApi } from 'apis';
import { dateFormatter } from 'utilities/Generator';

/* Elements */
import Header from 'components/Header';
import {
  FEIBTabContext,
  FEIBTabList,
  FEIBTab,
  FEIBTabPanel,
  FEIBButton,
} from 'components/elements';
import DebitCard from 'components/DebitCard';
import InformationTape from 'components/InformationTape';
import Dialog from 'components/Dialog';
import EmptyData from 'components/EmptyData';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from 'assets/images/icons/clearIcon.svg';
import DateRangePicker from 'components/DateRangePicker';
import SuccessImage from 'assets/images/successIcon.png';
import FailImage from 'assets/images/failIcon.png';
import theme from 'themes/theme';
import DetailContent from './detailContent';
import ResultContent from './resultContent';

/* Style */
import ReserveTransferSearchWrapper from './reserveTransferSearch.style';

// mock 預約轉帳結果資料
const mockResultData = [
  {
    trnsDate: '', // 轉帳日期
    inActNo: '', // 轉入帳號
    amount: '', // 轉入金額
    stderrMsg: '', // 轉帳結果
  },
];

const ReserveTransferSearch = () => {
  const history = useHistory();
  const reserveDatePickerLimit = {
    minDate: new Date(new Date().setDate(new Date().getDate() + 1)),
    maxDate: new Date(new Date().setFullYear(new Date().getFullYear() + 2)),
  };
  const resultDatePickerLimit = {
    minDate: new Date(new Date().setFullYear(new Date().getFullYear() - 2)),
    maxDate: new Date(),
  };
  const [cardsList, setCardsList] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [tabValue, setTabValue] = useState('1');
  const [reserveDateRange, setReserveDateRange] = useState([new Date(new Date().setDate(new Date().getDate() + 1)), new Date(new Date().setFullYear(new Date().getFullYear() + 2))]);
  const [resultDateRange, setResultDateRange] = useState([new Date(new Date().setFullYear(new Date().getFullYear() - 2)), new Date()]);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [showResultDialog, setShowResultDialog] = useState(false);
  const [resultDialogData, setResultDialogData] = useState({});
  const [currentReserveData, setCurrentReserveData] = useState({});
  const [reserveDataList, setReserveDataList] = useState([]);
  const [resultDataList, setResultDataList] = useState(mockResultData);

  // 取得帳號清單
  const getTransferOutAccounts = async () => {
    // const { accounts, isMotpOpen } = await reserveTransferSearchApi.getTransferOutAccounts({ motpDeviceId: '675066ee-2f25-4d97-812a-12c7f8d18489' });
    const { accounts } = await reserveTransferSearchApi.getTransferOutAccounts({ motpDeviceId: '675066ee-2f25-4d97-812a-12c7f8d18489' });
    if (accounts) {
      setCardsList(accounts);
      setSelectedAccount(accounts[0]);
    }
  };

  const toConfirmPage = () => {
    history.push('/reserveTransferSearch1', currentReserveData);
  };

  // eslint-disable-next-line no-unused-vars
  const handleChangeSlide = (swiper) => {
    const { activeIndex } = swiper;
    setSelectedAccount(cardsList[activeIndex]);
  };

  const handleClickReserveDateRangePicker = (range) => {
    setReserveDateRange(range);
  };

  const handleClickResultDateRangePicker = (range) => {
    console.log(range);
    setResultDateRange(range);
  };

  const clearReserveDateRange = () => {
    setReserveDateRange([null, null]);
  };

  const clearResultDateRange = () => {
    setResultDateRange([null, null]);
  };

  // 取得預約轉帳明細
  const getReservedTransDetails = async () => {
    const param = {
      acctId: selectedAccount.accountId,
      ccycd: selectedAccount.ccyCd,
      accountType: selectedAccount.accountType,
      queryType: '3',
      sdate: dateFormatter(reserveDateRange[0]),
      edate: dateFormatter(reserveDateRange[1]),
    };
    const { bookList } = await reserveTransferSearchApi.getReservedTransDetails(param);
    // amount: "1,001"
    // bookType: "158"
    // bookTypeName: "網路預約轉出"
    // chargeDay: "004"
    // chargeMode: "W"
    // inActNo: "0000000123456789"
    // inBank: "013"
    // inBankName: "國泰世華銀行"
    // memo: "ICAgICAgICAgICAgICAgIA=="
    // nickName: ""
    // payDate: "111/01/13"
    // payDateEnd: "111/04/07"
    // payDateWording: "每週四"
    // seqNo: "00001"
    // source: "1"
    // trncd: "1"
    // trncdName: "提取"
    // trnsDate: "111/01/12"
    // type: "週期"
    if (bookList) {
      setReserveDataList(bookList);
    } else {
      setReserveDataList([]);
    }
  };

  // 取得預約轉帳結果
  const getResultTransDetails = async () => {
    const param = {
      acctId: selectedAccount.accountId,
      ccycd: selectedAccount.ccyCd,
      accountType: selectedAccount.accountType,
      queryType: '3',
      sdate: dateFormatter(resultDateRange[0]),
      edate: dateFormatter(resultDateRange[1]),
    };
    const response = await reserveTransferSearchApi.getResultTransDetails(param);
    console.log(response);
    setResultDataList([]);
  };

  const handleTabChange = (event, type) => {
    if (type !== tabValue) {
      if (type === '1') {
        getReservedTransDetails();
      }
      if (type === '2') {
        getResultTransDetails();
      }
      setTabValue(type);
    }
  };

  // 轉出帳號卡片 swiper
  const renderCard = () => cardsList.map((item) => (
    <SwiperSlide>
      <DebitCard
        key={item.accountId}
        branch={item.branchId}
        cardName={item.showName || '--'}
        account={item.accountId}
        balance={item.balance}
        dollarSign={item.ccyCd}
        transferTitle="跨轉優惠"
        transferLimit={6}
        transferRemaining={item.tfrhCount}
        color="purple"
      />
    </SwiperSlide>
  ));

  const handleReserveDataDialogOpen = (data) => {
    console.log(data);
    setCurrentReserveData(data);
    setShowDetailDialog(true);
  };

  // 預約轉帳查詢列表
  const renderReserveTapes = () => reserveDataList.map((item, idx) => (
    <InformationTape
      // eslint-disable-next-line react/no-array-index-key
      key={idx}
      topLeft={`${item.inBank}-${item.inActNo}`}
      topRight={`$ ${item.amount}`}
      bottomLeft={`預約轉帳日：${item.payDate}`}
      bottomRight={item.type}
      onClick={() => handleReserveDataDialogOpen(item)}
    />
  ));

  // 打開結果彈窗
  const handleOpenResultDialog = (data) => {
    setResultDialogData(data);
    setShowResultDialog(true);
  };

  // 結果查詢列表
  const renderResultTapes = () => resultDataList.map((item, idx) => (
    <InformationTape
      // eslint-disable-next-line react/no-array-index-key
      key={idx}
      img={item.stderrMsg ? FailImage : SuccessImage}
      topLeft={`${item.bankCode}-${item.inActNo}`}
      topRight={`$ ${item.amount}`}
      bottomLeft={`交易日期：${item.trnsDate}`}
      onClick={() => handleOpenResultDialog(item)}
    />
  ));

  // 預約轉帳明細彈窗
  const renderDetailDialog = () => (
    <Dialog
      title="預約轉帳"
      isOpen={showDetailDialog}
      onClose={() => setShowDetailDialog(false)}
      content={(<DetailContent data={currentReserveData} />)}
      action={(
        <FEIBButton
          $color={theme.colors.text.dark}
          $bgColor={theme.colors.background.cancel}
          onClick={toConfirmPage}
        >
          取消交易
        </FEIBButton>
      )}
    />
  );

  // 轉帳結果明細彈窗
  const renderResultDialog = () => (
    <Dialog
      title="預約轉帳結果"
      isOpen={showResultDialog}
      onClose={() => setShowResultDialog(false)}
      content={(<ResultContent data={resultDialogData} />)}
    />
  );

  // 取得帳號列表
  useEffect(() => {
    getTransferOutAccounts();
  }, []);

  // 切換帳號搜尋預約明細
  useEffect(() => {
    if (selectedAccount) {
      getReservedTransDetails();
    }
  }, [selectedAccount]);

  // 時間切換搜尋預約明細
  useEffect(() => {
    if (selectedAccount) {
      getReservedTransDetails();
    }
  }, [reserveDateRange]);

  useEffect(() => {
    if (tabValue === '2') {
      getResultTransDetails();
    }
  }, [resultDateRange]);

  return (
    <>
      <Header title="預約轉帳查詢/取消" />
      <ReserveTransferSearchWrapper className="searchResult">
        <div className="cardArea">
          <Swiper
            slidesPerView={1.14}
            spaceBetween={8}
            centeredSlides
            pagination
            onSlideChange={handleChangeSlide}
          >
            { renderCard() }
          </Swiper>
        </div>
        <div className="searchResultContainer">
          <FEIBTabContext value={tabValue}>
            <FEIBTabList onChange={handleTabChange} $size="small" $type="fixed">
              <FEIBTab label="預約查詢" value="1" />
              <FEIBTab label="結果查詢" value="2" />
            </FEIBTabList>
            <FEIBTabPanel value="1">
              <div className="searchDateRange">
                <SearchIcon />
                <div>
                  <DateRangePicker
                    {...reserveDatePickerLimit}
                    date={reserveDateRange}
                    label=" "
                    onClick={handleClickReserveDateRangePicker}
                  />
                  <img className="clearImg" src={ClearIcon} alt="" onClick={clearReserveDateRange} />
                </div>
              </div>
              {
                reserveDataList.length > 0 ? (
                  <div className="tapeList">
                    { renderReserveTapes() }
                  </div>
                ) : (<div className="emptyConatiner"><EmptyData /></div>)
              }
            </FEIBTabPanel>
            <FEIBTabPanel value="2">
              <div className="searchDateRange">
                <SearchIcon />
                <div>
                  <DateRangePicker
                    {...resultDatePickerLimit}
                    date={resultDateRange}
                    label=" "
                    onClick={handleClickResultDateRangePicker}
                  />
                  <img className="clearImg" src={ClearIcon} alt="" onClick={clearResultDateRange} />
                </div>
              </div>
              {
                resultDataList.length > 0 ? (
                  <div className="tapeList">
                    { renderResultTapes() }
                  </div>
                ) : (<div className="emptyConatiner"><EmptyData /></div>)
              }
            </FEIBTabPanel>
          </FEIBTabContext>
        </div>
        {renderDetailDialog()}
        {renderResultDialog()}
      </ReserveTransferSearchWrapper>
    </>
  );
};

export default ReserveTransferSearch;
