import styled from 'styled-components';
import Layout from 'components/Layout';

const ExchangeWrapper = styled(Layout)`
  .borderBtnContainer {
    .customSize {
      min-height: unset;
      padding-left: 1.2rem;
      padding-right: 1.2rem;
      padding-bottom: .1rem;
      width: unset;
      height: 2.5rem;
      font-size: 1.4rem;
      margin-right: unset;
    }
  }
  &.confirmPage {
    padding: .8rem 1.6rem 0rem 1.6rem;
  }
  &.finishPage {
    padding: 0 1.6rem 0rem 1.6rem;
  }
  &.confirmPage, &.finishPage {
    background: ${({ theme }) => theme.colors.background.lighterBlue};
    .infoSection {
      left: -1.6rem;
      background: white;
      width: 100vw;
      padding: 2.4rem 1.6rem;
      text-align: center;
      margin-bottom: .8rem;
      &.resultFail {
        min-height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      &:last-child {
        margin-bottom: 0;
      }
      .mainBlock {
        flex-direction: column;
        margin-bottom: 2.4rem;
        .countDownTitle {
          font-size: 1.4rem;
          color: ${({ theme }) => theme.colors.text.lightGray};
        }
      }
      .infoData {
        margin-top: 2.4rem;
        .label {
          color: ${({ theme }) => theme.colors.text.lightGray};
          font-size: 16px;
          margin-bottom: .4rem;
        }
        .label.into {
          margin: 1.6rem 0 .6rem;
        }
        .foreignCurrency {
          color: ${({ theme }) => theme.colors.primary.dark};
          font-size: 24px;
          font-weight: 600;
          line-height: 3.6rem;
          margin-bottom: 1.2rem;
        }
        .changeNT, .exchangeRate {
          color: ${({ theme }) => theme.colors.primary.dark};
          font-size: 1.8rem;
          line-height: 2.7rem;
          font-weight: 400;
        }
        .employee {
          color: ${({ theme }) => theme.colors.state.danger};
        }
        .accountData {
          color: ${({ theme }) => theme.colors.primary.dark};
          font-size: 2.4rem;
          line-height: 3.6rem;
          font-weight: 400;
        }
        .priceNotiSetting {
          margin-top: .8rem;
          font-size: 1.4rem;
          line-height: 2.1rem;
          color: ${({ theme }) => theme.colors.text.dark};
        }
      }
    }
    .exchangeAccordion {
      .content {
        > div {
          .content {
            color: ${({ theme }) => theme.colors.text.dark};
            padding: 0 0 1.2rem;
          }
        }
      }
    }
  }
  table {
    margin-bottom: 2rem;
  }
  ol {
    padding-left: 2.4rem;
  }
  li {
    list-style-type: decimal;
    margin-bottom: 1rem;
    &:first-child {
      color: ${({ theme }) => theme.colors.text.point};
    }
  }
  .MuiFormHelperText-root.Mui-error {
    &.balance {
      position: absolute;
      color: ${({ theme }) => theme.colors.text.mediumGray};
      text-align: left;
      transform: translateY(calc(-100% - 1.6rem));
    }
  }
  .exchangeTypeLabel {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }
  .outTypeRadioLabel {
    .MuiFormControlLabel-label {
      font-size: 1.4rem;
    }
  }
  .submitBtn {
    padding-top: 1.2rem;
  }
  .confirmBtns {
    padding-top: 1.2rem;
    padding-bottom: .8rem;
  }
  #foreignBalance, #ntDollorBalance {
    color: transparent;
  }
`;

export default ExchangeWrapper;