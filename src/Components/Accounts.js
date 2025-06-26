const account1 = {
  id: 1,
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-25T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-08-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  id: 2,
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  id: 3,
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,

  movementsDates: [
    '2021-02-14T11:25:43.153Z',
    '2021-03-19T18:35:28.274Z',
    '2021-06-21T08:49:15.674Z',
    '2021-09-09T12:21:54.834Z',
    '2021-11-03T19:42:02.154Z',
    '2022-01-15T15:17:04.934Z',
    '2022-03-08T20:30:17.384Z',
    '2022-05-22T06:45:29.581Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT',
};

const account4 = {
  id: 4,
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,

  movementsDates: [
    '2018-04-22T14:36:47.947Z',
    '2018-07-14T09:25:33.157Z',
    '2018-10-05T16:49:21.674Z',
    '2019-01-18T11:53:18.794Z',
    '2019-03-30T07:14:59.784Z',
    '2019-06-27T21:08:17.094Z',
    '2019-08-19T05:41:23.374Z',
    '2019-12-01T18:22:36.191Z',
  ],
  currency: 'IDR',
  locale: 'id-ID',
};

const Accounts = [account1, account2, account3, account4];
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.userName = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(Accounts);

export default Accounts;
