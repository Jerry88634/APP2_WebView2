import styled from 'styled-components';
import Layout from 'components/Layout';

const NetworkWrapper = styled(Layout)`
  .infoContainer {
    padding-bottom: 2.4rem;
    .avatarContainer {
      width: 8.8rem;
      height: 8.8rem;
      margin: 0 auto 1.2rem;
      position: relative;
  
      .penIconContainer {
        position: absolute;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 3.2rem;
        height: 3.2rem;
        background: ${({ theme }) => theme.colors.basic.white};
        border-radius: 1.6rem;
  
        .penIconBackground {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 2.8rem;
          height: 2.8rem;
          border-radius: 1.4rem;
          background: ${({ theme }) => theme.colors.primary.light};
          
          svg {
            color: ${({ theme }) => theme.colors.basic.white};
            font-size: 1.87rem;
          }
        }
      }
    }
  
    .nickName {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: .4rem;
  
      span {
        color: ${({ theme }) => theme.colors.text.dark};
        font-size: 1.8rem;
        font-weight: 500;
      }
  
      svg {
        color: ${({ theme }) => theme.colors.primary.light};
        font-size: 2.13rem;
        margin-left: .8rem;
      }
    }
  
    .level {
      color: ${({ theme }) => theme.colors.primary.dark};
      text-align: center;
    } 
  }

  .contentCard {
    padding: 3.2rem 0 2.4rem;
    text-align: center;

    &:before {
      left: 0;
      position: absolute;
      content: '';
      width: 100vw;
      height: .8rem;
      background: ${({ theme }) => theme.colors.background.lighterBlue};
      transform: translate(-1.6rem, -3.2rem);
    }

    .title {
      margin-bottom: 2.4rem;
    }

    .subTitle {
      color: ${({ theme }) => theme.colors.text.lightGray};
      font-size: 1.4rem;
      margin-bottom: .8rem;
      button {
        width: 2.2rem;
        height: 2rem;
        padding: 0;
        transform: translate(-0.4rem, -0.2rem);
        svg {
          font-size: 2.9rem;
          color: ${({ theme }) => theme.colors.primary.light};
        }
      }
    }

    .shareContent {
      font-size: 1.4rem;
      line-height: 2.1rem;
      padding: 0 2rem;
      color: ${({ theme }) => theme.colors.text.light};
      margin-bottom: 2.4rem;

      svg {
        position: absolute;
        right: 0;
        top: -0.3rem;
        color: ${({ theme }) => theme.colors.primary.light};
      }
    }

    .mainBlock {
      flex-direction: column;
      margin-bottom: 2.4rem;
      .code {
        color: ${({ theme }) => theme.colors.primary.dark};
        font-size: 3rem;
        display: flex;
        font-weight: 500;
        button {
          padding: 0 0 0 0.3rem;
          transform: translateY(-0.2rem);
          svg {
            color: ${({ theme }) => theme.colors.primary.dark};
          }
        }
      }
    }
    
    .search {
      position: absolute;
      font-weight: 400;
      top: .1rem;
      right: 0;
      font-size: 1.4rem;
      display: flex;
      align-items: center;
      transform: translateY(-0.5rem);
      button {
        width: 2.2rem;
        padding: 0;
        svg {
          font-size: 2.9rem;
          color: ${({ theme }) => theme.colors.primary.light};
        }
      }
    }

    .overviewContent {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      .num {
        font-size: 2rem;
        color: ${({ theme }) => theme.colors.primary.light};
        font-weight: 400;
      }
    }
  }
`;

export default NetworkWrapper;
