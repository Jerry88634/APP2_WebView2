export const generateMockData = (size = 10) => Array.from(Array(size), (i, id) => ({
  id,
  isHost: Math.random() > 0.5,
  account: `User ${id}`,
  partySize: Math.floor(Math.random() * 100),
  amount: Math.random() * 100000,
  color: [
    'purple',
    'pink',
    'yellow',
    'blue',
    'orange',
    'green',
    'lightPurple',
  ][Math.floor(Math.random() * 7)],
}));

export const MOCK_DATA = [
  {
    id: 1,
    isHost: false,
    account: 'User 1',
    partySize: 1,
    amount: '1000',
    color: 'green',
  },
  {
    id: 2,
    isHost: true,
    account: 'User 2',
    partySize: 16,
    amount: '1500',
    color: 'green',
  },
  {
    id: 3,
    isHost: false,
    account: 'User 3',
    partySize: 5,
    amount: '6000',
    color: 'pink',
  },
  {
    id: 4,
    isHost: true,
    account: 'User 4',
    partySize: 11,
    amount: '10000',
    color: 'green',
  },
  {
    id: 5,
    isHost: true,
    account: 'User 5',
    partySize: 3,
    amount: '500',
    color: 'pink',
  },
  {
    id: 6,
    isHost: true,
    account: 'User 6',
    partySize: 2,
    amount: '10',
    color: 'green',
  },
];
