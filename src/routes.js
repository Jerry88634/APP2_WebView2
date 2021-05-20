/* Components */
import Login from 'pages/Login';
import Test from 'pages/Test';
import CardLessATM from 'pages/CardLessATM';
import CardLessATM1 from 'pages/CardLessATM/cardLessATM_1';
import CardLessATM2 from 'pages/CardLessATM/cardLessATM_2';
import CardLessATM3 from 'pages/CardLessATM/cardLessATM_3';
import CardLessWithDrawChgPwd from 'pages/CardLessATM/cardLessWithDrawChgPwd';
import LossReissue from 'pages/LossReissue';
import LossReissue2 from 'pages/LossReissue/lossReissue_2';
import AccountMaintenance from 'pages/AccountMaintenance';
import BillPay from 'pages/BillPay';
import BillPay1 from 'pages/BillPay/billPay_1';
import DepositPlus from 'pages/DepositPlus';
import NicknameSetting from 'pages/NicknameSetting';
import NoticeSetting from 'pages/NoticeSetting';
import NoticeSetting1 from 'pages/NoticeSetting/noticeSetting_1';
import NoticeSetting2 from 'pages/NoticeSetting/noticeSetting_2';
import PatternLockSetting from 'pages/PatternLockSetting';

const routes = [
  { path: '/', exact: true, component: Login },
  { path: '/test', exact: false, component: Test },
  { path: '/cardLessATM', exact: true, component: CardLessATM },
  { path: '/cardLessATM/cardLessATM1', exact: false, component: CardLessATM1 },
  { path: '/cardLessATM/cardLessATM2', exact: false, component: CardLessATM2 },
  { path: '/cardLessATM/cardLessATM3', exact: false, component: CardLessATM3 },
  { path: '/cardLessATM/cardLessWithDrawChgPwd', exact: false, component: CardLessWithDrawChgPwd },
  { path: '/lossReissue', exact: false, component: LossReissue },
  { path: '/lossReissue2', exact: false, component: LossReissue2 },
  { path: '/accountMaintenance', exact: false, component: AccountMaintenance },
  { path: '/billPay', exact: true, component: BillPay },
  { path: '/billPay/billPay1', exact: false, component: BillPay1 },
  { path: '/depositPlus', exact: true, component: DepositPlus },
  { path: '/noticeSetting', exact: true, component: NoticeSetting },
  { path: '/noticeSetting/noticeSetting1', exact: false, component: NoticeSetting1 },
  { path: '/noticeSetting/noticeSetting2', exact: false, component: NoticeSetting2 },
  { path: '/nicknameSetting', exact: false, component: NicknameSetting },
  { path: '/patternLockSetting', exact: false, component: PatternLockSetting },
];

export default routes;