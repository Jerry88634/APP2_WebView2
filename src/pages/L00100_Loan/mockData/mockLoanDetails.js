export default ({ accountNo = '11122233334444' }) => ({
  alias: '固定的假資料',
  accountNo,
  loanNo: '001',
  loanType: '挑戰型（2.6%）',
  startDate: '20210501',
  endDate: '20220716',
  cycleTiming: 23,
  loanAmount: 123_456,
  rate: 2.6,
  loanBalance: 654_321,
  periodPaid: 20,
  periodRemain: 63,
  initialAmount: 300_000,
  currency: 'NTD',
});