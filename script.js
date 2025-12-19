'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};
const account5 = {
  owner: 'Muhammed Hisham',
  movements: [500, 450, -400, 3000, 850, 730, -70, -100],
  interestRate: 0, // %
  pin: 7,
};

const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
const displayTransactions = function (movements) {
  containerMovements.innerHTML = '';
  movements.forEach(function (move, i) {
    const type = move > 0 ? 'deposit' : 'withdrawal';
    const iterateTransaction = `<div class="movements__row">
      <div class="movements__type movements__type--${type}">${i} ${type}</div>
      <div class="movements__value">${move}€</div>
    </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', iterateTransaction);
  });
};
displayTransactions(account1.movements);
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const createUserNames = function (accounts) {
  accounts.forEach(acc => {
    acc.userName = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUserNames(accounts);

console.log(accounts);

// find balance
const currentBalance = function (movements) {
  return movements.reduce((acc, cur) => (acc += cur));
};

//find the total sum of transactions
const calcDisplaySymmary = function (accounts) {
  // total deposits
  const totalDeposits = accounts.movements
    .filter(mov => mov > 0)
    .reduce((acc, eur) => (acc += eur));
  console.log('total deposits :', totalDeposits);

  // total withdrawals
  labelSumIn.textContent = `${totalDeposits}€`;
  const totalWithdrawals = Math.abs(
    accounts.movements
      .filter(mov => mov < 0)
      .reduce((acc, cur) => (acc += cur)),
    0
  );
  labelSumOut.textContent = `${totalWithdrawals}€`;

  // total interest for deposits above 1 pounds
  const totalInterest = accounts.movements
    .filter(mov => mov > 0)
    .map(deposit => {
      console.log('intrest rate:', accounts.interestRate);
      return (deposit * accounts.interestRate) / 100;
    })
    .filter(int => int >= 1)
    .reduce((acc, dep) => (acc += dep), 0);
  console.log('deposit with interest:', totalInterest);
  labelSumInterest.textContent = `${totalInterest}€`;

  //current balance
  const cntBal = currentBalance(accounts.movements);
  labelBalance.textContent = `${cntBal}€`;
};

console.log(`\n------------find method------------`);
console.log(`find method returns the first item that satisfies the condition`);

// find the account details of jessica
const jessicaAccount = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log('jessicas account details:', jessicaAccount);

console.log(`\n------------logggin in ------------`);

let currentUser;
console.log({ currentUser });

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentUser = accounts.find(acc => acc.userName === inputLoginUsername.value);
  console.log('current user details:', currentUser);
  if (currentUser?.pin === Number(inputLoginPin.value)) {
    // display ui and welcome message
    console.log('login success');
    labelWelcome.textContent = `Welcome back, ${
      currentUser.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
    // clearing the input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    //to remove the focus
    inputLoginPin.blur();
    // display transactions or movements
    displayTransactions(currentUser.movements);
    //calculate transactions
    calcDisplaySymmary(currentUser);
  } else {
    labelWelcome.textContent = `Incorrect credentials`;
    console.log('Password incorrect ');
  }
});
